// FIX: Add import for React to satisfy the TypeScript compiler.
import React, { useMemo } from 'react';

// React is available globally from the CDN script.

// FIX: Export ParticleBackground component to be importable in other modules.
export const ParticleBackground: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const isOrb = Math.random() > 0.3; // 70% are orbs, 30% are stardust
      const left = Math.random() * 100;
      const delay = Math.random() * -30; // Start at a random point in the animation

      if (isOrb) {
        // Larger, slower, swaying orbs
        const size = Math.random() * 3.5 + 1.5; // 1.5px to 5px
        const duration = Math.random() * 20 + 15; // 15s to 35s
        const swayX1 = (Math.random() - 0.5) * 50; // -25px to 25px
        const swayX2 = (Math.random() - 0.5) * 100; // -50px to 50px
        
        return {
          id: i,
          type: 'orb' as const,
          style: {
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            animation: `sway-ascend ${duration}s ${delay}s linear infinite`,
            '--sway-x1': `${swayX1}px`,
            '--sway-x2': `${swayX2}px`,
          } as React.CSSProperties,
        };
      } else {
        // Smaller, faster, twinkling stardust streaks
        const width = Math.random() * 0.7 + 0.5; // 0.5px to 1.2px
        const height = width * (Math.random() * 5 + 4); // 4x to 9x taller than wide
        const duration = Math.random() * 10 + 8; // 8s to 18s
        
        return {
          id: i,
          type: 'stardust' as const,
          style: {
            width: `${width}px`,
            height: `${height}px`,
            left: `${left}%`,
            animation: `twinkle-ascend ${duration}s ${delay}s linear infinite`,
          } as React.CSSProperties,
        };
      }
    });
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <style>{`
        @keyframes sway-ascend {
          0% {
            transform: translateY(100vh) translateX(0) scale(1);
            opacity: 0.9;
          }
          50% {
            transform: translateY(50vh) translateX(var(--sway-x1)) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) translateX(var(--sway-x2)) scale(1.5);
            opacity: 0;
          }
        }
        @keyframes twinkle-ascend {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh);
            opacity: 0;
          }
        }
      `}</style>
      {particles.map(p => {
        if (p.type === 'orb') {
          return (
            <div
              key={p.id}
              className="absolute bottom-0 bg-gradient-to-br from-brand-gold-light to-brand-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.7)]"
              style={p.style}
            />
          );
        }
        // Stardust
        return (
          <div
            key={p.id}
            className="absolute bottom-0 bg-brand-gold-light rounded-full"
            style={p.style}
          />
        );
      })}
    </div>
  );
};