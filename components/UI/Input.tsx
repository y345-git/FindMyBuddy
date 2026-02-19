
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: string;
}

const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] ml-1">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-all duration-300">
            <i className={`fas ${icon} text-sm`}></i>
          </div>
        )}
        <input
          className={`w-full ${icon ? 'pl-14' : 'pl-6'} pr-6 py-4 bg-white/5 border-2 ${error ? 'border-rose-500/50 bg-rose-500/10' : 'border-white/10 group-hover:border-white/20 focus:border-indigo-500/50 focus:bg-slate-900/80 focus:shadow-[0_0_20px_rgba(99,102,241,0.3)]'} rounded-2xl transition-all duration-300 outline-none text-white font-semibold placeholder:text-slate-500 shadow-inner backdrop-blur-sm`}
          {...props}
        />
        {error && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-rose-500 animate-pulse">
            <i className="fas fa-circle-exclamation text-lg"></i>
          </div>
        )}
      </div>
      {error && <span className="text-[10px] text-rose-400 ml-1 font-bold uppercase tracking-tight">{error}</span>}
    </div>
  );
};

export default Input;
