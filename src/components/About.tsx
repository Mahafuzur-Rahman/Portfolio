import { useState } from "react";
import { motion } from "motion/react";
import { User, Award, CheckCircle2, Globe, Sparkles, Compass, Eye } from "lucide-react";
import { PortfolioData, Certification } from "../types";
import { CertificateModal } from "./CertificateModal";

interface AboutProps {
  data: PortfolioData;
}

export default function About({ data }: AboutProps) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="about" className="py-24 bg-slate-900/40 border-t border-slate-800/80 relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-3"
          >
            <User className="w-4 h-4" />
            Discover
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            About Me
          </motion.h2>
          
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Text Detail (Column 1) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-bold text-slate-100 leading-snug"
              >
                I am a passionate <span className="text-emerald-400 font-extrabold">{data.title}</span> building scalable and robust digital systems.
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-300 leading-relaxed text-sm sm:text-base font-sans"
              >
                {data.aboutMe}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-slate-950/55 border border-slate-800/80 space-y-3"
            >
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Core Focus & Philosophy
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                I believe that continuous learning and consistent practice are the keys to becoming a successful software engineer. My goal is to strengthen my technical skills, explore modern technologies, and develop practical software solutions through academic and personal projects.
              </p>
            </motion.div>
          </div>

          {/* Central Editorial Portrait (Column 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 flex flex-col justify-between p-5 rounded-2xl bg-slate-950/40 border border-slate-800/80 shadow-2xl relative overflow-hidden group min-h-[320px]"
          >
            <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-400/10 transition-all duration-500"></div>
            
            {/* Styled Portrait Container */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner shrink-0">
              {data.avatarUrl ? (
                <img
                  src={data.avatarUrl}
                  alt={data.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = "w-full h-full flex items-center justify-center text-2xl font-mono font-bold bg-slate-950 text-emerald-400";
                      fallback.innerText = "MR";
                      parent.appendChild(fallback);
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-mono font-bold bg-slate-950 text-emerald-400">
                  MR
                </div>
              )}

            </div>

            <div className="mt-4 text-left">
              <h4 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">{data.name}</h4>
              <p className="text-[10px] text-emerald-400/95 font-mono mt-0.5">CSE STUDENT</p>
            </div>
          </motion.div>

          {/* Right Bento Box: Stats, Languages, Soft Skills & Certifications (Column 3) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Stat: Completed Projects */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-slate-950/30 border border-slate-800/60 hover:border-emerald-500/20 transition-all text-left space-y-2"
              >
                <div className="p-2 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Accomplishments</h4>
                  <p className="text-base font-bold text-white mt-0.5">{data.projects.length}+ Key Projects</p>
                </div>
              </motion.div>

              {/* Stat: Education Phase */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-xl bg-slate-950/30 border border-slate-800/60 hover:border-emerald-500/20 transition-all text-left space-y-2"
              >
                <div className="p-2 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Academic</h4>
                  <p className="text-base font-bold text-white mt-0.5">CGPA 3.26</p>
                </div>
              </motion.div>
            </div>

            {/* Languages Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-4 rounded-xl bg-slate-950/30 border border-slate-800/60 hover:border-emerald-500/20 transition-all text-left space-y-2"
            >
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Languages Spoken</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                {data.languages.map((lang, idx) => (
                  <div key={`lang-${lang.name}-${idx}`} className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-200">{lang.name}</p>
                    <p className="text-[10px] text-emerald-400/90 font-mono">{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-slate-950/30 border border-slate-800/60 hover:border-emerald-500/20 transition-all text-left space-y-2"
            >
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Certifications</h4>
              </div>
              <div className="space-y-3.5 pt-0.5">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="space-y-2 border-b border-slate-900/40 pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-xs font-bold text-slate-200 leading-snug">{cert.name}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">{cert.issuer}</p>
                      </div>
                      <span className="text-[9px] font-mono bg-slate-900 border border-slate-800/80 px-1.5 py-0.5 rounded text-emerald-400 font-bold shrink-0">{cert.year}</span>
                    </div>
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1 text-[9px] font-bold bg-slate-900/80 hover:bg-emerald-500 hover:text-slate-950 px-2.5 py-1 rounded transition-all text-emerald-400 cursor-pointer border border-emerald-500/15 hover:border-transparent active:scale-95"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Certificate</span>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hobbies Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="p-4 rounded-xl bg-slate-950/30 border border-slate-800/60 hover:border-emerald-500/20 transition-all text-left space-y-2"
            >
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Hobbies</h4>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-1 text-center">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-emerald-500/30 hover:bg-slate-900 transition-all group">
                  <span className="text-xl block group-hover:scale-110 transition-transform duration-300">✈️</span>
                  <span className="text-[10px] font-bold text-slate-300 mt-1 block">Traveling</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-emerald-500/30 hover:bg-slate-900 transition-all group">
                  <span className="text-xl block group-hover:scale-110 transition-transform duration-300">🏏</span>
                  <span className="text-[10px] font-bold text-slate-300 mt-1 block">Cricket</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-emerald-500/30 hover:bg-slate-900 transition-all group">
                  <span className="text-xl block group-hover:scale-110 transition-transform duration-300">🎧</span>
                  <span className="text-[10px] font-bold text-slate-300 mt-1 block">Music</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <CertificateModal
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        cert={selectedCert}
        studentName={data.name}
      />
    </section>
  );
}
