'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const SOURCE_SITE =
  'https://sites.google.com/mvla.net/omanandkhaunte/robotics-1-projects/sprocket-and-gearbox-design';

const INSTRUCTOR_DRAWING =
  'https://drive.google.com/file/d/13UJ9CCIjgt1-Nfr7z312ctf7IlIyl5-G/view';

const IMG = {
  p01: '/images/sprocket-gearbox/photo-01.png',
  p02: '/images/sprocket-gearbox/photo-02.jpg',
  p03: '/images/sprocket-gearbox/photo-03.png',
  p04: '/images/sprocket-gearbox/photo-04.png',
  p05: '/images/sprocket-gearbox/photo-05.png',
  p06: '/images/sprocket-gearbox/photo-06.png',
  p07: '/images/sprocket-gearbox/photo-07.png',
  p08: '/images/sprocket-gearbox/photo-08.png',
  p09: '/images/sprocket-gearbox/photo-09.png',
  p10: '/images/sprocket-gearbox/photo-10.png',
  p11: '/images/sprocket-gearbox/photo-11.jpg',
} as const;

function CrissCross({
  imageOnLeft,
  src,
  alt,
  children,
  onHover,
}: {
  imageOnLeft: boolean;
  src: string;
  alt: string;
  children: React.ReactNode;
  onHover: (h: boolean) => void;
}) {
  return (
    <section className="grid md:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
      <div className={imageOnLeft ? 'md:order-1' : 'md:order-2'}>
        <figure
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        >
          <Image src={src} alt={alt} fill className="object-contain p-3 md:p-4" sizes="(max-width: 768px) 100vw, 50vw" />
        </figure>
      </div>
      <div className={`space-y-5 text-lg md:text-xl text-gray-400 font-light leading-relaxed ${imageOnLeft ? 'md:order-2' : 'md:order-1'}`}>
        {children}
      </div>
    </section>
  );
}

