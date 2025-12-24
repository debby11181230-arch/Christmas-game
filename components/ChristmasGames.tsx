
import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_TERMS } from '../constants';
import { ChristmasTerm, GameType } from '../types';

const ChristmasGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType>(null);

  return (
    <div className="bg-white/80 border-4 border-white rounded-[40px] p-8 w-full max-w-4xl mx-auto shadow-xl relative z-10 mt-6 overflow-hidden">
      <div className="flex flex-col items-center mb-10">
        <div className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 uppercase tracking-widest kawaii-shadow">
          Área de Diversão
        </div>
        <h2 className="text-5xl font-christmas text-red-600 mb-2 text-center drop-shadow-sm">Festa dos Jogos</h2>
        <p className="text-blue-500 font-medium text-center">Vamos jogar e aprender palavras mágicas!</p>
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GameButton 
            title="Pares Mágicos" 
            icon="🎴" 
            color="bg-pink-400"
            desc="Encontra os pares certos!" 
            onClick={() => setActiveGame('memory')}
          />
          <GameButton 
            title="Salva o Natal" 
            icon="🚀" 
            color="bg-blue-400"
            desc="Responde rápido ao quiz!" 
            onClick={() => setActiveGame('quiz')}
          />
          <GameButton 
            title="Tesouro do Bolo" 
            icon="💎" 
            color="bg-orange-400"
            desc="Onde está o brinde?" 
            onClick={() => setActiveGame('bolorei')}
          />
        </div>
      ) : (
        <div className="animate-fade-in">
          <button 
            onClick={() => setActiveGame(null)}
            className="mb-8 bg-blue-100 hover:bg-blue-200 text-blue-600 px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            ⬅️ Voltar ao Menu
          </button>
          {activeGame === 'memory' && <MemoryGame />}
          {activeGame === 'quiz' && <QuizGame />}
          {activeGame === 'bolorei' && <BoloReiGame />}
        </div>
      )}
    </div>
  );
};

const GameButton = ({ title, icon, color, desc, onClick }: { title: string, icon: string, color: string, desc: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`${color} p-8 rounded-[32px] hover:scale-105 transition-all text-white text-center group shadow-lg relative overflow-hidden`}
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-8 -mt-8"></div>
    <div className="text-6xl mb-4 group-hover:rotate-12 transition-transform">{icon}</div>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-white/80 text-sm font-medium">{desc}</p>
  </button>
);

