
import React, { useMemo } from 'react';

const Snowfall: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${5 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: 0.1 + Math.random() * 0.5,
      size: `${2 + Math.random() * 4}px`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full animate-snowfall"
          style={{
            left: flake.left,
            top: '-10px',
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration} linear infinite`,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(100vh) translateX(20px);
          }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;
