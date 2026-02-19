
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { storageService } from '../../services/storage';

interface HomeProps {
  currentUser: User;
}

const Home: React.FC<HomeProps> = ({ currentUser }) => {
  const [buddies, setBuddies] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBuddies = async () => {
      setIsLoading(true);
      try {
        const allUsers = await storageService.getUsers();
        const matched = allUsers.filter(u => 
          u.role === 'user' && 
          u.pinCode === currentUser.pinCode && 
          u.status === 'approved' && 
          u.id !== currentUser.id
        );
        setBuddies(matched);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBuddies();
  }, [currentUser]);

  return (
    <div className="animate-fade-up">
      <div className="relative overflow-hidden glass-panel rounded-[4rem] p-12 mb-16 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
          <i className="fas fa-globe-americas text-[18rem] -rotate-12"></i>
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            Verified Resident • {currentUser.pinCode}
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
            Welcome home, <br />
            <span className="text-indigo-400">{currentUser.name.split(' ')[0]}</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed max-w-xl">
            You're currently matched with <span className="text-white font-bold">{buddies.length} neighbors</span> within your sector. Your community is growing!
          </p>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl">
              <i className="fas fa-user-group"></i>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter">Nearby Buddies</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 glass-card rounded-[3rem] animate-pulse"></div>
            ))}
          </div>
        ) : buddies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {buddies.map((buddy, index) => (
              <div 
                key={buddy.id} 
                className="group glass-card rounded-[3rem] p-10 relative overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50"></div>
                
                <div className="flex items-center gap-6 mb-10">
                  <div className="relative">
                    <div className="h-20 w-20 bg-white/5 border border-white/10 rounded-[1.8rem] flex items-center justify-center text-indigo-400 font-black text-3xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      {buddy.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-slate-900 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-2xl group-hover:text-indigo-400 transition-colors">{buddy.name}</h3>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Buddy Verified</div>
                  </div>
                </div>

                <div className="space-y-5 py-8 border-y border-white/5 mb-8">
                  <div className="flex items-start gap-4 text-slate-400">
                    <i className="fas fa-map-marker-alt mt-1.5 text-indigo-500/50"></i>
                    <span className="text-sm font-medium leading-relaxed italic truncate">{buddy.address}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <i className="fas fa-paper-plane text-indigo-500/50"></i>
                    <span className="text-sm font-medium truncate">{buddy.email}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-white/5 hover:bg-white hover:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg group-hover:shadow-indigo-500/10">
                  Start Connection
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-[4rem] p-24 text-center border-2 border-dashed border-white/5 animate-slide-up">
            <div className="w-32 h-32 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-10 text-indigo-400/20">
              <i className="fas fa-satellite text-6xl"></i>
            </div>
            <h3 className="text-3xl font-black text-white mb-4">Signal Lost</h3>
            <p className="text-slate-500 max-w-md mx-auto text-lg font-medium">
              No neighbors have joined the network in PIN <span className="text-indigo-400">{currentUser.pinCode}</span> yet. Be the first to invite them!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
