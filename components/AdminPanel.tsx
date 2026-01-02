
import React, { useState } from 'react';
import { Tournament, AppConfig } from '../types.ts';
import { X, Save, Plus, Trash2, Copy, Check, Settings, Image as ImageIcon, Trophy, Phone, CreditCard, List, Info } from 'lucide-react';

interface AdminPanelProps {
  config: AppConfig;
  tournaments: Tournament[];
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ config, tournaments: initialTournaments, onClose }) => {
  const [localConfig, setLocalConfig] = useState<AppConfig>(config);
  const [localTournaments, setLocalTournaments] = useState<Tournament[]>(initialTournaments);
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- Banner Helpers ---
  const addBanner = () => {
    setLocalConfig({ ...localConfig, banners: [...localConfig.banners, "banner.jpg"] });
  };

  const removeBanner = (index: number) => {
    const newBanners = localConfig.banners.filter((_, i) => i !== index);
    setLocalConfig({ ...localConfig, banners: newBanners });
  };

  const updateBanner = (index: number, value: string) => {
    const newBanners = [...localConfig.banners];
    newBanners[index] = value;
    setLocalConfig({ ...localConfig, banners: newBanners });
  };

  // --- Tournament Helpers ---
  const handleAddTournament = () => {
    const newT: Tournament = {
      id: Date.now().toString(),
      name: "New Tournament",
      matchType: "Solo",
      entryFee: 0,
      dateTime: "25 Oct, 08:00 PM",
      prizePool: "₹1000",
      status: "Open",
      image: "tournament.jpg",
      description: "Enter match description here...",
      rules: ["No hacks", "Join 10 mins early"],
      totalSlots: 48,
      joinedSlots: 0,
      minSlots: 10
    };
    setLocalTournaments([newT, ...localTournaments]);
  };

  const updateTournament = (id: string, updates: Partial<Tournament>) => {
    setLocalTournaments(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTournament = (id: string) => {
    if (confirm("Permanently delete this tournament?")) {
      setLocalTournaments(prev => prev.filter(t => t.id !== id));
    }
  };

  const generatedJson = JSON.stringify({
    ...localConfig,
    tournaments: localTournaments
  }, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col text-white animate-in fade-in duration-300">
      <header className="px-6 py-4 bg-[#121212] border-b border-white/5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Settings className="text-neon-orange" size={20} />
          <h2 className="font-gaming text-sm tracking-widest uppercase text-white">ADMIN DASHBOARD</h2>
        </div>
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
          <X size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        
        {/* 1. CONTACT & PAYMENTS */}
        <section className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
            <Phone size={12} /> Contact & Payments
          </label>
          <div className="bg-[#121212] rounded-2xl p-4 border border-white/5 space-y-4 shadow-xl">
            <AdminInput 
              label="Admin WhatsApp (91XXXXXXXXXX)" 
              value={localConfig.adminWhatsApp} 
              onChange={v => setLocalConfig({...localConfig, adminWhatsApp: v})} 
            />
            <AdminInput 
              label="Admin UPI ID" 
              value={localConfig.upiId} 
              onChange={v => setLocalConfig({...localConfig, upiId: v})} 
            />
          </div>
        </section>

        {/* 2. HOME PAGE BANNERS */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
              <ImageIcon size={12} /> Home Banners
            </label>
            <button onClick={addBanner} className="text-neon-orange text-[10px] font-bold uppercase tracking-widest bg-neon-orange/10 px-3 py-1 rounded border border-neon-orange/20">+ Add</button>
          </div>
          <div className="bg-[#121212] rounded-2xl p-4 border border-white/5 space-y-4">
            {localConfig.banners.map((url, i) => (
              <div key={i} className="flex flex-col gap-2 p-3 bg-black/20 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <input 
                    className="flex-1 bg-transparent border-none outline-none text-xs text-white/70 font-mono"
                    value={url}
                    onChange={(e) => updateBanner(i, e.target.value)}
                    placeholder="banner-image-url.jpg"
                  />
                  <button onClick={() => removeBanner(i)} className="text-red-500/60 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
                {url && <img src={url.startsWith('http') ? url : url} className="h-14 w-full object-cover rounded-lg opacity-40 grayscale" alt="preview" onError={(e) => (e.currentTarget.style.display = 'none')} />}
              </div>
            ))}
          </div>
        </section>

        {/* 3. TOURNAMENT MANAGEMENT */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
              <Trophy size={12} /> Tournaments
            </label>
            <button 
              onClick={handleAddTournament}
              className="bg-neon-orange px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest flex items-center gap-2 shadow-lg shadow-neon-orange/20"
            >
              <Plus size={16} /> NEW MATCH
            </button>
          </div>

          <div className="space-y-6">
            {localTournaments.map((t) => (
              <div key={t.id} className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="bg-white/5 px-4 py-3 flex justify-between items-center border-b border-white/5">
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">{t.matchType}</span>
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${t.status === 'Open' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>{t.status}</span>
                  </div>
                  <button onClick={() => deleteTournament(t.id)} className="text-red-500/50 hover:text-red-500 p-1 transition-colors"><Trash2 size={18}/></button>
                </div>
                
                <div className="p-5 space-y-5">
                  <AdminInput label="Tournament Title" value={t.name} onChange={v => updateTournament(t.id, {name: v})} />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">Match Type</label>
                      <select 
                        className="bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:border-neon-orange outline-none"
                        value={t.matchType}
                        onChange={(e) => updateTournament(t.id, {matchType: e.target.value as any})}
                      >
                        <option value="Solo">Solo</option>
                        <option value="Duo">Duo</option>
                        <option value="Squad">Squad</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">Status</label>
                      <select 
                        className="bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:border-neon-orange outline-none"
                        value={t.status}
                        onChange={(e) => updateTournament(t.id, {status: e.target.value as any})}
                      >
                        <option value="Open">Open</option>
                        <option value="Full">Full</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <AdminInput label="Entry Fee (₹)" value={t.entryFee.toString()} onChange={v => updateTournament(t.id, {entryFee: parseInt(v) || 0})} />
                    <AdminInput label="Prize Pool (₹)" value={t.prizePool} onChange={v => updateTournament(t.id, {prizePool: v})} />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <AdminInput label="Min Slots" value={(t.minSlots || 10).toString()} onChange={v => updateTournament(t.id, {minSlots: parseInt(v) || 10})} />
                    <AdminInput label="Joined" value={t.joinedSlots.toString()} onChange={v => updateTournament(t.id, {joinedSlots: parseInt(v) || 0})} />
                    <AdminInput label="Total Slots" value={t.totalSlots.toString()} onChange={v => updateTournament(t.id, {totalSlots: parseInt(v) || 0})} />
                  </div>

                  <AdminInput label="Date & Time (e.g. 25 Oct, 08:00 PM)" value={t.dateTime} onChange={v => updateTournament(t.id, {dateTime: v})} />
                  <AdminInput label="Image Filename/URL" value={t.image} onChange={v => updateTournament(t.id, {image: v})} />
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">Description</label>
                    <textarea 
                      className="bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:border-neon-orange outline-none min-h-[80px] resize-none"
                      value={t.description}
                      onChange={(e) => updateTournament(t.id, {description: e.target.value})}
                      placeholder="Enter full match details..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Bottom Sticky Save/Export */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#121212] border-t border-white/10 p-5 flex flex-col gap-3 z-20">
        <button 
          onClick={() => setShowJson(true)}
          className="w-full bg-neon-orange py-4 rounded-2xl font-gaming text-sm tracking-widest shadow-xl shadow-neon-orange/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <Save size={20} /> SYNC CHANGES
        </button>
      </footer>

      {/* JSON Modal for Copying */}
      {showJson && (
        <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-6 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#121212] w-full max-w-sm rounded-[32px] border border-white/10 overflow-hidden flex flex-col max-h-[85vh] shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-2">
                <Info size={16} className="text-neon-orange" />
                <div>
                  <h3 className="font-gaming text-sm tracking-widest text-white">UPDATE GITHUB</h3>
                  <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Follow these steps</p>
                </div>
              </div>
              <button onClick={() => setShowJson(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><X size={18}/></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="space-y-3">
                <p className="text-[10px] text-neon-orange font-bold uppercase tracking-widest">Step 1: Copy Output Code</p>
                <button 
                  onClick={copyToClipboard}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold tracking-widest transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'}`}
                >
                  {copied ? <Check size={18}/> : <Copy size={18}/>}
                  {copied ? "CODE COPIED!" : "COPY JSON CODE"}
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Step 2: Paste in Repository</p>
                <p className="text-[10px] text-white/30 leading-relaxed italic px-1">
                  Go to your GitHub repo, open <span className="text-white/60 font-mono font-bold">tournaments.json</span>, edit it, delete current content, and paste the code. Save to update app.
                </p>
              </div>
              <div className="p-4 bg-black/60 rounded-2xl border border-white/5">
                <pre className="text-[8px] text-white/20 font-mono overflow-x-auto whitespace-pre max-h-32">
                  {generatedJson}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminInput: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">{label}</label>
    <input 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:border-neon-orange outline-none transition-colors"
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

export default AdminPanel;
