import { useState } from "react";
import { motion } from "motion/react";
import { Download, ArrowRight, Github, Linkedin, Mail, MapPin, Sparkles, GraduationCap, Award, Cpu } from "lucide-react";
import { PortfolioData } from "../types";
import ResumeModal from "./ResumeModal";

interface HeroProps {
  data: PortfolioData;
}

export default function Hero({ data }: HeroProps) {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-slate-950">
      {/* Background radial and glowing ambient circles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent opacity-70"></div>
      <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35"></div>

      <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text Content */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white"
            >
              I am <span className="text-emerald-400 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">{data.name}</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xl sm:text-2xl text-slate-300 font-semibold"
            >
              {data.title}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed font-sans"
          >
            {data.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10 group cursor-pointer text-sm"
            >
              Let's Connect
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setIsResumeOpen(true)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 font-semibold text-slate-200 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2 text-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resume / CV
            </button>
          </motion.div>

          {/* Social Links & Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col items-center lg:items-start gap-3.5 text-slate-400 pt-4"
          >
            <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800/80 px-3.5 py-2 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{data.contact.location}</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={data.contact.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 p-2 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 p-2 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${data.contact.email}`}
                className="hover:text-emerald-400 p-2 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right column: Interactive Terminal & Portrait Showcase */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center gap-8 w-full max-w-xl mx-auto">
          {/* Elegant Floating Developer ID Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -8, 0],
            }}
            transition={{ 
              opacity: { duration: 0.6 },
              y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="relative flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-br from-slate-900/90 via-slate-900/75 to-slate-950/90 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-md shadow-2xl shadow-emerald-500/5 w-full group overflow-hidden"
          >
            {/* Holographic background glow */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-400/15 transition-all duration-500"></div>
            
            {/* Portrait Frame with Glow & Pulsing Border */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 bg-gradient-to-tr from-emerald-500/30 via-slate-800 to-teal-500/30 shadow-lg shadow-slate-950 shrink-0">
              <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-slate-950">
                {data.avatarUrl ? (
                  <img
                    src={data.avatarUrl}
                    alt={data.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = "w-full h-full flex items-center justify-center text-xl font-mono font-bold bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 text-emerald-400";
                        fallback.innerText = "</>";
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-mono font-bold bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 text-emerald-400">
                    &lt;/&gt;
                  </div>
                )}
              </div>
              
              {/* Online indicator ping */}
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-emerald-500 border-2 border-slate-900 shadow-sm"></span>
              </span>
            </div>

            {/* Profile Info Details */}
            <div className="text-center sm:text-left space-y-2 flex-grow">
              <div className="space-y-0.5">
                <p className="text-lg sm:text-xl font-extrabold text-slate-100 flex items-center justify-center sm:justify-start gap-2 tracking-tight">
                  {data.name}
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                </p>
                <p className="text-xs sm:text-sm text-emerald-400 font-medium tracking-wide">
                  {data.title}
                </p>
              </div>

              <div className="border-t border-slate-800/80 my-2 pt-2"></div>

              <div className="space-y-1.5 text-xs text-slate-400 font-sans">
                <p className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                  CSE Student at AIUB
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                    11th Semester
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                    CGPA 3.26
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
