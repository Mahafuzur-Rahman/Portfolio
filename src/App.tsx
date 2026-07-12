import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Menu, X, ArrowUp, Sparkles, CheckCircle2, Mail, ChevronDown } from "lucide-react";

import { PortfolioData, MessageRecord } from "./types";
import { initialPortfolioData } from "./data";
import Hero from "./components/Hero";
import About from "./components/About";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import EditSidebar from "./components/EditSidebar";
import { MessagesModal } from "./components/MessagesModal";

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialPortfolioData);
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check if running on localhost, in development environment, or with special query parameter
  const isEditableMode = typeof window !== "undefined" && (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.includes("ais-dev-") ||
    window.location.search.includes("edit=true")
  );

  // Load from server and LocalStorage on mount
  useEffect(() => {
    async function loadPortfolioData() {
      let activeData = initialPortfolioData;

      try {
        // Fetch real-time customized data directly from the server disk
        const response = await fetch("/api/portfolio");
        if (response.ok) {
          const serverData = await response.json();
          if (serverData && typeof serverData === "object") {
            activeData = serverData;
          }
        }
      } catch (err) {
        console.warn("Could not fetch portfolio dynamically from server, using local fallback:", err);
      }

      try {
        // If they are NOT in edit mode (regular visitors), ALWAYS serve the clean server-side data!
        // This solves the issue where visitors don't see changes because of local storage overrides
        if (!isEditableMode) {
          setPortfolioData(activeData);
        } else {
          // If in edit mode, check if there's an active work-in-progress draft in local storage
          const storedData = localStorage.getItem("portfolio_data_bn_v2");
          if (storedData) {
            const parsed = JSON.parse(storedData);
            let needsUpdate = false;
            
            // Force update to the latest uploaded profile photo
            if (!parsed.avatarUrl || parsed.avatarUrl !== activeData.avatarUrl) {
              parsed.avatarUrl = activeData.avatarUrl;
              needsUpdate = true;
            }

            // Force update GitHub link if it contains rjbijoy255 or is empty
            if (parsed.contact && (!parsed.contact.github || parsed.contact.github.includes("rjbijoy255"))) {
              parsed.contact.github = activeData.contact.github;
              needsUpdate = true;
            }

            // Force update LinkedIn link if it contains rjbijoy255 or is empty
            if (parsed.contact && (!parsed.contact.linkedin || parsed.contact.linkedin.includes("rjbijoy255"))) {
              parsed.contact.linkedin = activeData.contact.linkedin;
              needsUpdate = true;
            }

            // Force update About Me section if it has the old content
            if (!parsed.aboutMe || parsed.aboutMe.includes("strong foundation")) {
              parsed.aboutMe = activeData.aboutMe;
              needsUpdate = true;
            }

            // Force update projects with updated github links
            if (parsed.projects && Array.isArray(parsed.projects)) {
              parsed.projects = parsed.projects.map((proj: any) => {
                const activeProj = activeData.projects.find((p: any) => p.id === proj.id);
                if (activeProj && proj.githubUrl !== activeProj.githubUrl) {
                  needsUpdate = true;
                  return { ...proj, githubUrl: activeProj.githubUrl };
                }
                return proj;
              });
            }

            // Force update certifications array to apply latest details
            if (parsed.certifications && Array.isArray(parsed.certifications)) {
              parsed.certifications = activeData.certifications;
              needsUpdate = true;
            }

            // Force update education institutions if they contain old names
            if (parsed.education && Array.isArray(parsed.education)) {
              parsed.education = parsed.education.map((edu: any) => {
                if (edu.institution === "Milestone College" || edu.institution === "Abdullah Memorial High School") {
                  needsUpdate = true;
                  return { ...edu, institution: "Board of Intermediate and Secondary Education, Dhaka Bangladesh" };
                }
                return edu;
              });
            }

            // Robust data sanitization & deduplication to completely eliminate any duplicate React key warnings
            if (parsed.education && Array.isArray(parsed.education)) {
              const ids = new Set();
              const uniqueEdu = [];
              for (const edu of parsed.education) {
                if (edu && edu.id && !ids.has(edu.id)) {
                  ids.add(edu.id);
                  uniqueEdu.push(edu);
                } else {
                  needsUpdate = true;
                }
              }
              parsed.education = uniqueEdu;
            }

            if (parsed.skills && Array.isArray(parsed.skills)) {
              const ids = new Set();
              const uniqueSkills = [];
              for (const cat of parsed.skills) {
                if (cat && cat.id && !ids.has(cat.id)) {
                  ids.add(cat.id);
                  uniqueSkills.push(cat);
                } else {
                  needsUpdate = true;
                }
              }
              parsed.skills = uniqueSkills;
            }

            if (parsed.projects && Array.isArray(parsed.projects)) {
              const ids = new Set();
              const uniqueProjects = [];
              for (const proj of parsed.projects) {
                if (proj && proj.id && !ids.has(proj.id)) {
                  ids.add(proj.id);
                  uniqueProjects.push(proj);
                } else {
                  needsUpdate = true;
                }
              }
              parsed.projects = uniqueProjects;
            }

            if (parsed.certifications && Array.isArray(parsed.certifications)) {
              const ids = new Set();
              const uniqueCerts = [];
              for (const cert of parsed.certifications) {
                if (cert && cert.id && !ids.has(cert.id)) {
                  ids.add(cert.id);
                  uniqueCerts.push(cert);
                } else {
                  needsUpdate = true;
                }
              }
              parsed.certifications = uniqueCerts;
            }

            if (needsUpdate) {
              localStorage.setItem("portfolio_data_bn_v2", JSON.stringify(parsed));
            }
            setPortfolioData(parsed);

            // Automatically sync local modifications to the codebase/server
            // so visitors will immediately see the changes when the site is published/shared!
            if (isEditableMode) {
              const serverStr = JSON.stringify(activeData);
              const localStr = JSON.stringify(parsed);
              if (serverStr !== localStr) {
                console.log("Auto-syncing local portfolio changes to server codebase...");
                fetch("/api/save-portfolio", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: localStr,
                })
                  .then((res) => {
                    if (res.ok) {
                      console.log("Codebase successfully auto-synchronized with local changes!");
                    } else {
                      console.warn("Auto-sync failed to persist on server.");
                    }
                  })
                  .catch((e) => console.warn("Auto-sync network error:", e));
              }
            }
          } else {
            // No draft, use the server-side active data
            setPortfolioData(activeData);
          }
        }

        // Load contact messages and deduplicate them to avoid any key warnings
        const storedMessages = localStorage.getItem("portfolio_messages");
        if (storedMessages) {
          try {
            const parsedMsgs = JSON.parse(storedMessages);
            if (Array.isArray(parsedMsgs)) {
              const seen = new Set();
              const uniqueMsgs = parsedMsgs.filter((msg: any) => {
                if (!msg) return false;
                const uniqueKey = `${msg.name}-${msg.email}-${msg.subject}-${msg.message}-${msg.date}`;
                if (seen.has(uniqueKey)) return false;
                seen.add(uniqueKey);
                return true;
              });
              setMessages(uniqueMsgs);
              if (uniqueMsgs.length !== parsedMsgs.length) {
                localStorage.setItem("portfolio_messages", JSON.stringify(uniqueMsgs));
              }
            }
          } catch (e) {
            console.error("Error sanitizing messages:", e);
          }
        }
      } catch (err) {
        console.error("Error setting portfolio data:", err);
        setPortfolioData(activeData);
      }
    }

    loadPortfolioData();
  }, [isEditableMode]);

  // Scroll listener for top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show dynamic toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Portfolio Handlers
  const handleSavePortfolio = async (updatedData: PortfolioData) => {
    setPortfolioData(updatedData);
    localStorage.setItem("portfolio_data_bn_v2", JSON.stringify(updatedData));
    triggerToast("Saving changes to codebase...");
    
    try {
      const response = await fetch("/api/save-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      
      if (response.ok) {
        triggerToast("Portfolio saved permanently to codebase!");
      } else {
        const errorData = await response.json();
        console.error("Failed to persist changes to codebase:", errorData);
        triggerToast("Saved locally, but failed to persist to server.");
      }
    } catch (err) {
      console.error("Network error while trying to persist portfolio:", err);
      triggerToast("Saved locally in your browser.");
    }
  };

  const handleResetPortfolio = async () => {
    setPortfolioData(initialPortfolioData);
    localStorage.removeItem("portfolio_data_bn_v2");
    localStorage.removeItem("portfolio_data_bn");
    triggerToast("Restoring defaults...");
    
    try {
      const response = await fetch("/api/save-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialPortfolioData),
      });
      
      if (response.ok) {
        triggerToast("All configurations restored to default!");
      } else {
        triggerToast("Restored locally, but server reset failed.");
      }
    } catch (err) {
      console.error("Network error resetting codebase:", err);
      triggerToast("Restored locally in your browser.");
    }
  };

  // Message Handlers
  const handleNewMessage = (newMsg: MessageRecord) => {
    const updatedMsgs = [newMsg, ...messages];
    setMessages(updatedMsgs);
    localStorage.setItem("portfolio_messages", JSON.stringify(updatedMsgs));
    triggerToast("Thank you! Your entry was successfully posted.");
  };

  const handleDeleteMessage = (index: number) => {
    const updatedMsgs = messages.filter((_, i) => i !== index);
    setMessages(updatedMsgs);
    localStorage.setItem("portfolio_messages", JSON.stringify(updatedMsgs));
    triggerToast("Guestbook entry has been deleted.");
  };

  const handleClearMessages = () => {
    setMessages([]);
    localStorage.removeItem("portfolio_messages");
    triggerToast("All guestbook entries cleared successfully.");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 antialiased">
      
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-xl flex items-center gap-2.5 shadow-2xl shadow-emerald-500/20 text-xs sm:text-sm border border-emerald-400"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/60 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-2.5 group cursor-pointer text-left">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-extrabold text-lg shadow-lg shadow-emerald-500/10 group-hover:rotate-6 transition-transform">
              {portfolioData.name.charAt(0)}
            </div>
            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              {portfolioData.name}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection("home")} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors">Home</button>
            <button onClick={() => scrollToSection("about")} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors">About</button>
            <button onClick={() => scrollToSection("education")} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors">Education</button>
            
            {/* Skills Nav with Dropdown */}
            <div className="relative group/skills py-1">
              <button
                onClick={() => scrollToSection("skills")}
                className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-1"
              >
                <span>Skills</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover/skills:text-emerald-400 group-hover/skills:rotate-180 transition-all" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover/skills:flex flex-col bg-slate-950/95 backdrop-blur-md border border-slate-800/80 rounded-xl py-1.5 w-44 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => scrollToSection("skills")}
                  className="px-4 py-2 text-left text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 hover:bg-slate-900/60 transition-colors cursor-pointer"
                >
                  Technical Skills
                </button>
                <div className="h-[1px] bg-slate-900/80 mx-2"></div>
                <button
                  onClick={() => {
                    const el = document.getElementById("soft-skills");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-4 py-2 text-left text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 hover:bg-slate-900/60 transition-colors cursor-pointer"
                >
                  Soft Skills
                </button>
              </div>
            </div>

            <button onClick={() => scrollToSection("projects")} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors">Projects</button>
            <button onClick={() => scrollToSection("contact")} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors">Contact</button>
            {isEditableMode && (
              <button
                onClick={() => setIsMessagesOpen(true)}
                className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-1.5 relative py-1"
              >
                <span>Messages</span>
                {messages.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black leading-none animate-pulse">
                    {messages.length}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Action Button: Customize Details */}
          <div className="flex items-center gap-3">
            {isEditableMode && (
              <button
                onClick={() => setIsEditOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-[10px] sm:text-xs uppercase transition-all shadow-md shadow-emerald-500/10 cursor-pointer tracking-wider"
              >
                <Settings className="w-4 h-4 animate-spin [animation-duration:12s]" />
                <span className="hidden sm:inline">Customize</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850 lg:hidden transition-all cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-900/60 bg-slate-950 overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col gap-4 text-left">
                <button onClick={() => scrollToSection("home")} className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 py-1 cursor-pointer">Home</button>
                <button onClick={() => scrollToSection("about")} className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 py-1 cursor-pointer">About</button>
                <button onClick={() => scrollToSection("education")} className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 py-1 cursor-pointer">Education</button>
                
                {/* Mobile Skills Dropdown / List */}
                <div className="flex flex-col gap-1.5 pl-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Skills</span>
                  <div className="pl-3 flex flex-col gap-2 border-l border-slate-800">
                    <button
                      onClick={() => {
                        scrollToSection("skills");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-emerald-400 py-0.5 text-left cursor-pointer"
                    >
                      — Technical Skills
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setTimeout(() => {
                          const el = document.getElementById("soft-skills");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-emerald-400 py-0.5 text-left cursor-pointer"
                    >
                      — Soft Skills
                    </button>
                  </div>
                </div>

                <button onClick={() => scrollToSection("projects")} className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 py-1 cursor-pointer">Projects</button>
                <button onClick={() => scrollToSection("contact")} className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 py-1 cursor-pointer">Contact</button>
                {isEditableMode && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMessagesOpen(true);
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 py-1 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Messages</span>
                    {messages.length > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black leading-none">
                        {messages.length}
                      </span>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Modules */}
      <main className="relative">
        <Hero data={portfolioData} />
        <About data={portfolioData} />
        <EducationSection educationList={portfolioData.education} />
        <SkillsSection categories={portfolioData.skills} softSkills={portfolioData.softSkills} />
        <ProjectsSection projects={portfolioData.projects} />
        <ContactSection contact={portfolioData.contact} onMessageSubmit={handleNewMessage} />
      </main>

      {/* Footer */}
      <footer className="py-16 bg-slate-950 border-t border-slate-900/60 text-center">
        <div className="container mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold tracking-wide text-slate-300">Designed & Developed by {portfolioData.name}</span>
          </div>
          <div className="text-xs text-slate-400 max-w-lg mx-auto space-y-1.5 leading-relaxed">
            <p className="font-semibold text-slate-300">Computer Science & Engineering Student at AIUB</p>
            <p className="text-slate-500 text-[11px]">Aspiring Software Engineer | Passionate about Software Development & Web Development</p>
            <p className="text-slate-500 text-[11px] font-mono">Address: H#152, West Shewrapara, Mirpur, Dhaka-1216, Bangladesh</p>
          </div>
          <div className="pt-4 text-[10px] text-slate-600 uppercase font-mono tracking-wider">
            © {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Live Customization Drawer */}
      <AnimatePresence>
        {isEditableMode && isEditOpen && (
          <EditSidebar
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            data={portfolioData}
            onSave={handleSavePortfolio}
            onReset={handleResetPortfolio}
          />
        )}
      </AnimatePresence>

      {/* Standalone Visitor Messages Inbox Overlay */}
      <AnimatePresence>
        {isEditableMode && isMessagesOpen && (
          <MessagesModal
            isOpen={isMessagesOpen}
            onClose={() => setIsMessagesOpen(false)}
            messages={messages}
            onDeleteMessage={handleDeleteMessage}
            onClearMessages={handleClearMessages}
          />
        )}
      </AnimatePresence>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 p-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl shadow-lg hover:shadow-emerald-500/20 z-45 transition-all cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 font-bold" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
