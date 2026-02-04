'use client';

import { useEffect, useState } from 'react';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
});

export default function ComingSoon() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-black ${workSans.className}`}>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        {/* Primary orb - deep purple to magenta */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[140px] opacity-30 animate-drift-1"
          style={{
            background: 'radial-gradient(circle, rgba(139, 0, 255, 0.6) 0%, rgba(255, 0, 128, 0.3) 40%, transparent 70%)',
            top: '20%',
            left: '10%',
          }}
        />
        
        {/* Secondary orb - electric blue to cyan */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full blur-[130px] opacity-25 animate-drift-2"
          style={{
            background: 'radial-gradient(circle, rgba(0, 102, 255, 0.5) 0%, rgba(0, 255, 255, 0.25) 40%, transparent 70%)',
            bottom: '10%',
            right: '15%',
          }}
        />
        
        {/* Accent orb - violet */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 animate-drift-3"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(126, 34, 206, 0.2) 40%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Mouse follower - subtle glow */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 transition-all duration-[1500ms] ease-out pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 255, 0.5) 0%, transparent 60%)',
            left: `${mousePosition.x - 200}px`,
            top: `${mousePosition.y - 200}px`,
          }}
        />
      </div>

      {/* Content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        {/* Minimal icon */}
        <div className="mb-16 animate-float-gentle">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-500 opacity-60 blur-md animate-pulse-glow" />
            <div className="absolute inset-0 rounded-full border border-white/20 backdrop-blur-sm" />
            <div className="absolute inset-3 rounded-full bg-black/40" />
          </div>
        </div>

        {/* Main text */}
        <h1 className="text-8xl md:text-9xl font-extralight mb-8 text-center tracking-wider animate-reveal">
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer">
            COMING SOON
          </span>
        </h1>

        {/* Mysterious subtitle */}
        <p className="text-lg md:text-xl text-white/40 text-center font-extralight tracking-[0.3em] animate-reveal-delay">
          SOMETHING IS BREWING
        </p>

        {/* Minimal animated line */}
        <div className="mt-16 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-line-pulse" />

      </div>

      <style jsx>{`
        @keyframes drift-1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(50px, -80px);
          }
          50% {
            transform: translate(-30px, -40px);
          }
          75% {
            transform: translate(40px, 60px);
          }
        }

        @keyframes drift-2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-60px, 50px);
          }
          50% {
            transform: translate(40px, -70px);
          }
          75% {
            transform: translate(-50px, -30px);
          }
        }

        @keyframes drift-3 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          33% {
            transform: translate(-50%, -50%) scale(1.1);
          }
          66% {
            transform: translate(-50%, -50%) scale(0.9);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes line-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scaleX(1);
          }
          50% {
            opacity: 0.6;
            transform: scaleX(1.5);
          }
        }

        .animate-drift-1 {
          animation: drift-1 30s ease-in-out infinite;
        }

        .animate-drift-2 {
          animation: drift-2 35s ease-in-out infinite;
        }

        .animate-drift-3 {
          animation: drift-3 25s ease-in-out infinite;
        }

        .animate-shimmer {
          background-size: 200% 200%;
          animation: shimmer 8s ease-in-out infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .animate-reveal {
          animation: reveal 1.2s ease-out forwards;
        }

        .animate-reveal-delay {
          opacity: 0;
          animation: reveal 1.2s ease-out 0.4s forwards;
        }

        .animate-line-pulse {
          animation: line-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
