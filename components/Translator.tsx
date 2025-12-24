
import React, { useState } from 'react';
import { translateWithGemini } from '../services/geminiService';
import { TranslationResult } from '../types';

const Translator: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    try {
      const translation = await translateWithGemini(input);
      setResult(translation);
    } catch (err) {
      setError('Houve um erro na tradução natalícia. Tente novamente!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-8 rounded-3xl w-full max-w-2xl mx-auto shadow-2xl relative z-10">
      <h2 className="text-3xl font-christmas text-white mb-6 text-center">Tradução Mágica</h2>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleTranslate()}
            placeholder="Digite outro termo natalício..."
            className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-red-500/50 transition-colors"
          />
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 rounded-lg transition-colors font-bold flex items-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Traduzir'
            )}
          </button>
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {result && (
          <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="text-center md:text-left">
                <p className="text-white/60 text-sm mb-1">Em Chinês:</p>
                <h3 className="text-4xl font-chinese font-bold text-yellow-400">{result.translatedText}</h3>
                <p className="text-blue-200 italic">{result.pinyin}</p>
              </div>
              <div className="mt-4 md:mt-0 text-5xl">🧧</div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-white/80 leading-relaxed text-sm">
                <span className="text-red-300 font-bold">Contexto Cultural:</span> {result.culturalContext}
              </p>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Translator;
