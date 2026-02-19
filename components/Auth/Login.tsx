
import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { storageService } from '../../services/storage';
import { User } from '../../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
  onBackToLanding?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister, onBackToLanding }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const users = await storageService.getUsers();

      if (!Array.isArray(users)) {
        throw new Error('Server returned invalid data format');
      }

      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        setError('Invalid access credentials');
        setIsSubmitting(false);
        return;
      }

      if (user.status === 'pending' && user.role !== 'admin') {
        setError('Account verification in progress');
        setIsSubmitting(false);
        return;
      }

      if (user.status === 'rejected') {
        setError('Application declined by security');
        setIsSubmitting(false);
        return;
      }

      onLogin(user);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Connection timeout. Please retry.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto relative px-4">
      {/* Cinematic Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className={`relative glass-panel rounded-[3.5rem] p-8 lg:p-14 shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-slide-up ${error ? 'animate-shake' : ''}`}>
        <button
          onClick={onBackToLanding}
          className="absolute -top-16 left-0 text-slate-500 hover:text-indigo-400 font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-2 transition-all group"
        >
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1.8rem] flex items-center justify-center text-white text-3xl mx-auto mb-8 shadow-2xl shadow-indigo-600/30 rotate-6 hover:rotate-0 transition-transform duration-700">
            <i className="fas fa-fingerprint"></i>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter text-glow">Welcome Back</h2>
          <p className="text-slate-400 mt-2 font-medium">Verify your identity to proceed</p>
        </div>

        {error && (
          <div className="mb-10 p-5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-4 animate-slide-up shadow-lg">
            <div className="bg-rose-500/20 p-2 rounded-lg">
              <i className="fas fa-shield-virus text-base"></i>
            </div>
            <span className="truncate">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <Input
            label="Gmail Address"
            type="email"
            placeholder="neighbor@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="fa-envelope"
            required
            disabled={isSubmitting}
          />
          <Input
            label="Security Passkey"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="fa-lock"
            required
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            className="h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-95 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <i className="fas fa-circle-notch animate-spin text-xl"></i>
            ) : (
              "Authorize Session"
            )}
          </Button>
        </form>

        <div className="mt-14 text-center border-t border-white/5 pt-10">
          <p className="text-sm text-slate-500 font-medium">
            New here?{' '}
            <button
              onClick={onSwitchToRegister}
              className="font-black text-indigo-400 hover:text-white transition-all underline decoration-indigo-400/20 underline-offset-8 decoration-2"
            >
              Apply for Entrance
            </button>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
};

export default Login;