export default function SprocketAndGearboxPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const hover = (h: boolean) => setCursorVariant(h ? 'hover' : 'default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
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
        <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            ← Back to portfolio
          </Link>
          <div className="text-xs font-bold px-4 py-2 border border-white/20 rounded-full shrink-0">ROBOTICS 1</div>
        </div>
      </nav>

      <article className="relative pt-32 pb-24 px-6 sm:px-8">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

        <header className="relative max-w-[1100px] mx-auto mb-14 md:mb-20 space-y-6">
          <p className="text-sm font-bold text-cyan-400 tracking-wider">ROBOTICS 1 PROJECT</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
            Sprocket and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Gearbox Design
            </span>
          </h1>
        </header>

        <div className="relative max-w-[1100px] mx-auto space-y-20 md:space-y-28">
          {/* Top 2×2 grid — matches Google Sites embedded image block */}
          <div
            className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5"
            onMouseEnter={() => hover(true)}
            onMouseLeave={() => hover(false)}
          >
            {[IMG.p01, IMG.p02, IMG.p03, IMG.p04].map((src, i) => (
              <figure
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-zinc-900/30"
              >
                <Image
                  src={src}
                  alt={`Sprocket and gearbox project photo ${i + 1}`}
                  fill
                  className="object-cover sm:object-contain p-1 sm:p-2"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </figure>
            ))}
          </div>

          {/* Row: text | image (overview art) */}
          <CrissCross imageOnLeft={false} src={IMG.p04} alt="Project CAD overview" onHover={hover}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Design Statement</h2>
              <p>
                In Robotics 1, we designed and built our own driving mechanism using REV motors and parts to create a
                final product featuring a powered gearbox that spins the wheel via the gear and chains. Here is a project
                overview I have created to display my work and progress through the weeks.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Things to Note…</h2>
              <p>
                All students were given the same-sized wood board, REV Gearbox Kit, and 1/2-inch hex shafts as materials to
                create their own sprocket and shaft designs for the project. This meant that the only change between the
                projects would be the measurements and possibly gear ratios, but other than that, everyone was working with
                the same resources and tools.
              </p>
            </div>
          </CrissCross>

          {/* Row: image | text (gearbox — “shown on the left” on the original site) */}
          <CrissCross imageOnLeft src={IMG.p01} alt="Gearbox ratio and motor build" onHover={hover}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Gearbox Ratio &amp; Motor</h2>
              <p>
                We started off with given instructions on how to build the motor gearbox with certain gear ratios that were
                provided to us with the REV kit. This meant that everyone in the class had a similar gearbox mechanism shown
                on the left that allowed a hex shaft to slip through and get spun by the power of the motor and gears
                combined. This was the first building block to the entire project, as it demonstrated the power and moving
                parts that would later be used in the final product.
              </p>
            </div>
          </CrissCross>

          {/* Row: text | image (drilling) */}
          <CrissCross imageOnLeft={false} src={IMG.p02} alt="Drilling the drivebase for the gearbox" onHover={hover}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                Drilling out the hole for the gearbox
              </h2>
              <p>
                Once we got the wooden boards for the drivebase, we drilled out a hole using the Drill Press in order to
                attach both the gearbox module and prepare for the bearing that will be attached later in the project
                timeline. This was the first use case of the Drill Press and was the first time we got to physically handle
                machinery in the Shop in Robotics 1. This meant that the first cut out may not have been perfect due to a
                lack of practice, but I believe we did a pretty good job as fresh students in the shop.
              </p>
            </div>
          </CrissCross>

          {/* Shaft / Onshape — text then 2×2 criss-cross of CAD photos */}
          <section className="space-y-10">
            <div className="space-y-6 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Shaft Concept Design (Sketch &amp; Onshape)
              </h2>
              <p>
                When we first began working with the 1/2 inch hex shafts, we were first given a technical drawing that had
                pre-recorded measurements and increments that were made by our instructor that didn&apos;t need to be
                changed or altered using Onshape&apos;s 3D modeling. Once we got into making our own test boards, each one of
                us needed to change the design of the shaft to fit our individual gearbox boards. This meant we got to
                utilize Onshape CAD and sketch out a design of our shafts using the online software. To the left are some
                pictures of the designs and prototypes we made during the design phase of the Sprocket and Gearbox Project.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5"
              onMouseEnter={() => hover(true)}
              onMouseLeave={() => hover(false)}
            >
              {[IMG.p05, IMG.p06, IMG.p07, IMG.p08].map((src, i) => (
                <figure
                  key={`shaft-${src}`}
                  className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-zinc-900/30"
                >
                  <Image
                    src={src}
                    alt={`Onshape sketch or prototype ${i + 1}`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </figure>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
              <figure
                className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40"
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
              >
                <Image src={IMG.p03} alt="Shaft design and modeling detail" fill className="object-contain p-4" sizes="50vw" />
              </figure>
              <div className="space-y-6 text-lg md:text-xl text-gray-400 font-light leading-relaxed md:pt-4">
                <p>
                  Throughout the process, the modeling journey was decently smooth, other than a small prototyping error I made
                  in the first design, in which I made the hex shaft too large, therefore making the diameter and overall
                  scaling incorrect to what would be used on my test board in real life. This led me to resketch my design and
                  3D model to make sure it was 1:1 with the 1/2 inch hex shafts, which meant the issue was quickly resolved in
                  the matter of one class period.
                </p>
                <p className="text-sm text-gray-500">
                  Original page with all figures:{' '}
                  <a
                    href={SOURCE_SITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    Google Sites
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Technical drawings — alternating pair */}
          <section className="space-y-10">
            <div className="space-y-6 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Creating the Technical Drawing</h2>
              <p>
                Once the 3D models were complete, I was able to work on the technical drawing that would later be used to
                machine and get hands-on on curating my design and bringing it to life with the tools in the shop. This
                still uses the same resources mentioned earlier of the 1/2 inch hex shaft, so I made the drawings to scale to
                simplify the process as needed. Both of the drawings feature immense detail, which makes the machining process
                much smoother and easier to work with in the shop. Furthermore, they include some personal measurement notes
                that I felt were necessary to understand the design better, so that I am not the only one who understands
                the design. These were both made in the same Onshape file as their corresponding 3D model, which made the
                part overlays and importing extremely simple and efficient to do. In the end, I was left with clear shaft
                drawings that anyone could use to machine and create my design of the sprocket shafts without me needing to
                explain the design each time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <figure
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white"
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
              >
                <Image
                  src={IMG.p09}
                  alt="Technical drawing — shaft 1"
                  fill
                  className="object-contain p-2"
                  sizes="50vw"
                />
              </figure>
              <figure
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white md:translate-y-8"
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
              >
                <Image
                  src={IMG.p10}
                  alt="Technical drawing — shaft 2"
                  fill
                  className="object-contain p-2"
                  sizes="50vw"
                />
              </figure>
            </div>
          </section>

          {/* Final shaft — criss-cross */}
          <CrissCross imageOnLeft={false} src={IMG.p11} alt="Final shaft work in the shop" onHover={hover}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Final Shaft Design</h2>
              <p>
                We were given a clear technical drawing that was created by our instructor, which would be used to test out
                the gearbox mechanism when paired with the new wooden board. The technical drawing used can be found{' '}
                <a
                  href={INSTRUCTOR_DRAWING}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  here
                </a>
                . This was fairly simple to follow and let us use the Band Saw and Lathes in the shop for the first time.
                Additionally, the measurements were pre-determined, so there was no change in the shaft&apos;s design
                throughout this part of the project, as they were already made by the instructor in advance.
              </p>
              <h3 className="text-lg md:text-xl font-bold text-white pt-6 leading-snug">
                The project is not 100% complete as I was not able to machine both of the 2 shaft designs as of Oct 7th,
                2025.
              </h3>
            </div>
          </CrissCross>
        </div>
      </article>

      <footer className="relative py-12 px-8 border-t border-white/10">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
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
