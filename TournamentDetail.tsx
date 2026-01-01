
import React, { useState } from 'react';
import { Tournament, UserProfile } from '../types.ts';
import { X, Calendar, Users, Trophy, CreditCard, ExternalLink, MessageSquare, Shield } from 'lucide-react';

interface TournamentDetailProps {
  tournament: Tournament;
  user: UserProfile;
  onClose: () => void;
  onJoinSuccess: () => void;
  upiId: string;
  adminWhatsApp: string;
}

const TournamentDetail: React.FC<TournamentDetailProps> = ({ tournament, user, onClose, onJoinSuccess, upiId, adminWhatsApp }) => {
  const [step, setStep] = useState<'details' | 'confirm' | 'payment'>('details');

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(`
Hi Admin! I want to confirm my slot for ${tournament.name}.

*PAYMENT DETAILS:*
- *Tournament:* ${tournament.name}
- *Amount Paid:* ₹${tournament.entryFee}

*PLAYER DETAILS:*
- *Name:* ${user.fullName}
- *IGN:* ${user.ign}
- *UID:* ${user.uid}
- *UPI ID:* ${user.upiId}
- *Device:* ${user.device || 'N/A'}

I have attached the payment screenshot below.
    `.trim());
    
    onJoinSuccess();
    window.open(`https://wa.me/${adminWhatsApp}?text=${message}`, '_blank');
  };

  const upiUrl = `upi://pay?pa=${upiId}&pn=FFTournamentHub&am=${tournament.entryFee}&cu=INR&tn=${encodeURIComponent(tournament.name + ' Registration')}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  const fillPercentage = Math.min(100, (tournament.joinedSlots / tournament.totalSlots) * 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center animate-in slide-in-from-bottom duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-[#0a0a0a] rounded-t-[32px] border-t border-white/10 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        <div className="relative h-48 flex-shrink-0">
          <img src={tournament.image} alt={tournament.name} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/40 rounded-full text-white/80 hover:bg-black/60">
            <X size={20} />
          </button>
          <div className="absolute bottom-6 left-8">
            <h2 className="font-gaming text-2xl text-white tracking-wider uppercase drop-shadow-lg">{tournament.name}</h2>
            <p className="text-neon-orange font-bold text-xs tracking-widest">{tournament.matchType} MATCH • ₹{tournament.entryFee} ENTRY</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-2">
          {step === 'details' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-3 gap-4">
                <InfoItem icon={<Users size={18}/>} label="TYPE" value={tournament.matchType} />
                <InfoItem icon={<Calendar size={18}/>} label="DATE" value={tournament.dateTime.split(',')[0]} />
                <InfoItem icon={<Trophy size={18}/>} label="PRIZE" value={tournament.prizePool} />
              </div>

              {/* Slot Indicator */}
              <div className="bg-[#121212] p-4 rounded-2xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-white/30">Arena Capacity</span>
                  <span className="text-neon-orange">{tournament.joinedSlots} / {tournament.totalSlots} Slots Filled</span>
                </div>
                <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-neon-orange shadow-[0_0_10px_rgba(255,77,0,0.5)] transition-all duration-1000"
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
                <p className="text-[9px] text-white/20 text-center uppercase tracking-widest">Min. {tournament.minSlots || 10} players required to start</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-gaming text-xs text-white/40 tracking-widest uppercase">Overview</h3>
                <p className="text-white/60 text-sm leading-relaxed">{tournament.description}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-gaming text-xs text-white/40 tracking-widest uppercase">Match Rules</h3>
                <ul className="space-y-2 pb-4">
                  {tournament.rules.map((rule, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/50">
                      <span className="text-neon-orange font-bold">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 space-y-4 shadow-inner">
                <h3 className="font-gaming text-xs text-neon-orange tracking-widest uppercase text-center">Confirm Registration</h3>
                <div className="space-y-4">
                  <ConfirmItem label="Full Name" value={user.fullName} />
                  <ConfirmItem label="In-Game Name" value={user.ign} />
                  <ConfirmItem label="FF UID" value={user.uid} />
                  <ConfirmItem label="UPI ID" value={user.upiId} />
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300 text-center flex flex-col items-center py-4">
              <div className="bg-white p-4 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <img src={qrCodeUrl} alt="UPI QR" className="w-48 h-48" />
              </div>
              <div className="space-y-2">
                <h3 className="font-gaming text-lg text-white uppercase tracking-wider">₹{tournament.entryFee}</h3>
                <p className="text-white/40 text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
                  <CreditCard size={12} className="text-neon-orange" />
                  Scan to pay via Any UPI App
                </p>
              </div>
              <a href={upiUrl} className="text-neon-orange text-[10px] font-bold tracking-widest uppercase underline flex items-center gap-1">
                OPEN UPI APP DIRECTLY <ExternalLink size={10} />
              </a>
            </div>
          )}
        </div>

        <div className="p-8 flex-shrink-0 bg-gradient-to-t from-[#0a0a0a] to-transparent">
          {tournament.status === 'Open' ? (
            <div className="flex flex-col gap-3">
              {step === 'details' && <button onClick={() => setStep('confirm')} className="w-full bg-neon-orange py-4 rounded-xl font-gaming text-white tracking-widest shadow-lg active:scale-[0.98] transition-all">JOIN NOW</button>}
              {step === 'confirm' && (
                <div className="flex gap-3">
                  <button onClick={() => setStep('details')} className="flex-1 bg-white/5 py-4 rounded-xl font-gaming text-white/40 tracking-widest">BACK</button>
                  <button onClick={() => setStep('payment')} className="flex-[2] bg-neon-orange py-4 rounded-xl font-gaming text-white tracking-widest">PAY ₹{tournament.entryFee}</button>
                </div>
              )}
              {step === 'payment' && <button onClick={handleWhatsAppRedirect} className="w-full bg-[#25D366] py-4 rounded-xl font-gaming text-white tracking-widest flex items-center justify-center gap-2 shadow-lg"><MessageSquare size={20} />CONFIRM ON WHATSAPP</button>}
            </div>
          ) : (
            <button disabled className="w-full bg-white/5 py-4 rounded-xl font-gaming text-white/20 tracking-widest cursor-not-allowed border border-white/5">TOURNAMENT FULL</button>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-[#121212] border border-white/5">
    <div className="text-neon-orange opacity-80">{icon}</div>
    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{label}</span>
    <span className="text-[11px] font-gaming text-white/80">{value}</span>
  </div>
);

const ConfirmItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-2">
    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{label}</span>
    <span className="text-sm font-medium text-white/80">{value}</span>
  </div>
);

export default TournamentDetail;
