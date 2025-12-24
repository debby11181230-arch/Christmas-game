
import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_TERMS } from '../constants';
import { ChristmasTerm, GameType } from '../types';

const ChristmasGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType>(null);

  return (
    <div className="glass p-8 rounded-3xl w-full max-w-4xl mx-auto shadow-2xl relative z-10 mt-12 overflow-hidden">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-4xl font-christmas text-white mb-2 text-center">Oficina de Jogos do Pai Natal</h2>
        <p className="text-white/60 text-center">Aprende chinês a brincar!</p>
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GameCard 
            title="Pares Mágicos" 
            icon="🃏" 
            desc="Encontra os pares entre Português e Chinês." 
            onClick={() => setActiveGame('memory')}
          />
          <GameCard 
            title="Corrida do Trenó" 
            icon="🛷" 
            desc="Responde rápido para o Pai Natal chegar a tempo!" 
            onClick={() => setActiveGame('quiz')}
          />
          <GameCard 
            title="O Segredo do Bolo Rei" 
            icon="🥮" 
            desc="Clica nas fatias para encontrar o brinde." 
            onClick={() => setActiveGame('bolorei')}
          />
        </div>
      ) : (
        <div>
          <button 
            onClick={() => setActiveGame(null)}
            className="mb-6 text-white/50 hover:text-white flex items-center gap-2 transition-colors"
          >
            ← Voltar para a Oficina
          </button>
          {activeGame === 'memory' && <MemoryGame />}
          {activeGame === 'quiz' && <QuizGame />}
          {activeGame === 'bolorei' && <BoloReiGame />}
        </div>
      )}
    </div>
  );
};

