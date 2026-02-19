
import React, { useState, useEffect } from 'react';
import { User } from './types';
import { storageService } from './services/storage';
import Layout from './components/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Landing from './components/Landing';
import AdminDashboard from './components/Admin/Dashboard';
import UserHome from './components/User/Home';
import Button from './components/UI/Button';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'login' | 'register' | 'pending-success'>('landing');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = storageService.getCurrentUser();
        if (savedUser) {
          const users = await storageService.getUsers();
          // Safety check for array
          if (Array.isArray(users)) {
            const freshUser = users.find(u => u.id === savedUser.id);
            if (freshUser && (freshUser.status === 'approved' || freshUser.role === 'admin')) {
              setUser(freshUser);
            } else {
              storageService.setCurrentUser(null);
            }
          }
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        storageService.setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    storageService.setCurrentUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    storageService.setCurrentUser(null);
  };

  const handleRegisterSuccess = () => {
    setView('pending-success');
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#020617]">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute w-16 h-16 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Auth Flow
  if (!user) {
    return (
      <div className="min-h-screen">
        {view === 'landing' && (
          <>
            <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 h-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                    <i className="fas fa-user-friends"></i>
                  </div>
                  <span className="text-2xl font-black text-white tracking-tighter">FindMyBuddy</span>
                </div>
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => setView('login')}
                    className="font-black text-slate-300 hover:text-white transition-all text-[11px] uppercase tracking-[0.2em]"
                  >
                    Sign In
                  </button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="hidden sm:flex rounded-xl font-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    onClick={() => setView('register')}
                  >
                    Join Now
                  </Button>
                </div>
              </div>
            </nav>
            <Landing onStart={() => setView('register')} onLogin={() => setView('login')} />
          </>
        )}

        <div className={view !== 'landing' ? "min-h-screen flex items-center justify-center p-4" : ""}>
          {view === 'login' && (
            <Login
              onLogin={handleLogin}
              onSwitchToRegister={() => setView('register')}
              onBackToLanding={() => setView('landing')}
            />
          )}
          {view === 'register' && (
            <Register
              onSuccess={handleRegisterSuccess}
              onSwitchToLogin={() => setView('login')}
              onBackToLanding={() => setView('landing')}
            />
          )}
          {view === 'pending-success' && (
            <div className="max-w-md w-full glass-panel rounded-[3rem] p-12 text-center animate-slide-up shadow-2xl">
              <div className="w-24 h-24 bg-emerald-500/10 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-10 text-4xl shadow-lg border border-emerald-500/20">
                <i className="fas fa-paper-plane"></i>
              </div>
              <h2 className="text-3xl font-black text-white mb-6 tracking-tighter">Application Logged</h2>
              <p className="text-slate-400 mb-12 leading-relaxed text-lg font-medium">
                Your profile is now in the security queue. We'll verify your PIN code details shortly. Check back soon!
              </p>
              <Button fullWidth size="lg" variant="secondary" className="h-16 rounded-2xl font-black uppercase tracking-widest text-sm" onClick={() => setView('login')}>
                Return to Portal
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Authenticated View
  return (
    <Layout user={user} onLogout={handleLogout}>
      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <UserHome currentUser={user} />
      )}
    </Layout>
  );
};

export default App;
