
import React from 'react';
import { User } from '../types';
import Button from './UI/Button';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <nav className="sticky top-4 z-50 max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="glass-panel border border-white/10 shadow-2xl rounded-[2rem] px-8 h-20 flex justify-between items-center animate-slide-up">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-600/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <i className="fas fa-user-friends"></i>
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">FindMyBuddy</span>
          </div>
          
          {user && (
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-black text-white uppercase tracking-tight">{user.name}</span>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Verified {user.role}</span>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-[0.9rem] bg-slate-900 flex items-center justify-center text-indigo-400 font-black">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <button 
                onClick={onLogout} 
                className="p-3 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all active:scale-95"
                title="Logout"
              >
                <i className="fas fa-sign-out-alt text-lg"></i>
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      <footer className="py-10 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-6 text-slate-500 text-lg">
              <i className="fab fa-twitter hover:text-indigo-400 cursor-pointer transition-colors"></i>
              <i className="fab fa-instagram hover:text-pink-400 cursor-pointer transition-colors"></i>
              <i className="fab fa-discord hover:text-indigo-400 cursor-pointer transition-colors"></i>
            </div>
            <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
              &copy; {new Date().getFullYear()} FindMyBuddy Hub • Built for Community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
