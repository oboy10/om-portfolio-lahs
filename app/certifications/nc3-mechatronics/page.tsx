'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const SOURCE_SITE = 'https://sites.google.com/mvla.net/omanandkhaunte/certifications/nc3-mechatronics';

const CERT_IMAGE = '/images/certifications/nc3-mechatronics/photo-06.png';

type Unit = { n: number; title: string; body: string | null; comingSoon?: boolean };

const units: Unit[] = [
  {
    n: 1,
    title: 'Safety',
    body:
      'In Unit 1, I learned about the essential hazards of mechatronics, including the risks of high-pressure air and hot compressor surfaces. I learnt about securing tubing connections and setting the regulator to 58 PSI to ensure the system operated within safe limits. This helped me understand how these strict safety protocols prevent accidents and keep the workspace functional when building complex automated stations.',
  },
  {
    n: 2,
    title: 'Fundamentals of Automation Technology',
    body:
      'In Unit 2, I learned about the importance of automation in manufacturing and how to understand complex mechatronic systems. I practiced identifying automated systems in the real world, like conveyors and automatic doors, and studied how technical plans and flow charts are used for programming. This taught me how increasing productivity through automation is essential for meeting the modern demand for high-quality products and services.',
  },
  {
    n: 3,
    title: 'Electro-pneumatic Systems',
    body:
      'In Unit 3, I learned to design and troubleshoot basic electro‑pneumatic circuits that integrate electrical control with pneumatic actuators. I wired control components, interpreted schematics, and validated safe, reliable motion sequences for automated stations.',
  },
  {
    n: 4,
    title: 'FluidSIM 6',
    body:
      'This unit focused on using FluidSIM as a virtual lab to design and test pneumatic and electro‑pneumatic circuits. I practiced drawing circuits with the correct symbols and then ran simulations to see how the system responded when switches changed state, which helped me check the logic, find mistakes, and better understand how each component affected the overall behavior.',
  },
  {
    n: 5,
    title: 'Stacking Magazine Station',
    body:
      'In Unit 5, I worked with an automated stacking magazine station that holds and feeds parts into a system. I set up the sensors and actuators so the station could detect parts, release them one at a time, and stack or unstack them correctly. I followed the process step by step to make sure everything worked as intended.',
  },
  {
    n: 6,
    title: 'Project 1: Container / Lid Control program',
    body:
      'This project showed how to plan a complete control sequence for a container‑and‑lid handling system. I worked through the logic for detecting a container, moving it into position, placing a lid, and confirming each step with sensors, then expressed the sequence as a control program that uses inputs, outputs, and basic logic instructions to run the process safely and in order.',
  },
  {
    n: 7,
    title: 'Fundamentals of Automation Programming',
    body:
      'In this unit, I learned the basics of automation programming using PLC‑style concepts. I studied how ladder‑logic instructions, timers, counters, and interlocks are used to respond to sensor inputs and control actuators, and I practiced building small example programs that match the textbook circuits, such as start/stop controls and simple timed sequences.',
  },
  {
    n: 8,
    title: 'Conveyor Station',
    body:
      'This unit covered how a conveyor station is used to move parts between different stages of an automated line. I learned how sensors along the conveyor detect parts, how the controller starts and stops the belt, and how the system can be used to queue, separate, or route workpieces as part of a larger setup with stacking magazine and container/lid stations.',
  },
  { n: 9, title: 'Project 2: Conveyor Station', body: null, comingSoon: true },
  { n: 10, title: 'Handling Station', body: null, comingSoon: true },
  { n: 11, title: 'Project 3: “Pick and Place” program', body: null, comingSoon: true },
  { n: 12, title: 'Challenge: Three Stations Combined', body: null, comingSoon: true },
];

export default function Nc3MechatronicsPage() {
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
        <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

        <header className="relative max-w-[900px] mx-auto mb-14 md:mb-16 space-y-4">
          <p className="text-sm font-bold text-cyan-400 tracking-wider">NC3 · MECHATRONICS · FLUIDSIM</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-violet-400">
              NC3 — Mechatronics
            </span>
          </h1>
        </header>

        <div className="relative max-w-[900px] mx-auto space-y-12 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
          <p className="text-xl md:text-2xl text-white font-normal">
            I&apos;m earning the NC3 Mechatronics certification in my Freshman year.
          </p>

          <p>
            To get this certificate I explored multiple units that taught me how to use FluidSIM. Through these courses, I
            learned how to create and simulate pneumatic and electrical circuits. I explored sketches, assemblies, and
            drawings in the software. I am currently working through all the required modules and hands-on activities to
            successfully complete the certification shown below.
          </p>

          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-2xl shadow-black/40">
            <Image
              src={CERT_IMAGE}
              alt="NC3 Mechatronics certification progress or completion"
              width={1280}
              height={984}
              className="h-auto w-full object-contain"
              sizes="(max-width: 900px) 100vw, 900px"
              priority
            />
          </figure>

          <div className="space-y-16 pt-8">
            {units.map((unit) => (
              <section key={unit.n} className="space-y-4 border-t border-white/10 pt-12 first:border-t-0 first:pt-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Unit {unit.n} — {unit.title}
                </h2>
                {unit.comingSoon ? (
                  <p className="text-xl font-semibold text-amber-400/90">Coming soon</p>
                ) : (
                  <p>{unit.body}</p>
                )}
              </section>
            ))}
          </div>

          <p className="text-sm text-gray-500 pt-8">
            Original write-up:{' '}
            <a
              href={SOURCE_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              Google Sites — NC3 Mechatronics
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
