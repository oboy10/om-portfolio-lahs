'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Robotics 1', href: '#work' },
  { label: 'Certifications', href: '#certifications' },
];

/** Bottom marquee — each tap goes to the matching section or certification page. */
const marqueeItems: { label: string; href: string }[] = [
  { label: 'ROBOTICS 1', href: '#work' },
  { label: 'LAHS', href: '#about' },
  { label: 'OSHA 10', href: '/certifications/osha-10' },
  { label: 'ONSHAPE', href: '/certifications/onshape' },
  { label: 'NC3 MECHATRONICS', href: '/certifications/nc3-mechatronics' },
  { label: 'DESIGN', href: '#work' },
  { label: 'ENGINEERING', href: '#work' },
  { label: 'CLASS OF 2029', href: '#about' },
];

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

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

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects = [
    {
      id: '01',
      title: 'Sprocket and Gearbox Design',
      category: 'ROBOTICS 1',
      year: '2025–2026',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Robotics 1 project — sprocket and gearbox design work.',
      href: '/robotics-1-projects/sprocket-and-gearbox-design',
    },
    {
      id: '02',
      title: 'Minibot Prototype',
      category: 'ROBOTICS 1',
      year: '2025–2026',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Robotics 1 project — minibot prototype build and iteration.',
      href: '/robotics-1-projects/minibot-prototype',
    },
    {
      id: '03',
      title: 'Obstacle Course Challenge',
      category: 'ROBOTICS 1',
      year: '2025–2026',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Robotics 1 project — obstacle course challenge.',
      href: '/robotics-1-projects/obstacle-course-challenge',
    },
  ];

  const certifications = [
    {
      id: 'C1',
      title: 'OSHA 10',
      category: 'SAFETY',
      year: '2025-26',
      image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'OSHA 10 certification.',
      href: '/certifications/osha-10',
    },
    {
      id: 'C2',
      title: 'Onshape',
      category: 'CAD',
      year: '2025-26',
      image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      description: 'Onshape CAD certification.',
      href: '/certifications/onshape',
    },
    {
      id: 'C3',
      title: 'NC3 — Mechatronics',
      category: 'NC3',
      year: '2025-26',
      image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      description: 'NC3 Mechatronics certification.',
      href: '/certifications/nc3-mechatronics',
    },
  ];

  const MagneticButton = ({
    children,
    className = '',
    onClick,
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {children}
      </button>
    );
  };

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-bold text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 3 : 1})`,
        }}
      />

      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 backdrop-blur-md bg-bold/50 border-b border-white/5">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            <a
              href="#home"
              className="text-2xl font-bold tracking-tighter shrink-0"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <span className="text-white">Om</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> K</span>
            </a>
            <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-bold tracking-wider">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors relative group"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-sm font-mono text-gray-500">{currentTime}</div>
            <div className="text-xs font-bold px-4 py-2 border border-white/20 rounded-full">PORTFOLIO</div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: '80px 80px',
              transform: `perspective(500px) rotateX(60deg) translateY(${scrollProgress * 2}px)`,
              transformOrigin: 'top center',
            }}
          />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-float-delayed" />

        <div className="relative z-10 max-w-[1800px] w-full px-8 space-y-12">
          <p className="text-sm font-bold text-cyan-400 tracking-[0.2em] uppercase animate-slide-up">
            Om&apos;s Design Portfolio
          </p>
          <div className="space-y-6">
            <div className="overflow-hidden">
              <h1 className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-[0.9] animate-slide-up">
                Om Anand
              </h1>
            </div>
            <div className="overflow-hidden" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-[0.9] animate-slide-up">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Khaunte
                </span>
              </h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed">
              This year, I have taken Robotics 1 to begin my time at LAHS. Check out my portfolio below to learn more
              about me and the projects I have done so far.
            </p>

            <MagneticButton
              className="group relative px-8 py-4 bg-white text-black font-black rounded-full text-sm overflow-hidden"
              onClick={() => scrollToId('work')}
            >
              <span className="relative z-10 flex items-center gap-2">
                VIEW PROJECTS
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 pt-12 border-t border-white/10">
            {[
              { value: 'LAHS', label: 'LOS ALTOS HIGH SCHOOL', suffix: '' },
              { value: 'Robotics 1', label: 'CURRENT COURSE', suffix: '' },
              { value: '2029', label: 'CLASS OF', suffix: '' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums leading-tight">
                  {stat.value}
                  <span className="text-cyan-400">{stat.suffix}</span>
                </div>
                <div className="text-xs font-bold text-gray-500 tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative overflow-hidden border-t border-white/10 py-28 px-8">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-1/4 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full bg-purple-500/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto grid max-w-[1800px] items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="space-y-5 md:col-span-4">
            <div className="text-sm font-bold tracking-[0.2em] text-cyan-400">ABOUT ME</div>
            <h2 className="text-5xl font-bold leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
              Hi there, I'm{ ' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Om
              </span>
            </h2>
            <p className="max-w-xs pt-1 text-sm font-semibold uppercase tracking-widest text-gray-500">
              Freshman · LAHS · Class of 2029
            </p>
          </div>

          <div className="relative md:col-span-8">
            <div className="absolute -left-2 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-cyan-400/60 via-purple-500/50 to-pink-500/40 md:block" />
            <div className="space-y-8 pl-0 md:pl-8">
              <p className="text-2xl font-light leading-snug text-white md:text-3xl">
                I&apos;m{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Om Anand Khaunte</span> — and I&apos;m excited to be
                in Los Altos High School. My time here is all about{' '}
                <span className="text-cyan-400/90">getting hands-on</span>: robotics in the shop, learning on the go, and
                ideas that turn into real builds.
              </p>
              <p className="text-xl font-light leading-relaxed text-gray-400">
                Robotics 1 is where I&apos;m learning how mechanisms come together — gears, shafts, prototypes, the whole
                pipeline from sketch to something that runs. On the side I&apos;m stacking certifications too: shop safety
                with OSHA 10, CAD in Onshape, and mechatronics through NC3 — because I want to work smart{' '}
                <span className="italic text-gray-300">and</span> build with confidence.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-sm md:px-8 md:py-6">
                <p className="text-lg font-medium leading-relaxed text-gray-300">
                  Dive into the sections below — robotics projects first, then certifications. That&apos;s where I get to
                  show what I&apos;ve been working on, and I&apos;m stoked to share it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Robotics 1 Projects */}
      <section id="work" className="relative py-32 px-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-24 flex items-end justify-between">
            <div>
              <div className="text-sm font-bold text-cyan-400 mb-4 tracking-wider">ROBOTICS 1 PROJECTS</div>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
                FEATURED
                <br />
                WORK
              </h2>
            </div>
            <MagneticButton
              className="hidden md:block px-6 py-3 border border-white/20 rounded-full font-bold text-sm"
              onClick={() => scrollToId('certifications')}
            >
              CERTIFICATIONS →
            </MagneticButton>
          </div>

          <div className="space-y-0">
            {projects.map((project) => {
              const row = (
                <>
                  <div className="py-12 grid grid-cols-12 gap-8 items-center">
                    <div className="col-span-1 text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
                      {project.id}
                    </div>

                    <div className="col-span-12 md:col-span-5 space-y-4">
                      <h3 className="text-4xl md:text-5xl font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 group-hover:text-gray-400 transition-colors duration-500">
                        {project.description}
                      </p>
                    </div>

                    <div className="col-span-6 md:col-span-3 space-y-2">
                      <div className="text-xs font-bold text-gray-600 tracking-wider">CATEGORY</div>
                      <div className="text-sm font-bold">{project.category}</div>
                    </div>

                    <div className="col-span-6 md:col-span-2 space-y-2">
                      <div className="text-xs font-bold text-gray-600 tracking-wider">YEAR</div>
                      <div className="text-sm font-bold">{project.year}</div>
                    </div>

                    <div className="col-span-12 md:col-span-1 flex justify-end">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:rotate-45">
                        →
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden max-h-0 group-hover:max-h-96 transition-all duration-700 ease-out">
                    <div className="pb-12">
                      <div className="aspect-video rounded-2xl" style={{ background: project.image }} />
                    </div>
                  </div>
                </>
              );

              return 'href' in project && project.href ? (
                <Link
                  key={project.id}
                  href={project.href}
                  className="group block border-t border-white/10 last:border-b hover:bg-white/5 transition-all duration-500"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {row}
                </Link>
              ) : (
                <div
                  key={project.id}
                  className="group border-t border-white/10 last:border-b hover:bg-white/5 transition-all duration-500"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {row}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="relative py-32 px-8 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-24">
            <div className="text-sm font-bold text-cyan-400 mb-4 tracking-wider">CERTIFICATIONS</div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
              OSHA · ONSHAPE · NC3
            </h2>
          </div>

          <div className="space-y-0">
            {certifications.map((c) => {
              const row = (
                <>
                  <div className="py-12 grid grid-cols-12 gap-8 items-center">
                    <div className="col-span-1 text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
                      {c.id}
                    </div>

                    <div className="col-span-12 md:col-span-5 space-y-4">
                      <h3 className="text-4xl md:text-5xl font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                        {c.title}
                      </h3>
                      <p className="text-gray-500 group-hover:text-gray-400 transition-colors duration-500">
                        {c.description}
                      </p>
                    </div>

                    <div className="col-span-6 md:col-span-3 space-y-2">
                      <div className="text-xs font-bold text-gray-600 tracking-wider">TYPE</div>
                      <div className="text-sm font-bold">{c.category}</div>
                    </div>

                    <div className="col-span-6 md:col-span-2 space-y-2">
                      <div className="text-xs font-bold text-gray-600 tracking-wider">YEAR</div>
                      <div className="text-sm font-bold">{c.year}</div>
                    </div>

                    <div className="col-span-12 md:col-span-1 flex justify-end">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:rotate-45">
                        →
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden max-h-0 group-hover:max-h-96 transition-all duration-700 ease-out">
                    <div className="pb-12">
                      <div className="aspect-video rounded-2xl" style={{ background: c.image }} />
                    </div>
                  </div>
                </>
              );

              return 'href' in c && c.href ? (
                <Link
                  key={c.id}
                  href={c.href}
                  className="group block border-t border-white/10 last:border-b hover:bg-white/5 transition-all duration-500"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {row}
                </Link>
              ) : (
                <div
                  key={c.id}
                  className="group border-t border-white/10 last:border-b hover:bg-white/5 transition-all duration-500"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {row}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Marquee */}
      <section className="marquee-container relative py-24 overflow-hidden border-y border-white/10">
        <div className="marquee-track flex w-max gap-12 md:gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 md:gap-16">
              {marqueeItems.map((item) => (
                <Link
                  key={`${i}-${item.label}`}
                  href={item.href}
                  className="group inline-block shrink-0 py-2 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bold"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <span
                    className={[
                      'inline-block text-5xl font-bold tracking-tighter sm:text-6xl',
                      'text-zinc-600 transition-colors duration-200',
                      'group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text',
                      'group-focus-visible:text-transparent group-focus-visible:bg-gradient-to-r group-focus-visible:from-cyan-400 group-focus-visible:to-purple-400 group-focus-visible:bg-clip-text',
                    ].join(' ')}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-48 px-8">
        <div className="max-w-[1800px] mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[1.5]">
              Thanks for visiting
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                my portfolio
              </span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              Get in touch if you&apos;d like to connect about school, robotics, or design—I&apos;d love to hear from you.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-10 pt-24 sm:flex-row sm:gap-16 md:gap-24">
            {[
              { label: 'SCHOOL EMAIL', value: '100034792@mvla.net', href: 'mailto:100034792@mvla.net' },
              { label: 'PERSONAL EMAIL', value: 'okhaunte@gmail.com', href: 'mailto:okhaunte@gmail.com' },
            ].map((item, i) => (
              <div key={i} className="space-y-2 text-center">
                <div className="text-xs font-bold text-gray-600 tracking-wider">{item.label}</div>
                <a
                  href={item.href}
                  className="text-sm font-bold hover:text-cyan-400 transition-colors block"
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-8 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto flex flex-col items-center justify-center gap-8 text-center">
          <div className="text-sm text-gray-600 font-mono max-w-xl">
            Made by Om Anand Khaunte — Freshman at Los Altos High School — Class of 2029
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
            <a
              href="mailto:100034792@mvla.net"
              className="text-sm font-bold text-gray-600 hover:text-white transition-colors relative group"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              SCHOOL EMAIL
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="mailto:okhaunte@gmail.com"
              className="text-sm font-bold text-gray-600 hover:text-white transition-colors relative group"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              PERSONAL EMAIL
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </div>
      </footer>

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

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, -50px) scale(1.1);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-50px, 50px) scale(1.1);
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          animation: marquee 40s linear infinite;
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 20s ease-in-out infinite;
        }

      `}</style>
    </div>
  );
}
