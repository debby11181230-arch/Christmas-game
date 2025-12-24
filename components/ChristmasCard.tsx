
import React from 'react';
import { ChristmasTerm } from '../types';

interface ChristmasCardProps {
  term: ChristmasTerm;
  index: number;
}

const ChristmasCard: React.FC<ChristmasCardProps> = ({ term, index }) => {
  return (
    <div 
      className="glass p-6 rounded-2xl flex flex-col items-center text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 group relative overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {term.icon}
      </div>
      <h3 className="text-xl font-bold mb-1 text-red-200">{term.portuguese}</h3>
      <div className="flex flex-col items-center mb-3">
        <span className="text-3xl font-chinese font-bold text-yellow-400">{term.chinese}</span>
        <span className="text-sm text-blue-200 italic">{term.pinyin}</span>
      </div>
      <p className="text-xs text-white/70 text-center line-clamp-2">
        {term.description}
      </p>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-xl"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-xl"></div>
    </div>
  );
};

export default ChristmasCard;
