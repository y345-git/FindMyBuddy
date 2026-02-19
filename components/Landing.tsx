
import React from 'react';
import Button from './UI/Button';

interface LandingProps {
  onStart: () => void;
  onLogin: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onLogin }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm font-black tracking-widest uppercase mb-10 animate-slide-up shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Join 2,000+ neighbors already connected
          </div>

          <h1 className="text-6xl lg:text-9xl font-black text-white tracking-tighter mb-10 animate-slide-up stagger-1 leading-[0.85] text-glow drop-shadow-2xl">
            The Neighbor <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-shine">
              You've Been Seeking
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl lg:text-2xl text-slate-300 font-medium mb-16 animate-slide-up stagger-2 leading-relaxed opacity-90">
            Stop living next to strangers. FindMyBuddy uses smart PIN-code matching
            to connect you with verified locals in your exact area.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up stagger-3">
            <Button size="lg" className="px-14 h-20 rounded-[2rem] shadow-2xl shadow-indigo-600/30 text-lg font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all bg-indigo-600 hover:bg-indigo-500 text-white border-none" onClick={onStart}>
              Start Finding Buddies
            </Button>
            <button
              className="px-12 h-20 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/20 text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-slate-900 transition-all shadow-xl"
              onClick={onLogin}
            >
              Log in to Dashboard
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Stats/Social Proof Section */}
      <section className="py-24 glass-panel border-y border-white/10 text-white mx-4 lg:mx-12 mb-20 shadow-2xl relative overflow-hidden rounded-[4.5rem]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10 text-center">
          <div>
            <div className="text-6xl font-black mb-3 text-indigo-400">98%</div>
            <div className="text-slate-200 font-black uppercase tracking-[0.3em] text-[10px]">Safety Verification Rating</div>
          </div>
          <div>
            <div className="text-6xl font-black mb-3 text-emerald-400">1.2k+</div>
            <div className="text-slate-200 font-black uppercase tracking-[0.3em] text-[10px]">Active Area PIN Codes</div>
          </div>
          <div>
            <div className="text-6xl font-black mb-3 text-purple-400">10k+</div>
            <div className="text-slate-200 font-black uppercase tracking-[0.3em] text-[10px]">Successful Buddy Links</div>
          </div>
        </div>
      </section>

      {/* Feature Cards with Vivid Colors */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-12 rounded-[3.5rem] glass-card hover:bg-indigo-500/5 transition-all group border-white/10">
              <div className="w-20 h-20 rounded-[1.8rem] bg-indigo-600 text-white flex items-center justify-center text-3xl mb-10 group-hover:rotate-6 transition-transform shadow-xl shadow-indigo-600/30">
                <i className="fas fa-user-check"></i>
              </div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Human Verification</h3>
              <p className="text-slate-300 text-lg leading-relaxed opacity-80">No bots. No spam. Every single user is manually verified by our security team to ensure they actually live where they say.</p>
            </div>

            <div className="p-12 rounded-[3.5rem] glass-card hover:bg-emerald-500/5 transition-all group border-white/10">
              <div className="w-20 h-20 rounded-[1.8rem] bg-emerald-500 text-white flex items-center justify-center text-3xl mb-10 group-hover:-rotate-6 transition-transform shadow-xl shadow-emerald-600/30">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Hyper-Local Focus</h3>
              <p className="text-slate-300 text-lg leading-relaxed opacity-80">We don't connect you with people across the city. We focus exclusively on your PIN code to help build real-world neighbor bonds.</p>
            </div>

            <div className="p-12 rounded-[3.5rem] glass-card hover:bg-purple-500/5 transition-all group border-white/10">
              <div className="w-20 h-20 rounded-[1.8rem] bg-purple-600 text-white flex items-center justify-center text-3xl mb-10 group-hover:rotate-6 transition-transform shadow-xl shadow-purple-600/30">
                <i className="fas fa-lock"></i>
              </div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Privacy First</h3>
              <p className="text-slate-300 text-lg leading-relaxed opacity-80">Control exactly what info you share. Your address is only used for verification and is never visible to others by default.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
