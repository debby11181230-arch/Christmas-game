
import React, { useMemo } from 'react';

const Snowfall: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${7 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: 0.4 + Math.random() * 0.6,
      size: `${Math.random() * 15 + 10}px`,
      emoji: Math.random() > 0.8 ? '❄️' : '⚪',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute select-none pointer-events-none"
          style={{
            left: flake.left,
            top: '-20px',
            fontSize: flake.size,
            opacity: flake.opacity,
            color: 'white',
            filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8))',
            animation: `snowfall ${flake.animationDuration} linear infinite`,
            animationDelay: flake.animationDelay,
          }}
        >
          {flake.emoji}
        </div>
      ))}
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
          }
          33% {
            transform: translateY(33vh) translateX(15px) rotate(120deg);
          }
          66% {
            transform: translateY(66vh) translateX(-15px) rotate(240deg);
          }
          100% {
            transform: translateY(110vh) translateX(0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;
