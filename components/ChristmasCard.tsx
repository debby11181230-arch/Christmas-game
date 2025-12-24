
import React from 'react';
import { ChristmasTerm } from '../types';

interface ChristmasCardProps {
  term: ChristmasTerm;
  index: number;
}

const ChristmasCard: React.FC<ChristmasCardProps> = ({ term, index }) => {
  return (
    <div 
      className="bg-white rounded-3xl p-5 flex flex-col items-center border-4 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300 animate-bounce-subtle">
        {term.icon}
      </div>
      <h3 className="text-lg font-bold text-red-500 mb-1">{term.portuguese}</h3>
      <div className="bg-blue-50 w-full rounded-2xl py-2 px-1 text-center border-2 border-dashed border-blue-200">
        <span className="text-2xl font-chinese text-blue-800 block">{term.chinese}</span>
        <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">{term.pinyin}</span>
      </div>
    </div>
  );
};

export default ChristmasCard;
