'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { notFound, useParams } from 'next/navigation';

const COMING_SOON = {
  'minibot-prototype': {
    title: 'Minibot Prototype',
    accent: 'from-fuchsia-400 via-pink-500 to-rose-500',
  },
  'obstacle-course-challenge': {
    title: 'Obstacle Course Challenge',
    accent: 'from-cyan-400 via-sky-500 to-blue-500',
  },
} as const;

type Slug = keyof typeof COMING_SOON;

export default function ComingSoonProjectPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const config = COMING_SOON[slug as Slug];
  if (!config) notFound();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-bold text-white overflow-hidden">
      <div
        className="fixed w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 3 : 1})`,
        }}
      />

      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 backdrop-blur-md bg-bold/50 border-b border-white/5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            ← Back to portfolio
          </Link>
          <span className="text-xs font-bold tracking-widest text-gray-500">ROBOTICS 1</span>
        </div>
      </nav>

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-28 pb-16">
        <div className="mx-auto max-w-2xl text-center space-y-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400/90">Robotics 1</p>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className={`bg-gradient-to-r ${config.accent} bg-clip-text text-transparent`}>{config.title}</span>
          </h1>

          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gray-500">Coming soon</p>

            <p className="text-balance text-xl font-light leading-relaxed md:text-2xl">
              <span className="inline-block animate-text-shimmer bg-gradient-to-r from-gray-500 via-white to-gray-500 bg-[length:200%_100%] bg-clip-text text-transparent">
                Check back in a bit!
              </span>
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 px-8">
        <p className="text-center text-sm text-gray-600 font-mono">
          Made by Om Anand Khaunte — Freshman at Los Altos High School — Class of 2029
        </p>
      </footer>

      <style jsx>{`
        @keyframes text-shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        :global(.animate-text-shimmer) {
          animation: text-shimmer 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
