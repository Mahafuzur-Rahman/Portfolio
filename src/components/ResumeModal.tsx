import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Printer, Copy, Check, Mail, Phone, MapPin, Download, Eye } from "lucide-react";
import { CertificateModal } from "./CertificateModal";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = React.useState(false);
  const [selectedCert, setSelectedCert] = useState<{ id: string; name: string; issuer: string; year: string; } | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // Detect if running inside the AI Studio sandbox iframe
  const isInsideIframe = typeof window !== "undefined" && window.self !== window.top;

  const handlePrint = () => {
    try {
      if (isInsideIframe) {
        // If inside an iframe, try standard print but alert the user with helpful instruction
        window.print();
      } else {
        window.print();
      }
    } catch (e) {
      console.error("Print failed:", e);
      alert("Browser printing block encountered. Please click 'Open in New Tab' at the top right and print from there!");
    }
  };

  const handleCopyText = () => {
    const textCV = `
MAHAFUZUR RAHMAN
H#152, West Shewrapara, Mirpur, Dhaka-1216, Bangladesh
+880 1410080255 | Mahfuz.r.bijoy@gmail.com

CAREER OBJECTIVE
Motivated Computer Science & Engineering student seeking a Software Engineer Internship where I can apply my programming, problem-solving, and software development skills while contributing to organizational success and continuously improving my technical expertise.

EDUCATION
- Bachelor's Degree (Hons)
  American International University-Bangladesh (AIUB)
  B.Sc. in Computer Science & Engineering (11th Semester Running)
  CGPA: 3.26

- Higher Secondary Certificate (HSC)
  Milestone College
  Group: Science | Passing Year: 2021 | GPA: 4.50

- Secondary School Certificate (SSC)
  Abdullah Memorial High School
  Group: Science | Passing Year: 2019 | GPA: 3.94

TECHNICAL SKILLS
- Programming: Java, C, C++, C#, Python
- Web: HTML5, CSS3, JavaScript
- Database: MySQL, SQL Server
- Tools: Git, GitHub, Visual Studio, VS Code

PROJECTS
- POS Management System (C#, SQL Server)
- BloodConnectBD
- Smart Air Quality Control System

EXPERIENCE & LEADERSHIP
- Volunteer, Bangladesh Red Crescent Society (2018–2020)
  Assisted humanitarian activities and developed teamwork, communication, and leadership skills.

SOFT SKILLS
- Problem Solving, Communication, Teamwork, Time Management

CERTIFICATION
- Cisco IT Essentials (2022)

LANGUAGES
- Bengali (Native)
- English (Professional)

HOBBIES
• Traveling
• Playing Cricket
• Listening to Music

References:
- DR. ABHIJIT BHOWMIK
  Associate Professor, DEPARTMENT OF COMPUTER SCIENCE
  Email: abhijit@aiub.edu 

- DR. AFSAH SHARMIN
  Associate Professor, DEPARTMENT OF COMPUTER SCIENCE
  Email: afsah@aiub.edu
    `.trim();

    navigator.clipboard.writeText(textCV);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl z-10 no-print"
          >
            {/* Header / Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-emerald-400" />
                  Mahafuzur's Official Resume / CV
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Designed exact to original — view, print, or export as a pixel-perfect PDF.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyText}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors border border-slate-700/50 cursor-pointer"
                  title="Copy as plain text"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Resume Document Viewer */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-950/60 flex flex-col items-center gap-6">
              
              {/* Outer Printable Container containing exactly 2 pages */}
              <div
                ref={printRef}
                className="printable-resume-container flex flex-col items-center gap-8 w-full"
              >
                
                {/* ==================== PAGE 1 ==================== */}
                <div className="printable-page w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-lg border border-slate-200 font-sans text-left relative flex flex-col justify-between">
                  <div>
                    {/* Header Block */}
                    <div className="text-center pb-5 border-b border-blue-200/60 space-y-2">
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-wide uppercase print-header-name" style={{ color: "#1e3a8a" }}>
                        MAHAFUZUR RAHMAN
                      </h1>
                      <div className="text-xs sm:text-sm text-slate-600 font-medium">
                        H#152, West Shewrapara, Mirpur, Dhaka-1216, Bangladesh
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm text-blue-800 font-bold">
                        <span>+880 1410080255</span>
                        <span className="text-slate-300 hidden sm:inline">|</span>
                        <a href="mailto:Mahfuz.r.bijoy@gmail.com" className="hover:underline" style={{ color: "#1d4ed8" }}>
                          Mahfuz.r.bijoy@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Page 1 Body */}
                    <div className="space-y-6 pt-6">
                      
                      {/* Career Objective */}
                      <div className="space-y-2">
                        <h2 className="text-sm sm:text-base font-extrabold text-blue-900 uppercase tracking-wider border-b-[1.5px] border-blue-900/20 pb-1 print-section-heading" style={{ color: "#1e3a8a", borderBottomColor: "#bfdbfe" }}>
                          CAREER OBJECTIVE
                        </h2>
                        <p className="text-slate-700 text-xs sm:text-sm font-normal leading-relaxed text-justify">
                          Motivated Computer Science & Engineering student seeking a Software Engineer Internship where I can apply my programming, problem-solving, and software development skills while contributing to organizational success and continuously improving my technical expertise.
                        </p>
                      </div>

                      {/* Education */}
                      <div className="space-y-4">
                        <h2 className="text-sm sm:text-base font-extrabold text-blue-900 uppercase tracking-wider border-b-[1.5px] border-blue-900/20 pb-1 print-section-heading" style={{ color: "#1e3a8a", borderBottomColor: "#bfdbfe" }}>
                          EDUCATION
                        </h2>
                        
                        <div className="space-y-4">
                          {/* AIUB */}
                          <div className="space-y-1">
                            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                              Bachelor’s Degree (Hons)
                            </h3>
                            <p className="text-slate-800 font-semibold text-xs sm:text-sm">
                              American International University-Bangladesh (AIUB)
                            </p>
                            <p className="text-slate-700 text-xs sm:text-sm">
                              B.Sc. in Computer Science & Engineering (11th Semester Running)
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600 font-bold">
                              CGPA: 3.26
                            </p>
                          </div>

                          {/* HSC */}
                          <div className="space-y-1 pt-1.5 border-t border-slate-100">
                            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                              Higher Secondary Certificate (HSC)
                            </h3>
                            <p className="text-slate-800 font-semibold text-xs sm:text-sm">
                              Milestone College
                            </p>
                            <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm text-slate-700">
                              <p><span className="font-medium text-slate-500">Group:</span> Science</p>
                              <p><span className="font-medium text-slate-500">Passing Year:</span> 2021</p>
                              <p className="font-bold text-slate-800"><span className="font-medium text-slate-500">GPA:</span> 4.50</p>
                            </div>
                          </div>

                          {/* SSC */}
                          <div className="space-y-1 pt-1.5 border-t border-slate-100">
                            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                              Secondary School Certificate (SSC)
                            </h3>
                            <p className="text-slate-800 font-semibold text-xs sm:text-sm">
                              Abdullah Memorial High School
                            </p>
                            <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm text-slate-700">
                              <p><span className="font-medium text-slate-500">Group:</span> Science</p>
                              <p><span className="font-medium text-slate-500">Passing Year:</span> 2019</p>
                              <p className="font-bold text-slate-800"><span className="font-medium text-slate-500">GPA:</span> 3.94</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Technical Skills */}
                      <div className="space-y-2">
                        <h2 className="text-sm sm:text-base font-extrabold text-blue-900 uppercase tracking-wider border-b-[1.5px] border-blue-900/20 pb-1 print-section-heading" style={{ color: "#1e3a8a", borderBottomColor: "#bfdbfe" }}>
                          TECHNICAL SKILLS
                        </h2>
                        
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 list-none pl-0">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span><strong>Programming:</strong> Java, C, C++, C#, Python</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span><strong>Web:</strong> HTML5, CSS3, JavaScript</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span><strong>Database:</strong> MySQL, SQL Server</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span><strong>Tools:</strong> Git, GitHub, Visual Studio, VS Code</span>
                          </li>
                        </ul>
                      </div>

                      {/* Projects Section - Start */}
                      <div className="space-y-2">
                        <h2 className="text-sm sm:text-base font-extrabold text-blue-900 uppercase tracking-wider border-b-[1.5px] border-blue-900/20 pb-1 print-section-heading" style={{ color: "#1e3a8a", borderBottomColor: "#bfdbfe" }}>
                          PROJECTS
                        </h2>
                        
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 list-none pl-0">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span><strong>POS Management System</strong> (C#, SQL Server)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span><strong>BloodConnectBD</strong></span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span><strong>Smart Air Quality Control System</strong></span>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </div>

                </div>

                {/* ==================== PAGE 2 ==================== */}
                <div className="printable-page w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-lg border border-slate-200 font-sans text-left relative flex flex-col justify-between">
                  <div>
                    {/* Page 2 Body */}
                    <div className="space-y-6 pt-2">
                      
                      {/* Experience & Leadership */}
                      <div className="space-y-3">
                        <h2 className="text-sm sm:text-base font-extrabold text-blue-900 uppercase tracking-wider border-b-[1.5px] border-blue-900/20 pb-1 print-section-heading" style={{ color: "#1e3a8a", borderBottomColor: "#bfdbfe" }}>
                          EXPERIENCE & LEADERSHIP
                        </h2>
                        
                        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 list-none pl-0">
                          <li className="space-y-1.5">
                            <div className="flex justify-between items-baseline flex-wrap gap-1">
                              <div className="flex items-start gap-2">
                                <span className="text-blue-900 font-extrabold shrink-0">•</span>
                                <span className="font-extrabold text-slate-900">Volunteer, Bangladesh Red Crescent Society</span>
                              </div>
                              <span className="text-slate-500 font-mono text-xs font-semibold shrink-0">(2018–2020)</span>
                            </div>
                            <ul className="list-none pl-0 mt-1 space-y-1">
                              <li className="flex items-start gap-2 pl-4 text-slate-700">
                                <span className="text-slate-400 shrink-0">•</span>
                                <span>Assisted humanitarian activities and developed teamwork, communication, and leadership skills.</span>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>

                      {/* Soft Skills */}
                      <div className="space-y-2">
                        <h2 className="text-sm sm:text-base font-extrabold text-blue-900 uppercase tracking-wider border-b-[1.5px] border-blue-900/20 pb-1 print-section-heading" style={{ color: "#1e3a8a", borderBottomColor: "#bfdbfe" }}>
                          SOFT SKILLS
                        </h2>
                        <ul className="space-y-1 text-xs sm:text-sm text-slate-700 list-none pl-0">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span>Problem Solving &nbsp;•&nbsp; Communication &nbsp;•&nbsp; Teamwork &nbsp;•&nbsp; Time Management</span>
                          </li>
                        </ul>
                      </div>

                      {/* Certification */}
                      <div className="space-y-2">
                        <h2 className="text-sm sm:text-base font-extrabold text-blue-900 uppercase tracking-wider border-b-[1.5px] border-blue-900/20 pb-1 print-section-heading" style={{ color: "#1e3a8a", borderBottomColor: "#bfdbfe" }}>
                          CERTIFICATION
                        </h2>
                        <div className="pl-4 flex flex-wrap items-center justify-between gap-2">
                          <p className="text-slate-800 text-xs sm:text-sm font-bold">
                            Cisco IT Essentials (27 Dec 2022)
                          </p>
                          <button
                            onClick={() => setSelectedCert({
                              id: "cert-1",
                              name: "Cisco IT Essentials",
                              issuer: "Cisco Networking Academy",
                              year: "27 Dec 2022"
                            })}
                            className="no-print inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors cursor-pointer border border-blue-200/50"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Certificate</span>
                          </button>
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="space-y-2">
                        <h2 className="text-sm sm:text-base font-extrabold text-blue-900 uppercase tracking-wider border-b-[1.5px] border-blue-900/20 pb-1 print-section-heading" style={{ color: "#1e3a8a", borderBottomColor: "#bfdbfe" }}>
                          LANGUAGES
                        </h2>
                        <ul className="space-y-1 text-xs sm:text-sm text-slate-700 list-none pl-4">
                          <li>Bengali (Native)</li>
                          <li>English (Professional)</li>
                        </ul>
                      </div>

                      {/* Hobbies */}
                      <div className="space-y-2">
                        <h2 className="text-sm sm:text-base font-extrabold text-blue-900 uppercase tracking-wider border-b-[1.5px] border-blue-900/20 pb-1 print-section-heading" style={{ color: "#1e3a8a", borderBottomColor: "#bfdbfe" }}>
                          HOBBIES
                        </h2>
                        <ul className="space-y-1 text-xs sm:text-sm text-slate-700 list-none pl-4">
                          <li className="flex items-center gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span>Traveling</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span>Playing Cricket</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-blue-900 font-extrabold shrink-0">•</span>
                            <span>Listening to Music</span>
                          </li>
                        </ul>
                      </div>

                      {/* References */}
                      <div className="space-y-3 pt-2">
                        <h2 className="text-sm sm:text-base font-extrabold text-blue-900 tracking-wider pb-1 print-section-heading" style={{ color: "#1e3a8a" }}>
                          References:
                        </h2>
                        <div className="flex flex-col gap-5 pl-4">
                          <div className="space-y-0.5">
                            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
                              DR. ABHIJIT BHOWMIK
                            </h3>
                            <p className="text-slate-700 font-semibold text-xs">
                              Associate Professor
                            </p>
                            <p className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                              Department of Computer Science
                            </p>
                            <p className="text-xs text-blue-800 font-semibold mt-1">
                              Email: <a href="mailto:abhijit@aiub.edu" className="hover:underline" style={{ color: "#1d4ed8" }}>abhijit@aiub.edu</a>
                            </p>
                          </div>

                          <div className="space-y-0.5">
                            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
                              DR. AFSAH SHARMIN
                            </h3>
                            <p className="text-slate-700 font-semibold text-xs">
                              Associate Professor
                            </p>
                            <p className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                              Department of Computer Science
                            </p>
                            <p className="text-xs text-blue-800 font-semibold mt-1">
                              Email: <a href="mailto:afsah@aiub.edu" className="hover:underline" style={{ color: "#1d4ed8" }}>afsah@aiub.edu</a>
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom Actions Banner */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Tip: Chrome/Edge/Safari users can choose <strong className="text-slate-300">"Save as PDF"</strong> as their destination printer to save a clean file.
              </span>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold transition-all text-xs shadow-lg shadow-emerald-500/10 hover:-translate-y-0.5 duration-200 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Generate / Print PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <CertificateModal
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        cert={selectedCert}
        studentName="MAHAFUZUR RAHMAN"
      />
    </AnimatePresence>
  );
}
