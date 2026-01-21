import React from 'react';
import { GeneratedMessage } from '../types';

interface ResultDisplayProps {
  message: GeneratedMessage;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ message }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
    alert('Tcopyel-lek el klem!');
  };

  // Using the raw GitHub URL to ensure the image displays correctly in the <img> tag
  const selyaniImgUrl = "https://raw.githubusercontent.com/RocketShip205/Abdoooo/main/WSNV2992.JPG";

  return (
    <div className="mb-12 last:mb-0 animate-in fade-in zoom-in-95 duration-700">
      <div className="relative group">
        
        <div className="flex flex-col md:flex-row shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-lg overflow-hidden border border-gray-200 bg-white">
          
          <div className="hidden md:flex md:w-1/4 card-texture border-r border-gray-200/50 items-center justify-center p-6 relative">
             <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none"></div>
             <div className="text-center">
                <i className="fa-solid fa-cake-candles text-5xl text-indigo-200 mb-4 block"></i>
                <div className="h-24 w-[1px] bg-indigo-100 mx-auto"></div>
             </div>
          </div>

          <div className="flex-1 card-texture p-8 md:p-12 relative min-h-[400px] flex flex-col">
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/5 to-transparent pointer-events-none hidden md:block"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="script-title text-indigo-600 text-3xl opacity-50">Kol 3am w enti 7ay b'5ir!</span>
              <div className="flex gap-2">
                <span className="text-[10px] text-gray-400 font-mono mt-2">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-full transition-all"
                  title="Copy Message"
                >
                  <i className="fa-solid fa-copy"></i>
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-4">
              <p className="handwriting text-gray-800 text-3xl md:text-4xl leading-tight whitespace-pre-wrap mb-10">
                {message.text}
              </p>

              {/* PHOTO INTEGRATION */}
              <div className="mt-6 flex justify-center pb-8">
                <div className="relative">
                  {/* Adhesive Tape Top */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-indigo-100/60 backdrop-blur-sm -rotate-2 border border-white/40 shadow-sm z-20 opacity-80 pointer-events-none"></div>
                  
                  {/* Polaroid Frame */}
                  <div className="bg-white p-4 pb-12 shadow-2xl border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-[280px]">
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 border border-gray-200">
                      <img 
                        src={selyaniImgUrl} 
                        alt="Selyani Birthday Boy" 
                        className="w-full h-full object-cover grayscale-[0.1] contrast-105"
                        onError={(e) => {
                          console.error("Image failed to load:", selyaniImgUrl);
                          // Fallback to a placeholder if the specific URL fails for any technical reason
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-indigo-500/5 mix-blend-multiply pointer-events-none"></div>
                    </div>
                    <div className="mt-4">
                      <p className="handwriting text-center text-indigo-900 text-2xl">Mala Selyani! 🎂✨</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {message.sources && message.sources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <i className="fa-brands fa-google"></i> Ba7th mou3ammaq:
                </p>
                <div className="flex flex-wrap gap-2">
                  {message.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-indigo-500 bg-white/80 border border-indigo-100 px-2 py-1 rounded hover:shadow-sm transition-all"
                    >
                      {source.title.length > 25 ? source.title.substring(0, 25) + '...' : source.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute -top-3 -right-3 text-pink-400 text-2xl">
          <i className="fa-solid fa-sparkles"></i>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;