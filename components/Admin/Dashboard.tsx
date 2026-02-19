
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { storageService } from '../../services/storage';
import Button from '../UI/Button';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const allUsers = await storageService.getUsers();
      setUsers(allUsers.filter(u => u.role !== 'admin'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleStatusUpdate = async (userId: string, status: 'approved' | 'rejected') => {
    await storageService.updateUserStatus(userId, status);
    loadUsers();
  };

  const stats = {
    total: users.length,
    pending: users.filter(u => u.status === 'pending').length,
    approved: users.filter(u => u.status === 'approved').length,
  };

  const filteredUsers = users.filter(u => filter === 'all' || u.status === filter);

  return (
    <div className="space-y-12 animate-slide-up">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div>
          <div className="flex items-center gap-3 text-indigo-400 mb-4">
            <i className="fas fa-server"></i>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Operational Status: Online</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Command Center</h1>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          {[
            { label: 'Network', val: stats.total, color: 'bg-white/5 border-white/10 text-white' },
            { label: 'Pending', val: stats.pending, color: 'bg-amber-500/10 border-amber-500/20 text-amber-500' },
            { label: 'Active', val: stats.approved, color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' }
          ].map((s, i) => (
            <div key={i} className={`flex-1 lg:w-32 p-6 rounded-[2rem] border glass-card text-center ${s.color}`}>
              <div className="text-3xl font-black mb-1">{s.val}</div>
              <div className="text-[8px] font-black uppercase tracking-widest opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 glass-panel p-2 rounded-2xl w-fit border-white/10">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${
              filter === f 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="py-40 flex flex-col items-center gap-6">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Accessing Secure Records...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.05] border-b border-white/10">
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Subject</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Locality</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Auth Status</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, idx) => (
                    <tr key={user.id} className="hover:bg-white/[0.03] transition-colors group animate-slide-up" style={{animationDelay: `${idx * 0.05}s`}}>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-white text-lg">{user.name}</div>
                            <div className="text-xs text-slate-400 font-medium">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-200 flex items-center gap-2 mb-1">
                            <i className="fas fa-location-dot text-indigo-500 text-[10px]"></i>
                            {user.pinCode}
                          </span>
                          <span className="text-[11px] text-slate-400 truncate max-w-[200px]">{user.address}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl border ${
                          user.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          user.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'approved' ? 'bg-emerald-400 animate-pulse' : user.status === 'pending' ? 'bg-amber-400' : 'bg-rose-400'}`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right">
                        {user.status === 'pending' ? (
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => handleStatusUpdate(user.id, 'approved')}
                              className="h-12 w-12 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center"
                              title="Approve"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(user.id, 'rejected')}
                              className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-rose-500 hover:border-rose-500/30 transition-all flex items-center justify-center"
                              title="Decline"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Archived</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-10 py-32 text-center">
                      <i className="fas fa-ghost text-5xl text-slate-700 mb-6 block"></i>
                      <h3 className="text-xl font-black text-slate-500 uppercase tracking-widest">No Records Found</h3>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
