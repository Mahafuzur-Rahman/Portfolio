import { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, Calendar, Award, Eye } from "lucide-react";
import { Education } from "../types";
import { CertificateModal } from "./CertificateModal";

interface EducationProps {
  educationList: Education[];
}

export default function EducationSection({ educationList }: EducationProps) {
  const [selectedCert, setSelectedCert] = useState<{ id: string; name: string; issuer: string; year: string; } | null>(null);

  return (
    <section id="education" className="py-24 bg-slate-900 border-t border-slate-800/80">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-3"
          >
            <GraduationCap className="w-5 h-5" />
            Milestones
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            Education History
          </motion.h2>
          
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto pl-6 md:pl-0">
          {/* Vertical central bar (visible on md screens and up) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2"></div>

          <div className="space-y-12">
            {educationList.map((edu, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={edu.id} className="relative flex flex-col md:flex-row items-stretch">
                  {/* Timeline point */}
                  <div className="absolute left-6 md:left-1/2 top-6 w-4 h-4 bg-emerald-500 border-4 border-slate-900 rounded-full -translate-x-1/2 z-10 shadow-lg shadow-emerald-500/50"></div>

                  {/* Left Column (Card for even index, hidden on mobile for odd index) */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 text-left md:text-right' : 'hidden md:block'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:border-emerald-500/30 transition-all shadow-xl h-full flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex flex-col md:items-end mb-3">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full mb-2">
                              <Calendar className="w-3.5 h-3.5" />
                              {edu.period}
                            </span>
                            <h3 className="text-lg font-bold text-white leading-snug">{edu.degree}</h3>
                            <p className="text-emerald-400 font-semibold text-xs mt-1">{edu.institution}</p>
                          </div>
                          
                          {edu.result && (
                            <div className="flex flex-col md:items-end gap-2.5 mb-3">
                              <div className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full md:ml-auto w-fit">
                                <Award className="w-3.5 h-3.5" />
                                <span>{edu.result}</span>
                              </div>
                              <button
                                onClick={() => {
                                  if (edu.id === "edu-1") {
                                    setSelectedCert({
                                      id: "cert-2",
                                      name: "Bachelor of Science in Computer Science & Engineering (B.Sc. CSE)",
                                      issuer: "American International University-Bangladesh (AIUB)",
                                      year: "2021 - Present"
                                    });
                                  } else if (edu.id === "edu-2") {
                                    setSelectedCert({
                                      id: "cert-3",
                                      name: "Higher Secondary Certificate (HSC)",
                                      issuer: "Milestone College",
                                      year: "2019 - 2021"
                                    });
                                  } else if (edu.id === "edu-3") {
                                    setSelectedCert({
                                      id: "cert-4",
                                      name: "Secondary School Certificate (SSC)",
                                      issuer: "Abdullah Memorial High School",
                                      year: "2017 - 2019"
                                    });
                                  }
                                }}
                                className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-slate-900/80 hover:bg-emerald-500 hover:text-slate-950 px-3 py-1.5 rounded transition-all text-emerald-400 cursor-pointer border border-emerald-500/15 hover:border-transparent active:scale-95 md:ml-auto w-fit"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>{edu.id === "edu-1" ? "View Profile" : "View Certificate"}</span>
                              </button>
                            </div>
                          )}
                          
                          <p className="text-slate-400 text-xs leading-relaxed mt-2">{edu.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Column (Card for odd index, hidden on mobile for even index) */}
                  <div className={`w-full md:w-1/2 ${!isEven ? 'md:pl-12 text-left' : 'hidden md:block'}`}>
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:border-emerald-500/30 transition-all shadow-xl h-full flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex flex-col md:items-start mb-3">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full mb-2">
                              <Calendar className="w-3.5 h-3.5" />
                              {edu.period}
                            </span>
                            <h3 className="text-lg font-bold text-white leading-snug">{edu.degree}</h3>
                            <p className="text-emerald-400 font-semibold text-xs mt-1">{edu.institution}</p>
                          </div>
                          
                          {edu.result && (
                            <div className="flex flex-col md:items-start gap-2.5 mb-3">
                              <div className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full md:mr-auto w-fit">
                                <Award className="w-3.5 h-3.5" />
                                <span>{edu.result}</span>
                              </div>
                              <button
                                onClick={() => {
                                  if (edu.id === "edu-1") {
                                    setSelectedCert({
                                      id: "cert-2",
                                      name: "Bachelor of Science in Computer Science & Engineering (B.Sc. CSE)",
                                      issuer: "American International University-Bangladesh (AIUB)",
                                      year: "2021 - Present"
                                    });
                                  } else if (edu.id === "edu-2") {
                                    setSelectedCert({
                                      id: "cert-3",
                                      name: "Higher Secondary Certificate (HSC)",
                                      issuer: "Milestone College",
                                      year: "2019 - 2021"
                                    });
                                  } else if (edu.id === "edu-3") {
                                    setSelectedCert({
                                      id: "cert-4",
                                      name: "Secondary School Certificate (SSC)",
                                      issuer: "Abdullah Memorial High School",
                                      year: "2017 - 2019"
                                    });
                                  }
                                }}
                                className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-slate-900/80 hover:bg-emerald-500 hover:text-slate-950 px-3 py-1.5 rounded transition-all text-emerald-400 cursor-pointer border border-emerald-500/15 hover:border-transparent active:scale-95 md:mr-auto w-fit"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>{edu.id === "edu-1" ? "View Profile" : "View Certificate"}</span>
                              </button>
                            </div>
                          )}
                          
                          <p className="text-slate-400 text-xs leading-relaxed mt-2">{edu.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CertificateModal
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        cert={selectedCert}
        studentName="MAHAFUZUR RAHMAN"
      />
    </section>
  );
}
