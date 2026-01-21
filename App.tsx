import React from 'react';
import Header from './components/Header';
import BirthdayForm from './components/BirthdayForm';
import ResultDisplay from './components/ResultDisplay';
import ChatBot from './components/ChatBot';
import Fireworks from './components/Fireworks';
import { generateAbderhamanMessage } from './services/geminiService';
import { GeneratedMessage, BirthdayData } from './types';

const App: React.FC = () => {
  const [results, setResults] = React.useState<GeneratedMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showFireworks, setShowFireworks] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const secondaryAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const playCelebrationChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playNote = (freq: number, startTime: number, duration: number, volume: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = audioCtx.currentTime;
      playNote(523.25, now, 1.5, 0.1); // C5
      playNote(659.25, now + 0.1, 1.5, 0.1); // E5
      playNote(783.99, now + 0.2, 1.5, 0.1); // G5
      playNote(1046.50, now + 0.3, 2.0, 0.15); // C6
    } catch (e) {
      console.warn("Audio chime failed to play", e);
    }
  };

  const playBirthdayMusic = () => {
    if (!audioRef.current) {
      // First audio: English version
      audioRef.current = new Audio('https://raw.githubusercontent.com/RocketShip205/Abdoooo/main/Happy_birthday_english(chosic.com).mp3');
      audioRef.current.volume = 0.6;
      audioRef.current.loop = false;

      // When the first audio finishes, play the second audio
      audioRef.current.onended = () => {
        if (!secondaryAudioRef.current) {
          // Second audio: Music box version
          secondaryAudioRef.current = new Audio('https://raw.githubusercontent.com/RocketShip205/Abdoooo/main/happy-birthday-music-box(chosic.com).mp3');
          secondaryAudioRef.current.volume = 0.6;
          secondaryAudioRef.current.loop = false;
        }
        secondaryAudioRef.current.currentTime = 0;
        secondaryAudioRef.current.play().catch(e => {
          console.warn("Secondary music playback failed", e);
        });
      };
    }
    
    // Reset and play first audio
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => {
      console.warn("Music playback failed - interaction might be required", e);
    });
  };

  const handleGenerate = async (data: BirthdayData) => {
    setIsLoading(true);
    setError(null);
    setShowFireworks(false);
    try {
      // 10-second dramatic delay
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      // Fix: generateAbderhamanMessage does not take any arguments in the current service
      const generated = await generateAbderhamanMessage();
      setResults(prev => [generated, ...prev]);
      
      playCelebrationChime();
      playBirthdayMusic();
      setShowFireworks(true);
      
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);

      setTimeout(() => {
        setShowFireworks(false);
      }, 15000); // Keep fireworks a bit longer to match music energy

    } catch (err) {
      setError("System Crash! El roast mte3ek dharbet el server.");
    } finally {
      setIsLoading(false);
    }
  };

  const hasResults = results.length > 0;

  return (
    <div className="mx-auto px-4 py-8 lg:py-16 pb-48 max-w-4xl transition-all duration-700">
      
      {showFireworks && <Fireworks />}

      <div className="flex flex-col gap-12">
        <div>
          <Header />
          <div className="mt-8">
            <BirthdayForm onSubmit={handleGenerate} isLoading={isLoading} />
            
            {error && (
              <div className="mt-6 p-4 bg-red-950 text-red-400 rounded-xl flex items-center gap-3 border border-red-900/50 font-mono text-xs">
                <i className="fa-solid fa-bug text-red-500"></i>
                {error}
              </div>
            )}

            {isLoading && (
              <div className="mt-6 p-8 bg-indigo-950 border-2 border-amber-500/50 text-white rounded-[2.5rem] shadow-[0_0_50px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-indigo-800 border-t-amber-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fa-solid fa-hourglass-half text-amber-500 animate-pulse text-2xl"></i>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black tracking-tight text-amber-400 mb-2 uppercase italic animate-bounce">
                    OSBER OSBER chwya ya Fara5 !!
                  </p>
                  <div className="flex justify-center gap-1">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}

            {!isLoading && (
              <div className="mt-12 flex justify-center items-center gap-12 sm:gap-16">
                <div className="text-5xl cursor-pointer hover:scale-150 hover:rotate-12 transition-all duration-300 active:scale-90 select-none grayscale hover:grayscale-0" title="Coffee Time">
                  ☕️
                </div>
                <div className="text-5xl cursor-pointer hover:scale-150 hover:-rotate-12 transition-all duration-300 active:scale-90 select-none grayscale hover:grayscale-0" title="Sleep Time">
                  💤
                </div>
                <div className="text-5xl cursor-pointer hover:scale-150 hover:rotate-12 transition-all duration-300 active:scale-90 select-none grayscale hover:grayscale-0" title="Code Time">
                  💻
                </div>
              </div>
            )}
          </div>
        </div>

        {hasResults && (
          <div className="mt-16 pt-16 border-t border-indigo-200/20">
            <div className="flex flex-col gap-8">
               <div className="flex items-center gap-4 text-gray-400 mb-6 px-4">
                  <div className="h-[1px] flex-1 bg-gray-200"></div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-2">
                    <i className="fa-solid fa-gift"></i>
                    EL HEDEYA MTE3EK ({results.length})
                  </span>
                  <div className="h-[1px] flex-1 bg-gray-200"></div>
               </div>
               
               <div className="space-y-24">
                 {results.map((item) => (
                   <ResultDisplay key={item.id} message={item} />
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>

      <ChatBot />

      <footer className="fixed bottom-0 left-0 w-full bg-indigo-950/90 backdrop-blur-md py-4 text-center border-t border-indigo-900 z-40">
        <p className="text-[10px] text-indigo-500 font-mono font-black uppercase tracking-[0.2em]">
          ABDERHAMAN_VERSION_15
        </p>
      </footer>
    </div>
  );
};

export default App;