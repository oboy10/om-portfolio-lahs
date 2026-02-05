'use client';

import { useEffect, useState } from 'react';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      description: "Real-time data visualization dashboard with machine learning insights",
      tech: ["React", "Python", "TensorFlow", "D3.js"],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "Decentralized Social Network",
      description: "Blockchain-based social platform with end-to-end encryption",
      tech: ["Solidity", "Next.js", "IPFS", "Web3"],
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "Cloud Infrastructure Manager",
      description: "Multi-cloud orchestration tool with automated scaling",
      tech: ["Go", "Kubernetes", "AWS", "Terraform"],
      gradient: "from-orange-600 to-red-600"
    },
    {
      title: "Real-time Collaboration Suite",
      description: "WebRTC-based video conferencing with AI transcription",
      tech: ["TypeScript", "WebRTC", "Node.js", "Redis"],
      gradient: "from-green-600 to-teal-600"
    }
  ];

  const skills = [
    { name: "JavaScript", level: 95, color: "#f0db4f" },
    { name: "TypeScript", level: 92, color: "#3178c6" },
    { name: "React", level: 90, color: "#61dafb" },
    { name: "Node.js", level: 88, color: "#68a063" },
    { name: "Python", level: 85, color: "#306998" },
    { name: "Go", level: 80, color: "#00add8" },
    { name: "Rust", level: 75, color: "#ce422b" },
    { name: "SQL", level: 87, color: "#f29111" }
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[128px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
            left: `${mousePosition.x - 400}px`,
            top: `${mousePosition.y - 400}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-slate-900/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            PORTFOLIO
          </div>
          <div className="flex gap-8">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl w-full">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-semibold text-cyan-400">
                Available for freelance
              </div>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter">
                <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Full Stack
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Developer
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed">
                Building exceptional digital experiences with cutting-edge technologies. 
                Specialized in scalable web applications and cloud architecture.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="px-8 py-4 border border-white/20 font-bold rounded-xl backdrop-blur-sm hover:bg-white/5 transition-all duration-300 hover:scale-105">
                Get in Touch
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl">
              {[
                { value: '50+', label: 'Projects Completed' },
                { value: '5+', label: 'Years Experience' },
                { value: '98%', label: 'Client Satisfaction' }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">
              Featured <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              A selection of my recent work showcasing innovation and technical excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${project.gradient} rounded-l-2xl`} />
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2">
                      View Project →
                    </button>
                    <button className="text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      GitHub →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">
              Technical <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              Expertise across modern development stack and cloud technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{skill.name}</span>
                  <span className="text-sm font-semibold text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                      boxShadow: `0 0 20px ${skill.color}40`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Docker', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis', 'AWS', 'GCP', 'CI/CD'].map((tech, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center font-bold hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            Let's <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's build something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="mailto:hello@example.com"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10">Send Email</span>
            </a>
            <a
              href="#"
              className="px-8 py-4 border border-white/20 font-bold rounded-xl backdrop-blur-sm hover:bg-white/5 transition-all duration-300 hover:scale-105"
            >
              Schedule Call
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center pt-12">
            {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-300 text-sm font-bold"
              >
                {platform[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © 2024 Portfolio. All rights reserved.
          </div>
          <div className="text-sm text-gray-500">
            Designed & Built with passion
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
