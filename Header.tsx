import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative py-12 px-4 text-center overflow-hidden flex flex-col items-center justify-center min-h-[350px]">
      {/* Background themed elements - Abderhaman's Passions */}
      <div className="absolute inset-0 pointer-events-none flex justify-around items-center opacity-10 select-none">
        <i className="fa-solid fa-code text-7xl animate-pulse text-indigo-300"></i>
        <i className="fa-solid fa-mug-hot text-7xl animate-bounce text-amber-300" style={{ animationDelay: '1s' }}></i>
        <i className="fa-solid fa-bed text-7xl animate-float text-blue-300" style={{ animationDelay: '2s' }}></i>
      </div>

      <div className="mb-4 relative z-10">
        <span className="inline-block px-5 py-1.5 rounded-full bg-indigo-950 text-indigo-100 text-[9px] font-mono tracking-[0.3em] uppercase shadow-lg border border-indigo-400/30">
          while(alive) {`{ celebrate(); }`}
        </span>
      </div>

      <div className="relative z-10 mb-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-3 leading-tight uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-amber-500 to-red-400 drop-shadow-md">
            Afaaaaaaaaaaaa ya <br className="hidden md:block" /> Abderhamaaaaaaan !!
          </span>
        </h1>
        
        <h2 className="text-xl md:text-3xl font-black tracking-widest text-indigo-900/40 script-title animate-pulse">
          Ya Selyaaaaani !!
        </h2>
      </div>
      
      <div className="flex items-center justify-center gap-4 mb-8 relative z-10">
        <div className="h-[2px] w-8 bg-indigo-500/20"></div>
        <div className="flex items-center gap-3 bg-indigo-950/90 px-6 py-2 rounded-2xl backdrop-blur-md border border-indigo-400/20 shadow-xl group">
          <p className="text-indigo-200 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
            A9WA 3IDMILADE FIK YA TOUNES 🇹🇳
          </p>
        </div>
        <div className="h-[2px] w-8 bg-indigo-500/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex justify-center">
        <div className="animate-crazy text-center px-4">
          <p className="animate-rainbow text-lg md:text-xl font-black italic tracking-tighter leading-tight break-words drop-shadow-2xl">
            Afaa Afaa Afaa Afaa Afaaaaaaaa <br className="hidden md:block" />
            AFina AFina AFina <br className="hidden md:block" />
            BiBi BiBi BiBi BiBi BiBi <br className="hidden md:block" />
            <span className="text-lg md:text-2xl block mt-3 font-mono uppercase tracking-widest leading-none">
              afaafafafafafinafinabibibibibibib
            </span>
            <span className="inline-block hover:scale-150 transition-transform cursor-pointer mt-3 text-2xl md:text-3xl">
              😝😝😝😝🤪🤪🤪🤪.
            </span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;