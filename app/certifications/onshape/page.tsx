'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef, useCallback } from 'react';

const SOURCE_SITE = 'https://sites.google.com/mvla.net/omanandkhaunte/certifications/onshape';

const CERTIFICATE_SRC = '/images/certifications/onshape/certificate.jpg';

const COURSE_IMAGES = [
  '/images/certifications/onshape/course-01.jpg',
  '/images/certifications/onshape/course-02.jpg',
  '/images/certifications/onshape/course-03.jpg',
  '/images/certifications/onshape/course-04.jpg',
  '/images/certifications/onshape/course-05.jpg',
  '/images/certifications/onshape/course-06.jpg',
  '/images/certifications/onshape/course-07.jpg',
] as const;

const courses: { title: string; body: string }[] = [
  {
    title: 'Introduction to Assembly Design',
    body:
      'In this course, I learned how to create and organize assemblies by connecting different parts using mates and constraints. I gained a better understanding of how components interact and move together, and how to manage subassemblies for more complex designs. This helped me see how individual parts come together to form a complete, functional product.',
  },
  {
    title: 'Introduction to Drawings',
    body:
      'In this course, I learned how to create detailed 2D drawings from 3D models, including adding dimensions, views, and notes. I also learned how to properly label parts and organize drawings to communicate design intent clearly. This helped me understand how engineers share precise manufacturing information from their digital designs.',
  },
  {
    title: 'Introduction to Onshape Assemblies',
    body:
      'In this course, I learned how to build assemblies by inserting and positioning parts within the assembly workspace. I practiced using mates to control how components move and interact, and saw how subassemblies help organize more complex designs. This showed me how to bring separate parts together into a single, working mechanism.',
  },
  {
    title: 'Introduction to Parametric & Feature-Based CAD',
    body:
      'In this course, I learned how CAD models are built from a series of features that can be edited to update the design. I saw how sketches and dimensions control the shape of parts, and how changing these parameters lets you quickly explore different design options. This helped me understand how “parametric” modeling keeps designs flexible and easy to modify.',
  },
  {
    title: 'Introduction to Part Studios',
    body:
      'In this course, I learned how to create and organize multiple parts within a single workspace. I practiced starting sketches on different planes, adding features like extrudes and cuts, and using geometry to relate parts to each other. This showed me how designing several related parts together in one Part Studio can keep a project more consistent and efficient to edit.',
  },
  {
    title: 'Introduction to Sketching',
    body:
      'In this course, I learned the basics of creating sketches in Onshape, including drawing lines, circles, and rectangles on different planes. I practiced adding dimensions and constraints to make sketches precise and fully defined. This gave me a solid foundation for building accurate 3D models from 2D sketches.',
  },
  {
    title: 'Onshape Hands-On Test Drive',
    body:
      'In this course, I learned the basics of creating parts, assemblies, and drawings through guided exercises. I explored multi-part studios, mating components, and collaboration tools such as sharing, comments, and version history. This hands-on practice showed me how Onshape streamlines the full design workflow from modeling to teamwork.',
  },
];

/** Main certificate + one slide per course module (same order as Google Sites slideshow). */
function buildCarouselSlides(): { src: string; caption: string }[] {
  return [
    { src: CERTIFICATE_SRC, caption: 'CAD Basics — completion certificate' },
    ...courses.map((c, i) => ({
      src: COURSE_IMAGES[i],
      caption: c.title,
    })),
  ];
}

function CertificateCarousel({
  onHover,
  slides,
}: {
  onHover: (h: boolean) => void;
  slides: { src: string; caption: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 5500);
    return () => window.clearInterval(id);
  }, [paused, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  return (
    <div
      className="relative mx-auto w-full max-w-5xl"
      onMouseEnter={() => {
        setPaused(true);
        onHover(true);
      }}
      onMouseLeave={() => {
        setPaused(false);
        onHover(false);
      }}
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <div
          className="flex transition-[transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={`${slide.src}-${i}`} className="min-w-full shrink-0 px-3 pb-2 pt-4 sm:px-6 sm:pt-6">
              <div className="relative mx-auto aspect-[4/3] w-full max-h-[min(70vh,560px)]">
                <Image
                  src={slide.src}
                  alt={slide.caption}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority={i === 0}
                />
              </div>
              <p className="mt-4 text-center text-sm font-medium text-gray-500">{slide.caption}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous certificate"
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-bold/80 text-lg text-white backdrop-blur-md transition hover:bg-white/10 sm:left-4"
        onClick={() => go(-1)}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next certificate"
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-bold/80 text-lg text-white backdrop-blur-md transition hover:bg-white/10 sm:right-4"
        onClick={() => go(1)}
      >
        ›
      </button>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === index ? 'w-8 bg-gradient-to-r from-pink-400 to-amber-300' : 'w-2 bg-white/25 hover:bg-white/40'
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function OnshapePage() {
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
        <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-4">
          <Link
            href="/#certifications"
            className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
            onMouseEnter={() => hover(true)}
            onMouseLeave={() => hover(false)}
          >
            ← Back to portfolio
          </Link>
          <div className="text-xs font-bold px-4 py-2 border border-white/20 rounded-full shrink-0">CERTIFICATION</div>
        </div>
      </nav>

      <article className="relative pt-32 pb-24 px-6 sm:px-8">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <header className="relative max-w-[1100px] mx-auto mb-12 md:mb-14 space-y-4 text-center md:text-left">
          <p className="text-sm font-bold text-cyan-400 tracking-wider">CAD BASICS · ONSHAPE</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-yellow-200">
              Onshape
            </span>
          </h1>
        </header>

        <div className="relative mx-auto max-w-[1100px] space-y-14 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-white font-normal text-center md:text-left">
              I have successfully completed the Onshape certification for CAD Basics in my Freshman year!
            </p>

            <p className="text-center md:text-left">
              To get this certificate I explored multiple lessons that taught me how to use Onshape CAD. It taught me multiple
              basic features of Onshape such as sketches, assemblies, drawings, and more! I did the entire course over a span
              of a week or so in order to get this certificate shown below.
            </p>
          </div>

          <CertificateCarousel onHover={hover} slides={buildCarouselSlides()} />

          <p className="text-center text-white font-medium md:text-left pt-4">
            I have described each of the courses down below…
          </p>

          <div className="space-y-20 md:space-y-24 pt-8">
            {courses.map((course, i) => {
              const src = COURSE_IMAGES[i];
              const imageOnLeft = i % 2 === 0;
              return (
                <section
                  key={course.title}
                  className="grid gap-10 md:grid-cols-2 md:gap-12 md:items-center"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 ${
                      imageOnLeft ? 'md:order-1' : 'md:order-2'
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={src}
                        alt={course.title}
                        fill
                        className="object-contain p-3 sm:p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className={`space-y-4 ${imageOnLeft ? 'md:order-2' : 'md:order-1'}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{course.title}</h2>
                    <p>{course.body}</p>
                  </div>
                </section>
              );
            })}
          </div>

          <p className="text-sm text-gray-500 pt-8">
            Original write-up:{' '}
            <a
              href={SOURCE_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              onMouseEnter={() => hover(true)}
              onMouseLeave={() => hover(false)}
            >
              Google Sites — Onshape
            </a>
            .
          </p>
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
            onMouseEnter={() => hover(true)}
            onMouseLeave={() => hover(false)}
          >
            ← Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
