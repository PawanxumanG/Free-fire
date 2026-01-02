
import React, { useState, useEffect } from 'react';
import { Tournament } from '../types.ts';
import { Calendar, Users, Trophy, ChevronRight } from 'lucide-react';

interface HomeProps {
  tournaments: Tournament[];
  banners: string[];
  onSelectTournament: (t: Tournament) => void;
}

const Home: React.FC<HomeProps> = ({ tournaments, banners, onSelectTournament }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (banners.length > 0) {
      const timer = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [banners.length]);

  return (
    <div className="flex flex-col gap-6 p-4 animate-in fade-in duration-500">
      <div className="relative w-full h-44 rounded-2xl overflow-hidden group shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-white/5">
        {banners.map((banner, idx) => (
          <img 
            key={idx}
            src={banner} 
            alt={`Banner ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === currentBanner ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
          <p className="font-gaming text-xs text-neon-orange tracking-widest italic drop-shadow-lg">FEATURED EVENT</p>
          <h3 className="font-gaming text-xl text-white drop-shadow-md">SUMMER PRO SERIES</h3>
        </div>
        <div className="absolute bottom-3 right-4 flex gap-1.5">
          {banners.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 rounded-full transition-all duration-300 ${idx === currentBanner ? 'w-4 bg-neon-orange' : 'w-1 bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-gaming text-sm tracking-widest text-white/80">LIVE & UPCOMING</h2>
          <span className="text-[10px] text-neon-orange font-bold uppercase tracking-widest bg-neon-orange/10 px-2 py-0.5 rounded border border-neon-orange/20">Open Now</span>
        </div>

        <div className="grid gap-4">
          {tournaments.map((t) => (
            <TournamentCard 
              key={t.id} 
              tournament={t} 
              onClick={() => onSelectTournament(t)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TournamentCard: React.FC<{ tournament: Tournament; onClick: () => void }> = ({ tournament, onClick }) => {
  const fillPercentage = Math.min(100, (tournament.joinedSlots / tournament.totalSlots) * 100);
  
  return (
    <div 
      onClick={onClick}
      className="bg-[#121212] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 active:scale-[0.98] transition-all group cursor-pointer"
    >
      <div className="relative h-32">
        <img 
          src={tournament.image} 
          alt={tournament.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest border ${
            tournament.status === 'Open' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
            tournament.status === 'Full' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
            'bg-white/10 text-white/40 border-white/5'
          }`}>
            {tournament.status}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest bg-neon-orange/20 text-white border border-neon-orange/30">
            ₹{tournament.entryFee} Entry
          </span>
        </div>
        <div className="absolute bottom-2 left-3">
           <h3 className="font-gaming text-lg text-white leading-none mb-1 drop-shadow-md">{tournament.name}</h3>
        </div>
      </div>
      
      <div className="p-4 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1">
            <Users size={14} className="text-neon-orange" />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Type</span>
            <span className="text-xs font-gaming">{tournament.matchType}</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-white/5">
            <Trophy size={14} className="text-neon-orange" />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Prize</span>
            <span className="text-xs font-gaming text-yellow-400">{tournament.prizePool}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Calendar size={14} className="text-neon-orange" />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Time</span>
            <span className="text-[10px] font-bold whitespace-nowrap">{tournament.dateTime.split(',')[1]}</span>
          </div>
        </div>

        {/* Slot Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
            <span className="text-white/30">Players Joined</span>
            <span className="text-neon-orange">{tournament.joinedSlots} / {tournament.totalSlots}</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-600 to-neon-orange transition-all duration-1000"
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>

        <button className="w-full bg-white/5 group-hover:bg-neon-orange transition-colors py-2 rounded-lg flex items-center justify-center gap-2 group">
          <span className="font-gaming text-[10px] tracking-widest group-hover:text-white text-white/40">JOIN TOURNAMENT</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Home;
