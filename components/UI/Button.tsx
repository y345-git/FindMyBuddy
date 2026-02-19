
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#020617] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_10px_25px_-5px_rgba(79,70,229,0.4)]",
    secondary: "bg-white text-slate-950 hover:bg-slate-100 shadow-[0_10px_20px_-5px_rgba(255,255,255,0.1)]",
    danger: "bg-rose-600 text-white hover:bg-rose-500 shadow-[0_10px_25px_-5px_rgba(225,29,72,0.4)]",
    outline: "bg-transparent border-2 border-white/20 text-white hover:border-white hover:bg-white/5",
    ghost: "bg-transparent text-indigo-400 hover:bg-indigo-500/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-[12px]",
    lg: "px-10 py-4 text-sm",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
