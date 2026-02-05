'use client';

import { useEffect, useState } from 'react';

export default function ComingSoon() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'top center'
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-float-slow" />

      {/* Time Display - Top Right */}
      <div className="fixed top-8 right-8 text-sm font-mono text-gray-500 z-40">
        {currentTime}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 px-8 max-w-5xl">
        {/* Coming Soon Text */}
        <div className="space-y-4">
          <div className="overflow-hidden pb-6">
            <h1 className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold tracking-tighter leading-[0.9] animate-slide-up">
              Coming
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold tracking-tighter leading-[0.9] animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient">
                Soon
              </span>
            </h1>
          </div>
        </div>

        {/* Name */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide">
            Om Anand Khaunte
          </p>
        </div>

        {/* Tagline */}
        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Building something great. Stay tuned.
          </p>
        </div>

        {/* Loading Bar */}
        <div className="animate-fade-in pt-8" style={{ animationDelay: '0.7s' }}>
          <div className="max-w-md mx-auto">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-loading-bar" />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="animate-fade-in pt-4" style={{ animationDelay: '0.9s' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            IN DEVELOPMENT
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="fixed bottom-8 left-0 right-0 z-40 animate-fade-in" style={{ animationDelay: '1.1s' }}>
        <div className="flex justify-center gap-8">
          <a
            href="https://github.com/oboy10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-gray-500 hover:text-white transition-colors duration-300 relative group"
          >
            GITHUB
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
          </a>
          
          <a
            href="https://devpost.com/okhaunte"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-gray-500 hover:text-white transition-colors duration-300 relative group"
          >
            DEVPOST
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
          </a>
          
          <a
            href="mailto:okhaunte@gmail.com"
            className="text-sm font-bold text-gray-500 hover:text-white transition-colors duration-300 relative group"
          >
            EMAIL
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 40px) scale(1.1);
          }
          66% {
            transform: translate(30px, -20px) scale(0.9);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 30px) scale(1.08);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
