
import React from 'react';
import { ScrollText, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';

interface RulesViewProps {
  rules: string[];
}

const RulesView: React.FC<RulesViewProps> = ({ rules }) => {
  return (
    <div className="p-6 animate-in fade-in duration-500 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-neon-orange/10 rounded-xl flex items-center justify-center text-neon-orange border border-neon-orange/20">
          <ScrollText size={20} />
        </div>
        <div>
          <h2 className="font-gaming text-lg tracking-widest text-white/80 uppercase">Tournament Rules</h2>
          <p className="text-[10px] text-white/30 tracking-widest uppercase font-bold">Standard Operating Procedures</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[#121212] rounded-2xl p-5 border border-white/5 space-y-4">
          <h3 className="flex items-center gap-2 text-xs font-gaming text-neon-orange tracking-widest">
            <ShieldCheck size={14} />
            FAIR PLAY POLICY
          </h3>
          <div className="space-y-4">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-4 group">
                <span className="font-gaming text-xs text-white/20 group-hover:text-neon-orange transition-colors">0{idx+1}</span>
                <p className="text-sm text-white/60 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/5 rounded-2xl p-5 border border-yellow-500/10 space-y-3">
          <h3 className="flex items-center gap-2 text-xs font-gaming text-yellow-500 tracking-widest">
            <AlertCircle size={14} />
            DISQUALIFICATION
          </h3>
          <p className="text-xs text-white/50 leading-relaxed">
            Players found violating any rules will be immediately disqualified from the tournament. Entry fees will NOT be refunded in case of disqualification.
          </p>
        </div>

        <div className="bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10 space-y-3">
          <h3 className="flex items-center gap-2 text-xs font-gaming text-blue-400 tracking-widest">
            <HelpCircle size={14} />
            NEED SUPPORT?
          </h3>
          <p className="text-xs text-white/50 leading-relaxed mb-3">
            If you face any issues while joining or have questions regarding the prize pool, please contact us on WhatsApp.
          </p>
          <button 
             onClick={() => window.open('https://wa.me/919867637326', '_blank')}
             className="w-full bg-blue-500/10 hover:bg-blue-500/20 py-3 rounded-xl text-blue-400 font-bold text-[10px] tracking-widest uppercase transition-colors"
          >
            CONTACT SUPPORT
          </button>
        </div>
      </div>
      
      <div className="text-center py-4">
        <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">Free Fire Tournament Hub v1.0.0</p>
      </div>
    </div>
  );
};

export default RulesView;