const GameCard = ({ title, icon, desc, onClick }: { title: string, icon: string, desc: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all hover:scale-105 text-center group"
  >
    <div className="text-5xl mb-4 group-hover:animate-bounce">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-white/60">{desc}</p>
  </button>
);

const MemoryGame = () => {
  const [cards, setCards] = useState<{ id: number, text: string, type: 'pt' | 'cn', pairId: number, flipped: boolean, solved: boolean }[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const gameTerms = INITIAL_TERMS.slice(0, 6);
    const deck = gameTerms.flatMap((term, i) => [
      { id: i * 2, text: term.portuguese, type: 'pt' as const, pairId: i, flipped: false, solved: false },
      { id: i * 2 + 1, text: term.chinese, type: 'cn' as const, pairId: i, flipped: false, solved: false }
    ]).sort(() => Math.random() - 0.5);
    setCards(deck);
  }, []);

  const handleFlip = (id: number) => {
    if (selected.length === 2 || cards.find(c => c.id === id)?.flipped) return;
    
    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newSelected = [...selected, id];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected.map(selId => newCards.find(c => c.id === selId)!);
      if (first.pairId === second.pairId) {
        setCards(prev => prev.map(c => c.pairId === first.pairId ? { ...c, solved: true } : c));
        setSelected([]);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newSelected.includes(c.id) ? { ...c, flipped: false } : c));
          setSelected([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 animate-fade-in">
      {cards.map(card => (
        <div 
          key={card.id}
          onClick={() => handleFlip(card.id)}
          className={`h-24 md:h-32 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-500 transform perspective-1000 ${
            card.flipped || card.solved ? 'bg-red-600 rotate-y-180' : 'bg-white/10'
          }`}
        >
          {card.flipped || card.solved ? (
            <span className={`text-white font-bold text-sm md:text-base px-2 text-center ${card.type === 'cn' ? 'font-chinese text-xl' : ''}`}>
              {card.text}
            </span>
          ) : (
            <span className="text-3xl opacity-30">🎁</span>
          )}
        </div>
      ))}
    </div>
  );
};

const QuizGame = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  
  const questions = useMemo(() => {
    return INITIAL_TERMS.sort(() => Math.random() - 0.5).slice(0, 5).map(term => {
      const options = [term.chinese];
      while (options.length < 3) {
        const rand = INITIAL_TERMS[Math.floor(Math.random() * INITIAL_TERMS.length)].chinese;
        if (!options.includes(rand)) options.push(rand);
      }
      return { 
        term: term.portuguese, 
        correct: term.chinese, 
        options: options.sort(() => Math.random() - 0.5),
        icon: term.icon
      };
    });
  }, []);

  const handleAnswer = (ans: string) => {
    if (ans === questions[current].correct) setScore(s => s + 1);
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) return (
    <div className="text-center animate-fade-in">
      <div className="text-6xl mb-4">🏆</div>
      <h3 className="text-2xl text-white font-bold">Incrível!</h3>
      <p className="text-white/60 mb-6">Ajudaste o Pai Natal a entregar {score} de {questions.length} presentes.</p>
      <button onClick={() => {setFinished(false); setCurrent(0); setScore(0);}} className="bg-red-600 text-white px-6 py-2 rounded-full">Tentar de novo</button>
    </div>
  );

  return (
    <div className="text-center animate-fade-in">
      <div className="relative h-4 bg-white/10 rounded-full mb-8 overflow-hidden">
        <div 
          className="absolute h-full bg-red-600 transition-all duration-500"
          style={{ width: `${(current / questions.length) * 100}%` }}
        ></div>
        <div className="absolute right-0 top-0 h-full flex items-center pr-2 text-xs text-white">🛷</div>
      </div>
      <div className="text-6xl mb-4">{questions[current].icon}</div>
      <h3 className="text-2xl text-white mb-8">Como se diz <span className="text-red-400 font-bold">"{questions[current].term}"</span>?</h3>
      <div className="grid grid-cols-1 gap-4">
        {questions[current].options.map(opt => (
          <button 
            key={opt}
            onClick={() => handleAnswer(opt)}
            className="bg-white/5 border border-white/20 p-4 rounded-xl text-white text-2xl font-chinese hover:bg-white/20 transition-all"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

const BoloReiGame = () => {
  const [slices, setSlices] = useState<{ id: number, content: ChristmasTerm | 'surprise', revealed: boolean }[]>([]);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const gameSlices = INITIAL_TERMS.sort(() => Math.random() - 0.5).slice(0, 7).map((t, i) => ({ id: i, content: t as ChristmasTerm | 'surprise', revealed: false }));
    gameSlices.push({ id: 8, content: 'surprise' as const, revealed: false });
    setSlices(gameSlices.sort(() => Math.random() - 0.5));
  }, []);

  const reveal = (id: number) => {
    setSlices(prev => prev.map(s => s.id === id ? { ...s, revealed: true } : s));
    const slice = slices.find(s => s.id === id);
    if (slice?.content === 'surprise') setFound(true);
  };

  return (
    <div className="text-center animate-fade-in">
      <h3 className="text-xl text-white mb-6">Onde está o brinde? Clica nas fatias! 🥧</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {slices.map(slice => (
          <div 
            key={slice.id}
            onClick={() => !slice.revealed && reveal(slice.id)}
            className={`aspect-square flex items-center justify-center rounded-full cursor-pointer transition-all ${
              slice.revealed ? 'bg-orange-900/40 border-2 border-yellow-600/50' : 'bg-orange-800 hover:bg-orange-700'
            }`}
          >
            {slice.revealed ? (
              slice.content === 'surprise' ? (
                <div className="animate-bounce text-3xl">🧧</div>
              ) : (
                <div className="flex flex-col items-center">
                   <span className="text-xs text-white/50">{slice.content.portuguese}</span>
                   <span className="text-lg font-chinese text-yellow-400">{slice.content.chinese}</span>
                </div>
              )
            ) : (
              <span className="text-white/20">🥧</span>
            )}
          </div>
        ))}
      </div>
      {found && (
        <div className="bg-yellow-600/20 p-4 rounded-xl border border-yellow-500/50">
          <p className="text-yellow-200">Encontraste o brinde! Ganhaste um Envelope Vermelho (Hóngbāo) da sorte! 🧧✨</p>
        </div>
      )}
    </div>
  );
};

export default ChristmasGames;
