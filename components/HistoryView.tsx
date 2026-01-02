
import React from 'react';
import { JoinedTournament } from '../types.ts';
import { X, History, Trophy, Calendar, IndianRupee } from 'lucide-react';

interface HistoryViewProps {
  history: JoinedTournament[];
  onClose: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-[#0a0a0a] rounded-t-[32px] border-t border-white/10 shadow-2xl flex flex-col h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-500">
        <header className="px-8 py-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-orange/10 rounded-lg text-neon-orange">
              <History size={20} />
            </div>
            <div>
              <h2 className="font-gaming text-lg tracking-widest text-white uppercase">Participation</h2>
              <p className="text-[10px] text-white/30 tracking-widest uppercase font-bold">Your Tournament History</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-white/40">
            <X size={20} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30 gap-4">
              <History size={48} strokeWidth={1} />
              <p className="font-gaming text-xs tracking-widest">NO TOURNAMENTS JOINED YET</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item, idx) => (
                <div key={idx} className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex flex-col gap-3 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                    <Trophy size={60} />
                  </div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-gaming text-sm text-white tracking-wider max-w-[70%]">{item.name}</h3>
                    <span className="text-[9px] font-bold text-neon-orange bg-neon-orange/10 px-2 py-0.5 rounded border border-neon-orange/20 uppercase">Joined</span>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-white/30" />
                      <span className="text-[10px] text-white/60 font-medium">{item.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <IndianRupee size={12} className="text-white/30" />
                      <span className="text-[10px] text-white/60 font-medium">₹{item.entryFee} Fee</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[8px] text-white/20 font-bold uppercase tracking-widest">Reg: {new Date(item.joinedAt).toLocaleDateString()}</span>
                    <button className="text-[9px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1">
                      VIEW SLIP
                    </button>
                  </div>
                </div>
              )).reverse()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HistoryView;
