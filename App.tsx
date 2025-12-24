
import React, { useState } from 'react';
import { INITIAL_TERMS } from './constants';
import ChristmasCard from './components/ChristmasCard';
import Translator from './components/Translator';
import ChristmasGames from './components/ChristmasGames';
import Snowfall from './components/Snowfall';

const App: React.FC = () => {
  const [view, setView] = useState<'translator' | 'games'>('translator');

  return (
    <div className="min-h-screen relative pb-20">
      <Snowfall />
      
      {/* Decorative Background Elements */}
      <div className="fixed -top-20 -left-20 w-64 h-64 bg-red-900/20 blur-[100px] rounded-full"></div>
      <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-blue-900/20 blur-[100px] rounded-full"></div>

      <header className="pt-20 pb-8 text-center relative z-10 px-4">
        <div className="inline-block animate-float">
            <span className="text-6xl mb-4 block">🎄</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-christmas text-white mb-4 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
          Natal <span className="text-red-500">Chino</span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
          Descobre a magia do Natal em Português e Chinês.
        </p>

        {/* View Switcher */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setView('translator')}
            className={`px-8 py-3 rounded-full transition-all font-bold ${view === 'translator' ? 'bg-red-600 text-white shadow-lg shadow-red-600/50' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Dicionário & Tradutor
          </button>
          <button 
            onClick={() => setView('games')}
            className={`px-8 py-3 rounded-full transition-all font-bold ${view === 'games' ? 'bg-red-600 text-white shadow-lg shadow-red-600/50' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Oficina de Jogos
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 space-y-24 relative z-10">
        {view === 'translator' ? (
          <>
            <section className="animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {INITIAL_TERMS.map((term, index) => (
                  <ChristmasCard key={term.portuguese} term={term} index={index} />
                ))}
              </div>
            </section>
            <section id="translate-section" className="py-12 animate-fade-in">
               <Translator />
            </section>
          </>
        ) : (
          <section className="animate-fade-in">
            <ChristmasGames />
          </section>
        )}

        {/* Footer/Cultural Note */}
        <footer className="text-center text-white/40 text-sm max-w-xl mx-auto pb-10">
          <p>
            O Natal na China é celebrado principalmente em áreas urbanas como uma festividade comercial e romântica, 
            muitas vezes marcada pela troca de maçãs (píng'ān guǒ), simbolizando paz.
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <span className="text-3xl opacity-50">🧧</span>
            <span className="text-3xl opacity-50">🏮</span>
            <span className="text-3xl opacity-50">✨</span>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default App;
