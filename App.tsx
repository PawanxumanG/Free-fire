
import React, { useState, useEffect } from 'react';
import { UserProfile, Tournament, AppConfig, JoinedTournament } from './types.ts';
import { STORAGE_KEY, HISTORY_STORAGE_KEY, MOCK_DATA, APP_NAME, GITHUB_FALLBACK_URL } from './constants.ts';
import Onboarding from './components/Onboarding.tsx';
import Home from './components/Home.tsx';
import TournamentDetail from './components/TournamentDetail.tsx';
import ProfileView from './components/ProfileView.tsx';
import RulesView from './components/RulesView.tsx';
import HistoryView from './components/HistoryView.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import { User, Home as HomeIcon, ListChecks, History as HistoryIcon, Youtube, Instagram, Lock, X } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [joinedHistory, setJoinedHistory] = useState<JoinedTournament[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  
  const [config, setConfig] = useState<AppConfig>({
    banners: MOCK_DATA.banners,
    rules: MOCK_DATA.rules,
    upiId: "pawanponnam-1@okicici",
    adminWhatsApp: "919867637326"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'rules' | 'profile'>('home');
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEY);
    if (savedProfile) {
      setUser(JSON.parse(savedProfile));
    }

    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedHistory) {
      setJoinedHistory(JSON.parse(savedHistory));
    }

    const fetchTournaments = async () => {
      setIsLoading(true);
      let dataLoaded = false;
      
      const tryFetch = async (url: string) => {
        try {
          const response = await fetch(url + '?t=' + Date.now());
          if (!response.ok) return null;
          return await response.json();
        } catch (e) {
          return null;
        }
      };

      try {
        let data = await tryFetch('./tournaments.json');
        let sourceUrl = './';

        if (!data) {
          data = await tryFetch(GITHUB_FALLBACK_URL);
          if (data) {
            sourceUrl = GITHUB_FALLBACK_URL.substring(0, GITHUB_FALLBACK_URL.lastIndexOf('/') + 1);
          }
        }

        if (data) {
          const resolveImg = (path: string) => {
            if (!path) return '';
            if (path.startsWith('http') || path.startsWith('data:')) return path;
            if (sourceUrl === './') return path;
            return sourceUrl + path;
          };

          const resolvedBanners = (data.banners || []).map(resolveImg);
          const resolvedTournaments = (data.tournaments || []).map((t: any) => ({
            ...t,
            image: resolveImg(t.image),
            rules: t.rules || data.rules || MOCK_DATA.rules,
            totalSlots: t.totalSlots || 48,
            joinedSlots: t.joinedSlots || 0,
            minSlots: t.minSlots || 10
          }));

          setTournaments(resolvedTournaments);
          setConfig({
            banners: resolvedBanners.length > 0 ? resolvedBanners : MOCK_DATA.banners,
            rules: data.rules || MOCK_DATA.rules,
            upiId: data.upiId || "pawanponnam-1@okicici",
            adminWhatsApp: data.adminWhatsApp || "919867637326"
          });
          dataLoaded = true;
        }
      } catch (error) {
        console.warn("Tournament data fetch encountered an error:", error);
      }

      if (!dataLoaded) {
        setTournaments([
          {
            id: 'mock-1',
            name: 'Sample Tournament (Local)',
            matchType: 'Solo',
            entryFee: 50,
            dateTime: 'Coming Soon, 00:00 AM',
            prizePool: '₹1000',
            status: 'Open',
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
            description: 'This is fallback data because tournaments.json could not be loaded.',
            rules: MOCK_DATA.rules,
            totalSlots: 48,
            joinedSlots: 10,
            minSlots: 10
          }
        ]);
      }
      setIsLoading(false);
    };

    fetchTournaments();
  }, []);

  const handleProfileSubmit = (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);
  };

  const handleUpdateProfile = (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);
    setActiveTab('home');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassInput === "Pawan1645@") {
      setIsAdminOpen(true);
      setIsAdminLoginOpen(false);
      setAdminPassInput('');
    } else {
      alert("Invalid Passcode!");
    }
  };

  const handleJoinSuccess = (tournament: Tournament) => {
    const newJoin: JoinedTournament = {
      id: tournament.id,
      name: tournament.name,
      dateTime: tournament.dateTime,
      entryFee: tournament.entryFee,
      joinedAt: new Date().toISOString()
    };
    
    const exists = joinedHistory.some(h => h.id === tournament.id);
    if (!exists) {
      const updatedHistory = [...joinedHistory, newJoin];
      setJoinedHistory(updatedHistory);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    }
  };

  if (!user) {
    return <Onboarding onSubmit={handleProfileSubmit} />;
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#0a0a0a] overflow-hidden">
      <header className="px-4 py-4 bg-[#121212] border-b border-white/5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neon-orange rounded-md flex items-center justify-center">
            <span className="text-white font-gaming text-sm italic">FF</span>
          </div>
          <h1 className="font-gaming text-lg tracking-wider neon-orange">{APP_NAME}</h1>
        </div>
        <div className="flex items-center gap-1">
          <a href="https://youtube.com/@shinzofreefire?si=xhprONRvAa4N4503" target="_blank" rel="noopener noreferrer" className="p-2 text-white/60 hover:text-red-600 transition-colors">
            <Youtube size={20} />
          </a>
          <a href="https://www.instagram.com/legend_shinzo_ff?igsh=MWNhMmx3ZG5oNDdkbw==" target="_blank" rel="noopener noreferrer" className="p-2 text-white/60 hover:text-pink-600 transition-colors">
            <Instagram size={20} />
          </a>
          <button onClick={() => setIsHistoryOpen(true)} className="relative p-2 text-white/60">
            <HistoryIcon size={20} />
            {joinedHistory.length > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-neon-orange rounded-full text-[8px] font-bold text-white flex items-center justify-center border-2 border-[#121212]">{joinedHistory.length}</span>}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-neon-orange/20 border-t-neon-orange rounded-full animate-spin"></div>
            <p className="text-white/40 font-gaming text-xs">LOADING ARENA...</p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && <Home tournaments={tournaments} banners={config.banners} onSelectTournament={setSelectedTournament} />}
            {activeTab === 'rules' && <RulesView rules={config.rules} />}
            {activeTab === 'profile' && <ProfileView user={user} onUpdate={handleUpdateProfile} onAdminOpen={() => setIsAdminLoginOpen(true)} />}
          </>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#121212] border-t border-white/5 flex justify-around items-center h-16 z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-neon-orange' : 'text-white/40'}`}>
          <HomeIcon size={24} /><span className="text-[10px] font-bold">HOME</span>
        </button>
        <button onClick={() => setActiveTab('rules')} className={`flex flex-col items-center gap-1 ${activeTab === 'rules' ? 'text-neon-orange' : 'text-white/40'}`}>
          <ListChecks size={24} /><span className="text-[10px] font-bold">RULES</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-neon-orange' : 'text-white/40'}`}>
          <User size={24} /><span className="text-[10px] font-bold">PROFILE</span>
        </button>
      </nav>

      {/* Admin Login Modal */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#121212] w-full max-w-xs rounded-3xl border border-white/10 p-8 flex flex-col items-center gap-6 shadow-2xl relative">
            <button onClick={() => setIsAdminLoginOpen(false)} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-white/40"><X size={16}/></button>
            <div className="w-16 h-16 bg-neon-orange/10 rounded-2xl flex items-center justify-center text-neon-orange border border-neon-orange/20 shadow-lg shadow-neon-orange/10">
              <Lock size={32} />
            </div>
            <div className="text-center">
              <h3 className="font-gaming text-lg tracking-widest text-white uppercase">Admin Login</h3>
              <p className="text-[10px] text-white/30 tracking-widest uppercase font-bold mt-1">Authorized Access Only</p>
            </div>
            <form onSubmit={handleAdminLogin} className="w-full space-y-4">
              <input 
                type="password"
                placeholder="Enter Passcode"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-center tracking-[0.5em] text-white focus:border-neon-orange outline-none"
                value={adminPassInput}
                onChange={(e) => setAdminPassInput(e.target.value)}
                autoFocus
              />
              <button type="submit" className="w-full bg-neon-orange py-4 rounded-xl font-gaming text-xs tracking-widest text-white shadow-xl shadow-neon-orange/20 active:scale-95 transition-all">
                UNLOCK CONSOLE
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedTournament && <TournamentDetail tournament={selectedTournament} user={user} onClose={() => setSelectedTournament(null)} onJoinSuccess={() => handleJoinSuccess(selectedTournament)} upiId={config.upiId} adminWhatsApp={config.adminWhatsApp} />}
      {isHistoryOpen && <HistoryView history={joinedHistory} onClose={() => setIsHistoryOpen(false)} />}
      {isAdminOpen && <AdminPanel config={config} tournaments={tournaments} onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
};

export default App;
