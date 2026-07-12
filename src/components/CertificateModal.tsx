import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Award } from "lucide-react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  cert: {
    id: string;
    name: string;
    issuer: string;
    year: string;
  } | null;
  studentName?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  cert,
  studentName = "MAHAFUZUR RAHMAN"
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"document" | "scan">("scan");

  useEffect(() => {
    if (isOpen && cert) {
      if (cert.id === "cert-2" || cert.id === "cert-3" || cert.id === "cert-4") {
        setViewMode("scan");
      } else {
        setViewMode("document");
      }
    }
  }, [isOpen, cert]);

  if (!isOpen || !cert) return null;

  // Configuration mapper for each certificate
  const getCertDetails = () => {
    switch (cert.id) {
      case "cert-1":
        return {
          modalTitle: "Cisco IT Essential Certificate",
          modalSubtitle: "Cisco Networking Academy",
          verifiedText: "Verified ID: b2d5b880",
          headerLeft: (
            <div className="text-left">
              <p className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase">Cisco</p>
              <p className="text-xs sm:text-sm font-extrabold text-[#044383] tracking-tight leading-none">Networking</p>
              <p className="text-xs sm:text-sm font-extrabold text-[#044383] tracking-tight leading-none">Academy</p>
            </div>
          ),
          accentColor: "#044383",
          gradientStop1: "#044383",
          gradientStop2: "#bfdbfe",
          courseDetail: "IT Essentials: PC Hardware and Software",
          issuerSuffix: "through the Cisco Networking Academy program.",
          signatureName: "Lynn Bloomer",
          signatureTitle: "Director, Cisco Networking Academy",
          dateText: "27 Dec 2022",
          certId: "b2d5b880-3760-4750-a205-8a9bdb11810c"
        };
      case "cert-2":
        return {
          modalTitle: "AIUB Academic Profile",
          modalSubtitle: "American International University-Bangladesh (AIUB)",
          verifiedText: "Verified ID: AIUB-CSE",
          headerLeft: (
            <div className="text-left">
              <p className="text-[9px] sm:text-[10px] font-bold text-[#1e3a8a] tracking-wider uppercase">AIUB</p>
              <p className="text-xs sm:text-sm font-extrabold text-[#b8860b] tracking-tight leading-none">American International</p>
              <p className="text-[9px] sm:text-[10px] font-bold text-[#1e3a8a] tracking-tight leading-none uppercase">University-Bangladesh</p>
            </div>
          ),
          accentColor: "#1e3a8a",
          gradientStop1: "#1e3a8a",
          gradientStop2: "#fcd34d",
          courseDetail: "Bachelor of Science in Computer Science & Engineering (B.Sc. CSE)",
          issuerSuffix: "With a CGPA of 3.26 (11th Semester Running) at American International University-Bangladesh.",
          signatureName: "Office of the Registrar",
          signatureTitle: "American International University-Bangladesh",
          dateText: "2021 - Present",
          certId: "AIUB-CSE-2021-9382",
          imageUrl: "https://i.imgur.com/7vk2qFt.png"
        };
      case "cert-3":
        return {
          modalTitle: "Higher Secondary Certificate (HSC)",
          modalSubtitle: "Milestone College",
          verifiedText: "Verified ID: BISE-DHA",
          headerLeft: (
            <div className="text-left">
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-800 tracking-wider uppercase">Board of Intermediate & Secondary Education</p>
              <p className="text-xs sm:text-sm font-extrabold text-emerald-700 tracking-tight leading-none">Milestone College, Dhaka</p>
            </div>
          ),
          accentColor: "#065f46",
          gradientStop1: "#065f46",
          gradientStop2: "#6ee7b7",
          courseDetail: "Higher Secondary Certificate (HSC) | Science Group",
          issuerSuffix: "Successfully passing the higher secondary board evaluation, achieving GPA: 4.50.",
          signatureName: "Principal",
          signatureTitle: "Principal, Milestone College Dhaka",
          dateText: "2019 - 2021",
          certId: "BISE-DHAKA-HSC-729402",
          imageUrl: "https://i.imgur.com/N9GCEYe.jpg"
        };
      case "cert-4":
        return {
          modalTitle: "Secondary School Certificate (SSC)",
          modalSubtitle: "Abdullah Memorial High School",
          verifiedText: "Verified ID: BISE-DHA",
          headerLeft: (
            <div className="text-left">
              <p className="text-[9px] sm:text-[10px] font-bold text-blue-900 tracking-wider uppercase">Board of Intermediate & Secondary Education</p>
              <p className="text-xs sm:text-sm font-extrabold text-blue-800 tracking-tight leading-none">Abdullah Memorial High School</p>
            </div>
          ),
          accentColor: "#1e3a8a",
          gradientStop1: "#1e3a8a",
          gradientStop2: "#93c5fd",
          courseDetail: "Secondary School Certificate (SSC) | Science Group",
          issuerSuffix: "Successfully passing the secondary school board evaluation, achieving GPA: 3.94.",
          signatureName: "Headmaster",
          signatureTitle: "Headmaster, Abdullah Memorial High School",
          dateText: "2017 - 2019",
          certId: "BISE-DHAKA-SSC-821945",
          imageUrl: "https://i.imgur.com/AZUktIu.jpg"
        };
      default:
        return {
          modalTitle: "Official Credential",
          modalSubtitle: cert.issuer,
          verifiedText: "Verified ID: AUTH",
          headerLeft: (
            <div className="text-left">
              <p className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-tight leading-none">{cert.issuer}</p>
            </div>
          ),
          accentColor: "#0f172a",
          gradientStop1: "#0f172a",
          gradientStop2: "#cbd5e1",
          courseDetail: cert.name,
          issuerSuffix: "through the " + cert.issuer + " program.",
          signatureName: "Registrar Office",
          signatureTitle: "Authorized Academic Official",
          dateText: cert.year,
          certId: "REG-" + cert.id.toUpperCase(),
          imageUrl: undefined
        };
    }
  };

  const details = getCertDetails();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md no-print"
        />

        {/* Modal Content Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl z-10 no-print"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400 animate-pulse" />
                {details.modalTitle}
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
                {details.modalSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Certificate Scroll View */}
          <div className="overflow-y-auto p-4 md:p-8 flex-grow flex justify-center items-center bg-slate-950/40">
            {viewMode === "scan" && details.imageUrl ? (
              /* Scanned Image Mode */
              <div
                ref={printRef}
                id="printable-certificate"
                className="relative w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl border-8 border-slate-100 flex justify-center items-center p-1 sm:p-2"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
              >
                <img
                  src={details.imageUrl}
                  alt={cert.name}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg block select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              /* Digitized Document Mode */
              <div
                ref={printRef}
                id="printable-certificate"
                className="relative w-full aspect-[4/3] max-w-3xl bg-white text-slate-800 p-8 sm:p-12 md:p-16 rounded-lg border-[12px] border-slate-100 shadow-xl overflow-hidden select-none flex flex-col justify-between"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
              >
                {/* Top-Right Decorative Waves */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-25 pointer-events-none">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M100,0 C80,10 60,5 50,25 C40,45 60,65 30,85 C15,95 0,90 0,100 L100,100 Z" fill="url(#dynamic-gradient)" />
                    <defs>
                      <linearGradient id="dynamic-gradient" x1="50" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={details.accentColor} />
                        <stop offset="100%" stopColor={details.gradientStop2} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Institution Header */}
                <div className="flex justify-between items-start z-10">
                  {details.headerLeft}
                  <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200/50 text-emerald-800 text-[9px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{details.verifiedText}</span>
                  </div>
                </div>

                {/* Certificate Core Content */}
                <div className="my-auto text-center space-y-4 sm:space-y-6 z-10">
                  <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium italic">
                    This academic credential is awarded to
                  </p>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide uppercase my-2" style={{ color: details.accentColor }}>
                    {studentName}
                  </h2>
                  
                  <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium italic">
                    for successfully completing and fulfilling requirements for
                  </p>

                  <div className="py-2 border-y border-slate-100 my-1 max-w-xl mx-auto">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black leading-tight" style={{ color: details.accentColor }}>
                      {details.courseDetail}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 font-medium italic">
                    {details.issuerSuffix}
                  </p>
                </div>

                {/* Bottom Signature and Date Fields */}
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100 items-end text-left z-10">
                  {/* Signature Row */}
                  <div>
                    <div className="h-8 sm:h-12 flex items-end pl-2">
                      <span 
                        className="text-xl sm:text-2xl md:text-3xl font-serif text-slate-800 font-medium italic select-none"
                        style={{ 
                          fontFamily: "'Playfair Display', 'Georgia', serif",
                          letterSpacing: "-0.5px",
                          transform: "rotate(-2deg)",
                          display: "inline-block"
                        }}
                      >
                        {details.signatureName}
                      </span>
                    </div>
                    <div className="border-t border-slate-300 pt-1.5 mt-1">
                      <p className="text-[9px] sm:text-xs font-bold text-slate-700 leading-tight">{details.signatureName}</p>
                      <p className="text-[8px] sm:text-[10px] text-slate-400">{details.signatureTitle}</p>
                    </div>
                  </div>

                  {/* Completion Date Row */}
                  <div className="text-right">
                    <div className="h-8 sm:h-12 flex items-end justify-end">
                      <span className="text-xs sm:text-sm md:text-base font-mono font-bold text-slate-800">
                        {details.dateText}
                      </span>
                    </div>
                    <div className="border-t border-slate-300 pt-1.5 mt-1">
                      <p className="text-[9px] sm:text-xs font-bold text-slate-700 leading-tight">Academic Session / Date</p>
                      <p className="text-[8px] sm:text-[10px] text-slate-400">Verified Board Record</p>
                    </div>
                  </div>
                </div>

                {/* Cert ID Footer */}
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <span className="text-[7px] sm:text-[9px] text-slate-400 font-mono tracking-wider">
                    Cert ID: {details.certId}
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Global Print Styling Injector */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body * {
              visibility: hidden !important;
            }
            #printable-certificate, #printable-certificate * {
              visibility: visible !important;
            }
            #printable-certificate {
              position: fixed !important;
              left: 0 !important;
              top: 0 !important;
              width: 100vw !important;
              height: 75vw !important; /* Standard 4:3 landscape print aspect */
              max-width: 100% !important;
              border: none !important;
              padding: 40px !important;
              box-shadow: none !important;
              background: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}} />
      </div>
    </AnimatePresence>
  );
};
