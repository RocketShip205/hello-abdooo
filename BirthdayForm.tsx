import React from 'react';

interface BirthdayFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const BirthdayForm: React.FC<BirthdayFormProps> = ({ onSubmit, isLoading }) => {
  const handleTrigger = () => {
    onSubmit({});
  };

  return (
    <div className="relative">
      {/* Visual Accents */}
      <div className="absolute -top-12 -right-8 opacity-20 rotate-12 -z-10">
        <i className="fa-solid fa-mug-saucer text-9xl text-amber-900"></i>
      </div>
      <div className="absolute -bottom-8 -left-12 opacity-10 -rotate-12 -z-10">
        <i className="fa-solid fa-code-commit text-9xl text-indigo-900"></i>
      </div>
      
      <div className="bg-indigo-950 p-10 md:p-12 rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(30,27,75,0.5)] border border-indigo-800/50 relative overflow-hidden group">
        {/* Code background effect */}
        <div className="absolute inset-0 opacity-5 font-mono text-[10px] text-white pointer-events-none select-none p-4 leading-tight overflow-hidden">
          {Array(20).fill("if (coffee == empty) refill(); while(asleep) dream_of_code(); ").join(" ")}
        </div>
        
        <div className="relative z-10 text-center">
          <div className="mb-8 inline-flex items-center gap-4 bg-indigo-900/50 px-6 py-3 rounded-2xl border border-indigo-700/50">
             <div className="flex gap-2">_
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
             </div>
             <span className="text-indigo-300 font-mono text-xs uppercase tracking-tighter">abderhaman_v15</span>
          </div>

          <h3 className="text-white font-black text-3xl mb-8 tracking-tight">
            HHHHHH 😂😂 Mala <br/><span className="text-amber-400">Selyani</span> i7ab el 9ahwa ☕️☕️
          </h3>

          <div className="grid grid-cols-3 gap-2 mb-10">
             <div className="bg-indigo-900/40 p-3 rounded-2xl border border-indigo-800 flex flex-col items-center gap-2 hover:bg-indigo-900/60 transition-colors h-full justify-center">
                <i className="fa-solid fa-moon text-blue-400 text-xl animate-float"></i>
                <span className="text-[8px] md:text-[9px] text-indigo-300 font-mono uppercase leading-tight font-bold">Or9ed Or9ed etla3 i7ab el nouma howa</span>
             </div>
             <div className="bg-indigo-900/40 p-3 rounded-2xl border border-indigo-800 flex flex-col items-center gap-2 hover:bg-indigo-900/60 transition-colors h-full justify-center">
                <i className="fa-solid fa-mug-hot text-amber-400 text-xl animate-float" style={{ animationDelay: '1s' }}></i>
                <span className="text-[8px] md:text-[9px] text-indigo-300 font-mono uppercase leading-tight font-bold">Ocherb Ocherb el 9ahwa mama</span>
             </div>
             <div className="bg-indigo-900/40 p-3 rounded-2xl border border-indigo-800 flex flex-col items-center gap-2 hover:bg-indigo-900/60 transition-colors h-full justify-center">
                <i className="fa-solid fa-laptop-code text-green-400 text-xl animate-float" style={{ animationDelay: '2s' }}></i>
                <span className="text-[8px] md:text-[9px] text-indigo-300 font-mono uppercase leading-tight font-bold">Mala Selyani i7ab el coding</span>
             </div>
          </div>

          <button
            onClick={handleTrigger}
            disabled={isLoading}
            className={`w-full py-6 px-10 rounded-[2rem] text-white font-black text-xl md:text-2xl shadow-2xl transform transition-all active:scale-95 flex items-center justify-center gap-4 group/btn overflow-hidden relative ${
              isLoading 
                ? 'bg-indigo-800 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_auto] hover:bg-right hover:shadow-amber-500/40'
            }`}
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-terminal fa-spin"></i> RUNNING_SUDO...
              </>
            ) : (
              <>
                <i className="fa-solid fa-play group-hover/btn:translate-x-1 transition-transform"></i>
                <span className="text-center">Ya Selyaaani Inzel lena bech etchof el cadeau 🎁()</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayForm;