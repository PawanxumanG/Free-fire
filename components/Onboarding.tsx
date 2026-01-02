
import React, { useState } from 'react';
import { UserProfile } from '../types.ts';
import { User, Shield, Smartphone, CreditCard, Award, UserPlus } from 'lucide-react';

interface OnboardingProps {
  onSubmit: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserProfile>({
    fullName: '',
    ign: '',
    uid: '',
    level: '',
    device: '',
    upiId: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserProfile, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof UserProfile, string>> = {};
    if (!formData.fullName) newErrors.fullName = 'Required';
    if (!formData.ign) newErrors.ign = 'Required';
    if (!formData.uid) newErrors.uid = 'Required';
    if (!formData.level) newErrors.level = 'Required';
    if (!formData.upiId) newErrors.upiId = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center px-6 py-12 text-white">
      <div className="w-16 h-16 bg-neon-orange rounded-2xl flex items-center justify-center mb-6 pulse shadow-[0_0_20px_rgba(255,77,0,0.5)]">
        <span className="font-gaming text-3xl italic">FF</span>
      </div>
      <h2 className="font-gaming text-2xl tracking-widest mb-2 text-center uppercase">Join the Elite</h2>
      <p className="text-white/40 text-sm mb-8 text-center px-4">Create your gaming profile to start participating in tournaments.</p>

      <form onSubmit={handleSubmit} className="w-full space-y-4 max-w-sm">
        <InputGroup 
          label="Real Full Name" 
          icon={<User size={18}/>} 
          placeholder="E.g. Pawan Kumar" 
          value={formData.fullName} 
          onChange={(v) => setFormData({...formData, fullName: v})}
          error={errors.fullName}
        />
        <InputGroup 
          label="In-Game Name (IGN)" 
          icon={<Shield size={18}/>} 
          placeholder="E.g. HEADSHOT_PRO" 
          value={formData.ign} 
          onChange={(v) => setFormData({...formData, ign: v})}
          error={errors.ign}
        />
        <InputGroup 
          label="Free Fire UID" 
          icon={<Smartphone size={18}/>} 
          placeholder="E.g. 123456789" 
          value={formData.uid} 
          onChange={(v) => setFormData({...formData, uid: v})}
          error={errors.uid}
        />
        <div className="grid grid-cols-2 gap-4">
          <InputGroup 
            label="Player Level" 
            icon={<Award size={18}/>} 
            placeholder="E.g. 65" 
            value={formData.level} 
            onChange={(v) => setFormData({...formData, level: v})}
            error={errors.level}
          />
          <InputGroup 
            label="Device (Optional)" 
            icon={<Smartphone size={18}/>} 
            placeholder="E.g. iPhone 15" 
            value={formData.device || ''} 
            onChange={(v) => setFormData({...formData, device: v})}
          />
        </div>
        <InputGroup 
          label="Your UPI ID" 
          icon={<CreditCard size={18}/>} 
          placeholder="E.g. username@upi" 
          value={formData.upiId} 
          onChange={(v) => setFormData({...formData, upiId: v})}
          error={errors.upiId}
        />

        <button 
          type="submit" 
          className="w-full bg-neon-orange py-4 rounded-xl font-gaming text-white tracking-widest mt-6 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <UserPlus size={20} />
          CREATE PROFILE
        </button>
      </form>
    </div>
  );
};

const InputGroup: React.FC<{
  label: string; 
  icon: React.ReactNode; 
  placeholder: string; 
  value: string; 
  onChange: (v: string) => void;
  error?: string;
}> = ({ label, icon, placeholder, value, onChange, error }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">{label}</label>
    <div className={`flex items-center gap-3 bg-[#121212] border ${error ? 'border-red-500' : 'border-white/5'} px-4 py-3 rounded-xl focus-within:border-neon-orange transition-colors shadow-inner`}>
      <span className="text-white/20">{icon}</span>
      <input 
        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/20" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

export default Onboarding;
