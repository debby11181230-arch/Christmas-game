
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
      setError('Opa! O Pai Natal perdeu-se na tradução. Tenta de novo!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-6">
        <span className="text-5xl mb-2">🔍</span>
        <h2 className="text-3xl font-christmas text-red-600 text-center">O Teu Dicionário Mágico</h2>
        <p className="text-blue-400 font-medium">Escreve o que quiseres saber em Chinês!</p>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleTranslate()}
            placeholder="Ex: Árvore, Neve, Boneco..."
            className="w-full bg-white border-4 border-blue-100 rounded-3xl px-6 py-4 text-xl text-blue-800 placeholder-blue-200 focus:outline-none focus:border-blue-400 transition-all shadow-sm"
          />
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-200 text-white px-8 rounded-2xl transition-all font-bold shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Descobrir! ✨'
            )}
          </button>
        </div>

        {error && <p className="text-red-500 font-bold text-center bg-red-50 p-3 rounded-2xl border-2 border-red-100">{error}</p>}

        {result && (
          <div className="mt-8 p-8 bg-blue-500 rounded-[40px] text-white shadow-xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <span className="text-9xl absolute -bottom-10 -right-10">🎄</span>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left flex-1">
                <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-1">Tradução Mágica:</p>
                <h3 className="text-6xl font-chinese font-bold mb-2 drop-shadow-lg">{result.translatedText}</h3>
                <p className="text-yellow-300 text-xl font-bold tracking-widest italic">{result.pinyin}</p>
              </div>
              <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border-2 border-white/30 text-center max-w-[250px]">
                <p className="text-xs font-bold mb-2 uppercase border-b border-white/20 pb-2">💡 Sabias que?</p>
                <p className="text-xs leading-relaxed opacity-90">{result.culturalContext}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translator;
