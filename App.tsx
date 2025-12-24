
import React, { useState } from 'react';
import { INITIAL_TERMS } from './constants';
import ChristmasCard from './components/ChristmasCard';
import Translator from './components/Translator';
import ChristmasGames from './components/ChristmasGames';
import Snowfall from './components/Snowfall';

const App: React.FC = () => {
  const [view, setView] = useState<'translator' | 'games'>('translator');

  return (
    <div className="min-h-screen relative pb-24 overflow-x-hidden">
      <Snowfall />
      
      {/* Cuteness Overload Shapes */}
      <div className="fixed top-0 left-0 w-full h-32 bg-white/30 backdrop-blur-sm border-b-4 border-white z-40 flex items-center justify-between px-10 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🎒</span>
          <h1 className="text-3xl font-christmas font-bold text-red-600 hidden sm:block">
            Natal Mágico <span className="text-blue-500">Chinês</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setView('translator')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${view === 'translator' ? 'bg-red-500 text-white shadow-lg' : 'bg-red-50 text-red-400 hover:bg-red-100'}`}
          >
            📖 Cartões
          </button>
          <button 
            onClick={() => setView('games')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${view === 'games' ? 'bg-blue-500 text-white shadow-lg' : 'bg-blue-50 text-blue-400 hover:bg-blue-100'}`}
          >
            🎮 Jogos
          </button>
        </div>
      </div>

      <header className="pt-48 pb-12 text-center relative z-10 px-4">
        <div className="inline-block animate-bounce mb-4">
            <span className="text-8xl">🎅</span>
        </div>
        <h2 className="text-5xl font-christmas text-red-600 mb-2">Benvindos à Escola do Pai Natal!</h2>
        <p className="text-lg text-blue-600/70 font-medium max-w-xl mx-auto">
          Clica nos cartões para ouvir (em breve!) ou joga para seres um mestre das palavras!
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        {view === 'translator' ? (
          <div className="space-y-16">
            <section className="animate-fade-in grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {INITIAL_TERMS.map((term, index) => (
                <ChristmasCard key={term.portuguese} term={term} index={index} />
              ))}
            </section>
            
            <section className="bg-white/40 border-4 border-white rounded-[40px] p-8 shadow-inner animate-fade-in">
               <Translator />
            </section>
          </div>
        ) : (
          <section className="animate-fade-in">
            <ChristmasGames />
          </section>
        )}
      </main>

      <footer className="mt-20 text-center py-10 relative z-10 bg-white/20 border-t-4 border-white">
        <p className="text-blue-500 font-bold mb-4">Feito com 🍭 e ❄️ para todos os alunos!</p>
        <div className="flex justify-center gap-8 text-4xl grayscale hover:grayscale-0 transition-all cursor-default">
          <span>🧧</span>
          <span>🍎</span>
          <span>🎐</span>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
