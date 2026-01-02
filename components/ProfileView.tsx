
import React, { useState } from 'react';
import { UserProfile } from '../types.ts';
import { User, Shield, Smartphone, CreditCard, Award, Save, Edit2, Settings } from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  onAdminOpen: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdate, onAdminOpen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 animate-in fade-in duration-500 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-gaming text-lg tracking-widest text-white/80 uppercase">My Profile</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 bg-white/5 rounded-full text-neon-orange hover:bg-white/10 transition-colors"
        >
          {isEditing ? <Edit2 size={18} /> : <Edit2 size={18} />}
        </button>
      </div>

      <div className="bg-[#121212] rounded-3xl p-6 border border-white/5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <User size={120} strokeWidth={1}/>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-orange to-orange-700 flex items-center justify-center font-gaming text-2xl shadow-lg">
              {user.ign.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-gaming text-xl text-white tracking-wide">{user.ign}</h3>
              <p className="text-white/40 text-xs tracking-widest uppercase">Level {user.level} Pro Player</p>
            </div>
          </div>

          <div className="grid gap-4">
             <ProfileField 
                label="Full Name" 
                value={formData.fullName} 
                icon={<User size={14}/>}
                isEditing={isEditing}
                onChange={(v) => setFormData({...formData, fullName: v})}
             />
             <ProfileField 
                label="Free Fire UID" 
                value={formData.uid} 
                icon={<Smartphone size={14}/>}
                isEditing={isEditing}
                onChange={(v) => setFormData({...formData, uid: v})}
             />
             <div className="grid grid-cols-2 gap-4">
               <ProfileField 
                  label="IGN" 
                  value={formData.ign} 
                  icon={<Shield size={14}/>}
                  isEditing={isEditing}
                  onChange={(v) => setFormData({...formData, ign: v})}
               />
               <ProfileField 
                  label="Level" 
                  value={formData.level} 
                  icon={<Award size={14}/>}
                  isEditing={isEditing}
                  onChange={(v) => setFormData({...formData, level: v})}
               />
             </div>
             <ProfileField 
                label="My UPI ID" 
                value={formData.upiId} 
                icon={<CreditCard size={14}/>}
                isEditing={isEditing}
                onChange={(v) => setFormData({...formData, upiId: v})}
             />
          </div>

          {isEditing && (
            <button 
              type="submit"
              className="w-full bg-neon-orange py-4 rounded-xl font-gaming text-white tracking-widest mt-4 shadow-lg shadow-neon-orange/20 animate-in slide-in-from-bottom duration-300 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              SAVE CHANGES
            </button>
          )}
        </form>
      </div>

      {/* Admin Panel Access */}
      <button 
        onClick={onAdminOpen}
        className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl p-4 group active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neon-orange/10 rounded-lg text-neon-orange">
            <Settings size={20} />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-gaming text-white tracking-wider uppercase">Management</h4>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Admin Console</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-white/20 group-hover:text-neon-orange transition-colors" />
      </button>

      <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4">
        <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">DANGER ZONE</h4>
        <button 
          onClick={() => {
            if(confirm("Are you sure you want to clear all data? This will log you out.")) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="text-xs text-white/30 hover:text-red-400 transition-colors uppercase font-bold tracking-widest"
        >
          Reset Profile Data
        </button>
      </div>
    </div>
  );
};

const ProfileField: React.FC<{
  label: string;
  value: string;
  icon: React.ReactNode;
  isEditing: boolean;
  onChange: (v: string) => void;
}> = ({ label, value, icon, isEditing, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">{label}</label>
    {isEditing ? (
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
        <span className="text-white/20">{icon}</span>
        <input 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-none outline-none text-sm w-full text-white"
        />
      </div>
    ) : (
      <div className="flex items-center gap-2 px-1">
        <span className="text-neon-orange/60">{icon}</span>
        <span className="text-sm font-medium text-white/70">{value || 'N/A'}</span>
      </div>
    )}
  </div>
);

const ChevronRight: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default ProfileView;
