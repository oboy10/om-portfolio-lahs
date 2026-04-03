'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const SOURCE_SITE = 'https://sites.google.com/mvla.net/omanandkhaunte/certifications/osha-10';

export default function Osha10Page() {
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
    <div ref={containerRef} className="relative min-h-screen bg-bold text-white overflow-x-hidden">
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
        <div className="max-w-[900px] mx-auto flex items-center justify-between gap-4">
          <Link
            href="/#certifications"
            className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            ← Back to portfolio
          </Link>
          <div className="text-xs font-bold px-4 py-2 border border-white/20 rounded-full shrink-0">CERTIFICATION</div>
        </div>
      </nav>

      <article className="relative pt-32 pb-24 px-8">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <header className="relative max-w-[900px] mx-auto mb-14 md:mb-16 space-y-4">
          <p className="text-sm font-bold text-cyan-400 tracking-wider">GENERAL INDUSTRY · SAFETY</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              OSHA 10
            </span>
          </h1>
        </header>

        <div className="relative max-w-[900px] mx-auto space-y-10 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
          <p className="text-xl md:text-2xl text-white font-normal">
            I have successfully completed the OSHA 10 hour certification for General Industry in my Freshman year!
          </p>

          <p>
            To get this certificate I explored multiple lessons and took tests in between that taught me many safety
            protocols for how to be safe in a shop environment. It taught me multiple basic safety procedures like fire
            hazards, ladder safety, and how to eliminate workplace hazards for myself and to prevent injury for anyone
            working with me as well. I did the entire course over a span of 10 hours minimum to later take a final test that
            I had to pass in order to get this certificate shown below.
          </p>

          <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/40">
            <Image
              src="/images/certifications/osha-10/certificate.jpg"
              alt="OSHA 10-hour General Industry certificate"
              width={1280}
              height={990}
              className="h-auto w-full object-contain"
              sizes="(max-width: 900px) 100vw, 900px"
              priority
            />
          </figure>

          <p className="text-sm text-gray-500">
            Original write-up:{' '}
            <a
              href={SOURCE_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              Google Sites — OSHA 10
            </a>
            .
          </p>
        </div>
      </article>

      <footer className="relative py-12 px-8 border-t border-white/10">
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-600 font-mono text-center sm:text-left">
            Made by Om Anand Khaunte — Freshman at Los Altos High School — Class of 2029
          </p>
          <Link
            href="/"
            className="text-sm font-bold text-gray-600 hover:text-white transition-colors"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            ← Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
