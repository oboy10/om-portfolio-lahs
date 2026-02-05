'use client';

import { useEffect, useState, useRef } from 'react';

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
      title: 'Los Altos Hacks',
      category: 'HACKATHON',
      year: '2025 - Present',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Part of the Tech Team organizing Los Altos Hacks X'
    },
    {
      id: '02',
      title: 'LACT 0329',
      category: 'ROBOTICS',
      year: '2024 - Present',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Team Captain of Local Botball Robotics Team - Top 10 Worldwide 2x'
    },
    {
      id: '03',
      title: 'CENG',
      category: 'EDUCATIONAL',
      year: '2025 - Present',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: '120+ Hours teaching and leading the CENG free-of-cost Robotics Course'
    },
    {
      id: '04',
      title: 'FRC Team 114 - Eaglestrike',
      category: 'ROBOTICS',
      year: '2026',
      image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'Joining FRC Team 114 - Eaglestrike (High School FRC Robotics Team)'
    }
  ];

  const MagneticButton = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        {children}
      </button>
    );
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-bold text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 3 : 1})`
        }}
      />

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 backdrop-blur-md bg-bold/50 border-b border-white/5">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="text-2xl font-bold tracking-tighter">
              <span className="text-white">Om</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> K</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-bold tracking-wider">
              {['', '', ''].map((item, idx) => (
                <a
                  key={idx}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors relative group"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-sm font-mono text-gray-500">{currentTime}</div>
            <div className="text-xs font-bold px-4 py-2 border border-white/20 rounded-full">
              PORTFOLIO
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - FIXED: Added pt-24 for navbar spacing */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `perspective(500px) rotateX(60deg) translateY(${scrollProgress * 2}px)`,
            transformOrigin: 'top center'
          }} />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-float-delayed" />

        <div className="relative z-10 max-w-[1800px] w-full px-8 space-y-12">
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
              Creating hands-on learning experiences through robotics, hackathons, and community tech events. Leading the CENG Robotics & Engineering division, organizing Los Altos Hacks, and building programs that make real world impacts.
            </p>

            <MagneticButton className="group relative px-8 py-4 bg-white text-black font-black rounded-full text-sm overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                VIEW WORK
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </MagneticButton>
          </div>

          {/* Metrics Ticker */}
          <div className="grid grid-cols-3 gap-100 pt-12 border-t border-white/10">
            {[
              { value: 'Top 10 Global', label: 'Led Botball LACT 0329 to securing Top 10 in 2024 - 2025 GCER Conferences', suffix: '!' },
              { value: '5', label: 'YEARS IN ROBOTICS', suffix: '+' },
              { value: '100', label: 'DRIVEN FOR SUCCESS', suffix: '%' }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-5xl md:text-6xl font-bold tabular-nums">
                  {stat.value}<span className="text-cyan-400">{stat.suffix}</span>
                </div>
                <div className="text-xs font-bold text-gray-500 tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" className="relative py-32 px-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-24 flex items-end justify-between">
            <div>
              <div className="text-sm font-bold text-cyan-400 mb-4 tracking-wider">SELECTED PROJECTS</div>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
                FEATURED<br/>WORK
              </h2>
            </div>
            <MagneticButton className="hidden md:block px-6 py-3 border border-white/20 rounded-full font-bold text-sm">
              ALL PROJECTS →
            </MagneticButton>
          </div>

          <div className="space-y-0">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group border-t border-white/10 last:border-b hover:bg-white/5 transition-all duration-500"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
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

                {/* Project Preview - Appears on Hover */}
                <div className="overflow-hidden max-h-0 group-hover:max-h-96 transition-all duration-700 ease-out">
                  <div className="pb-12">
                    <div 
                      className="aspect-video rounded-2xl"
                      style={{ background: project.image }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Marquee */}
      <section className="relative py-24 overflow-hidden border-y border-white/10">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12">
              {['TYPESCRIPT', 'REACT', 'NODE.JS', 'PYTHON', 'GO', 'RUST', 'KUBERNETES', 'AWS', 'WEBGL', 'THREE.JS'].map((skill) => (
                <div key={skill} className="text-6xl font-bold text-white/10">
                  {skill}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-48 px-8">
        <div className="max-w-[1800px] mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[1.5]">
              Guess what?<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                I'm just getting started!
              </span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              Thank you for visiting my portfolio. I'm excited about the journey ahead and would love to connect with you to discuss potential internships or opportunities!
            </p>
          </div>


          {/* Contact Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-24 max-w-4xl mx-auto">
            {[
              { label: 'EMAIL', value: 'okhaunte@gmail.com' },
              { label: 'LOCATION', value: 'Los Altos, California' },
              { label: 'PHONE', value: ':)' },
              { label: 'SOCIAL', value: ':)' }
            ].map((item, i) => (
              <div key={i} className="space-y-2 text-left">
                <div className="text-xs font-bold text-gray-600 tracking-wider">{item.label}</div>
                <div className="text-sm font-bold hover:text-cyan-400 transition-colors cursor-pointer">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Footer */}
      <footer className="relative py-12 px-8 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-600 font-mono">
            2026 — PORTFOLIO V3.0 - Made with curiosity by Om ♥
          </div>
          <div className="flex gap-8">
            <a
              href="https://github.com/oboy10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-gray-600 hover:text-white transition-colors relative group"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              GITHUB
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </a>
            
            <a
              href="https://devpost.com/okhaunte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-gray-600 hover:text-white transition-colors relative group"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              DEVPOST
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </a>
            
            <a
              href="mailto:okhaunte@gmail.com"
              className="text-sm font-bold text-gray-600 hover:text-white transition-colors relative group"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              EMAIL
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
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
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, -50px) scale(1.1);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
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

        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 20s ease-in-out infinite;
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