const MemoryGame = () => {
  const [cards, setCards] = useState<{ id: number, text: string, type: 'pt' | 'cn', pairId: number, flipped: boolean, solved: boolean }[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const gameTerms = [...INITIAL_TERMS].sort(() => Math.random() - 0.5).slice(0, 4);
    const deck = gameTerms.flatMap((term, i) => [
      { id: i * 2, text: term.portuguese, type: 'pt' as const, pairId: i, flipped: false, solved: false },
      { id: i * 2 + 1, text: term.chinese, type: 'cn' as const, pairId: i, flipped: false, solved: false }
    ]).sort(() => Math.random() - 0.5);
    setCards(deck);
  }, []);

  const handleFlip = (id: number) => {
    if (selected.length === 2 || cards.find(c => c.id === id)?.flipped || cards.find(c => c.id === id)?.solved) return;
    
    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newSelected = [...selected, id];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected.map(selId => newCards.find(c => c.id === selId)!);
      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.pairId === first.pairId ? { ...c, solved: true, flipped: true } : c));
          setSelected([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newSelected.includes(c.id) ? { ...c, flipped: false } : c));
          setSelected([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map(card => (
        <div 
          key={card.id}
          onClick={() => handleFlip(card.id)}
          className={`h-32 flex items-center justify-center rounded-3xl cursor-pointer transition-all duration-500 shadow-md ${
            card.flipped || card.solved 
              ? (card.solved ? 'bg-green-400 scale-95 opacity-80' : 'bg-red-400') 
              : 'bg-white hover:bg-red-50 border-4 border-red-100'
          }`}
        >
          {card.flipped || card.solved ? (
            <span className={`text-white font-bold text-center px-2 ${card.type === 'cn' ? 'font-chinese text-2xl' : 'text-lg'}`}>
              {card.text}
            </span>
          ) : (
            <span className="text-4xl">🍬</span>
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
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  
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
    if (feedback) return;
    const isCorrect = ans === questions[current].correct;
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  if (finished) return (
    <div className="text-center bg-blue-50 p-10 rounded-[40px] border-4 border-white shadow-inner">
      <div className="text-8xl mb-4 animate-bounce">🎊</div>
      <h3 className="text-3xl text-blue-600 font-bold mb-2">Parabéns!</h3>
      <p className="text-blue-400 font-medium mb-8">Acertaste {score} de {questions.length} palavras!</p>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-red-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-red-600 transition-colors text-xl"
      >
        Jogar de Novo 🎄
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full font-bold">Pergunta {current + 1}/{questions.length}</span>
        <span className="text-2xl">⭐ {score}</span>
      </div>
      <div className={`bg-white p-10 rounded-[40px] text-center border-4 ${feedback === 'correct' ? 'border-green-400' : feedback === 'wrong' ? 'border-red-400' : 'border-blue-100'} transition-colors shadow-lg`}>
        <div className="text-7xl mb-6 animate-bounce-subtle">{questions[current].icon}</div>
        <p className="text-xl text-gray-500 mb-2">Como dizemos...</p>
        <h3 className="text-4xl font-bold text-blue-600 mb-8">{questions[current].term}?</h3>
        <div className="grid grid-cols-1 gap-4">
          {questions[current].options.map(opt => (
            <button 
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={!!feedback}
              className={`py-5 rounded-3xl text-3xl font-chinese transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
                feedback && opt === questions[current].correct ? 'bg-green-400 border-green-600 text-white' : 
                feedback && opt !== questions[current].correct ? 'bg-gray-100 border-gray-200 text-gray-300' :
                'bg-blue-500 border-blue-700 text-white hover:bg-blue-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BoloReiGame = () => {
  const [slices, setSlices] = useState<{ id: number, content: ChristmasTerm | 'surprise', revealed: boolean }[]>([]);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const gameTerms = [...INITIAL_TERMS].sort(() => Math.random() - 0.5).slice(0, 5);
    const gameSlices = gameTerms.map((t, i) => ({ id: i, content: t as ChristmasTerm | 'surprise', revealed: false }));
    gameSlices.push({ id: 99, content: 'surprise' as const, revealed: false });
    setSlices(gameSlices.sort(() => Math.random() - 0.5));
  }, []);

  const reveal = (id: number) => {
    if (found) return;
    setSlices(prev => prev.map(s => s.id === id ? { ...s, revealed: true } : s));
    const slice = slices.find(s => s.id === id);
    if (slice?.content === 'surprise') setFound(true);
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl text-orange-600 font-bold mb-8">Onde está o Envelope Vermelho (Hóngbāo)? 🧧</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-10">
        {slices.map(slice => (
          <div 
            key={slice.id}
            onClick={() => reveal(slice.id)}
            className={`aspect-square flex items-center justify-center rounded-3xl cursor-pointer transition-all border-4 ${
              slice.revealed 
                ? 'bg-yellow-50 border-yellow-200' 
                : 'bg-orange-100 hover:bg-orange-200 border-white animate-bounce-subtle'
            }`}
          >
            {slice.revealed ? (
              slice.content === 'surprise' ? (
                <div className="text-4xl animate-bounce">🧧</div>
              ) : (
                <div className="flex flex-col items-center">
                   <span className="text-[10px] text-gray-400 font-bold uppercase">{slice.content.portuguese}</span>
                   <span className="text-2xl font-chinese text-orange-500">{slice.content.chinese}</span>
                </div>
              )
            ) : (
              <span className="text-4xl opacity-50">🍰</span>
            )}
          </div>
        ))}
      </div>
      {found && (
        <div className="bg-red-500 text-white p-8 rounded-[40px] animate-fade-in shadow-xl inline-block">
          <h4 className="text-3xl font-bold mb-2">YAY! ENCONTRASTE! 🧧✨</h4>
          <p className="font-medium">O envelope vermelho traz muita sorte no Ano Novo!</p>
        </div>
      )}
    </div>
  );
};

export default ChristmasGames;
