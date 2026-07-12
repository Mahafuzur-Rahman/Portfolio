import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Save, RotateCcw, Plus, Trash2, Info, BookOpen, Layers, FolderHeart, ShieldCheck } from "lucide-react";
import { PortfolioData, Education, SkillCategory, Project } from "../types";

interface EditSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (updatedData: PortfolioData) => void;
  onReset: () => void;
}

type TabType = "personal" | "education" | "skills" | "projects" | "contact";

export default function EditSidebar({ isOpen, onClose, data, onSave, onReset }: EditSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [tempData, setTempData] = useState<PortfolioData>(JSON.parse(JSON.stringify(data)));

  // Update temp data when parent data changes (e.g. reset is triggered)
  useEffect(() => {
    setTempData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  if (!isOpen) return null;

  const handlePersonalChange = (field: keyof PortfolioData, value: string) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: string, value: string) => {
    setTempData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  // Education Helpers
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updatedEdu = [...tempData.education];
    updatedEdu[index] = { ...updatedEdu[index], [field]: value };
    setTempData((prev) => ({ ...prev, education: updatedEdu }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: "New Degree / Certificate",
      institution: "Institution Name",
      period: "2024 - Present",
      result: "CGPA: 4.00 (Optional)",
      description: "Brief summary of courses and learning outcomes."
    };
    setTempData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const deleteEducation = (id: string) => {
    setTempData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id)
    }));
  };

  // Skills Helpers
  const handleSkillChange = (catIdx: number, skillIdx: number, field: "name" | "percentage", value: string | number) => {
    const updatedCats = [...tempData.skills];
    const updatedSkills = [...updatedCats[catIdx].skills];
    
    if (field === "percentage") {
      let percent = typeof value === "string" ? parseInt(value) || 0 : value;
      percent = Math.max(0, Math.min(100, percent));
      updatedSkills[skillIdx] = { ...updatedSkills[skillIdx], percentage: percent };
    } else {
      updatedSkills[skillIdx] = { ...updatedSkills[skillIdx], name: value as string };
    }
    
    updatedCats[catIdx] = { ...updatedCats[catIdx], skills: updatedSkills };
    setTempData((prev) => ({ ...prev, skills: updatedCats }));
  };

  const addSkill = (catIdx: number) => {
    const updatedCats = [...tempData.skills];
    updatedCats[catIdx].skills.push({ name: "New Skill", percentage: 80 });
    setTempData((prev) => ({ ...prev, skills: updatedCats }));
  };

  const deleteSkill = (catIdx: number, skillIdx: number) => {
    const updatedCats = [...tempData.skills];
    updatedCats[catIdx].skills.splice(skillIdx, 1);
    setTempData((prev) => ({ ...prev, skills: updatedCats }));
  };

  // Projects Helpers
  const handleProjectChange = (index: number, field: keyof Project, value: string | string[]) => {
    const updatedProjs = [...tempData.projects];
    if (field === "technologies" && typeof value === "string") {
      const techs = value.split(",").map((t) => t.trim()).filter(Boolean);
      updatedProjs[index] = { ...updatedProjs[index], technologies: techs };
    } else {
      updatedProjs[index] = { ...updatedProjs[index], [field]: value };
    }
    setTempData((prev) => ({ ...prev, projects: updatedProjs }));
  };

  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "Brand New Project",
      description: "Brief 1-sentence summary of the project.",
      longDescription: "Detailed technical overview of the project's features and implementation details.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
      category: "Web Application"
    };
    setTempData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const deleteProject = (id: string) => {
    setTempData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  const handleSave = () => {
    onSave(tempData);
    onClose();
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col overflow-hidden">
      {/* Top Header Controls */}
      <div className="p-4 bg-slate-950 border-b border-slate-850 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest">Customize Portfolio</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850 transition-all cursor-pointer border border-transparent hover:border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs list */}
      <div className="bg-slate-950/40 border-b border-slate-850 flex overflow-x-auto whitespace-nowrap p-2 gap-1 scrollbar-none">
        {(["personal", "education", "skills", "projects", "contact"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all tracking-wider cursor-pointer ${
              activeTab === tab
                ? "bg-emerald-500 text-slate-950 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Drawer Form body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin text-left">
        {/* Tab Content: Personal */}
        {activeTab === "personal" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-800 pb-2">
              <Info className="w-4 h-4" /> Personal Information
            </h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
              <input
                type="text"
                value={tempData.name}
                onChange={(e) => handlePersonalChange("name", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Professional Title</label>
              <input
                type="text"
                value={tempData.title}
                onChange={(e) => handlePersonalChange("title", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">One-Liner Bio</label>
              <input
                type="text"
                value={tempData.bio}
                onChange={(e) => handlePersonalChange("bio", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Profile Photo URL</label>
              <input
                type="text"
                value={tempData.avatarUrl}
                onChange={(e) => handlePersonalChange("avatarUrl", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">About Me Introduction</label>
              <textarea
                value={tempData.aboutMe}
                rows={5}
                onChange={(e) => handlePersonalChange("aboutMe", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none text-slate-200 resize-none"
              />
            </div>
          </div>
        )}

        {/* Tab Content: Education */}
        {activeTab === "education" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Academic Background
              </h3>
              <button
                onClick={addEducation}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase transition-all hover:bg-emerald-500/20 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add New
              </button>
            </div>

            {tempData.education.map((edu, idx) => (
              <div key={edu.id} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3 relative group">
                <button
                  onClick={() => deleteEducation(edu.id)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Record #{idx + 1}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(idx, "institution", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Period / Years</label>
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) => handleEducationChange(idx, "period", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Result / Grade (Optional)</label>
                    <input
                      type="text"
                      value={edu.result || ""}
                      onChange={(e) => handleEducationChange(idx, "result", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Summary & Details</label>
                  <textarea
                    value={edu.description}
                    rows={2}
                    onChange={(e) => handleEducationChange(idx, "description", e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Skills */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-800 pb-2">
              <Layers className="w-4 h-4" /> Technical Capability Levels
            </h3>

            {tempData.skills.map((category, catIdx) => (
              <div key={category.id} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{category.categoryName}</h4>
                  <button
                    onClick={() => addSkill(catIdx)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold uppercase transition-all hover:bg-emerald-500/20 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Skill
                  </button>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={`${category.id}-skill-input-${skillIdx}`} className="flex items-center gap-4 relative group">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => handleSkillChange(catIdx, skillIdx, "name", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200 font-medium"
                        />
                      </div>
                      <div className="w-20">
                        <input
                          type="number"
                          value={skill.percentage}
                          onChange={(e) => handleSkillChange(catIdx, skillIdx, "percentage", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200 font-mono text-center"
                        />
                      </div>
                      <button
                        onClick={() => deleteSkill(catIdx, skillIdx)}
                        className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Projects */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <FolderHeart className="w-4 h-4" /> Professional Projects
              </h3>
              <button
                onClick={addProject}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase transition-all hover:bg-emerald-500/20 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add New
              </button>
            </div>

            {tempData.projects.map((proj, idx) => (
              <div key={proj.id} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3 relative">
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Project #{idx + 1}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                    <input
                      type="text"
                      value={proj.category}
                      onChange={(e) => handleProjectChange(idx, "category", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Short Description</label>
                  <input
                    type="text"
                    value={proj.description}
                    onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Detailed Long Description</label>
                  <textarea
                    value={proj.longDescription || ""}
                    rows={3}
                    onChange={(e) => handleProjectChange(idx, "longDescription", e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Cover Image URL</label>
                  <input
                    type="text"
                    value={proj.imageUrl}
                    onChange={(e) => handleProjectChange(idx, "imageUrl", e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">GitHub Repository URL</label>
                    <input
                      type="text"
                      value={proj.githubUrl || ""}
                      onChange={(e) => handleProjectChange(idx, "githubUrl", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Live Demo Link (Optional)</label>
                    <input
                      type="text"
                      value={proj.liveUrl || ""}
                      onChange={(e) => handleProjectChange(idx, "liveUrl", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Technologies Used (Comma Separated)</label>
                  <input
                    type="text"
                    value={proj.technologies.join(", ")}
                    onChange={(e) => handleProjectChange(idx, "technologies", e.target.value)}
                    placeholder="React, TypeScript, Tailwind"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 rounded-lg border border-slate-800 focus:border-emerald-500 outline-none text-slate-200 font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Contact */}
        {activeTab === "contact" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-800 pb-2">
              <ShieldCheck className="w-4 h-4" /> Channels & Profiles
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
              <input
                type="email"
                value={tempData.contact.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none text-slate-200 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Phone Number</label>
              <input
                type="text"
                value={tempData.contact.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none text-slate-200 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Location</label>
              <input
                type="text"
                value={tempData.contact.location}
                onChange={(e) => handleContactChange("location", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">GitHub Profile URL</label>
              <input
                type="text"
                value={tempData.contact.github}
                onChange={(e) => handleContactChange("github", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none text-slate-200 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">LinkedIn Profile URL</label>
              <input
                type="text"
                value={tempData.contact.linkedin}
                onChange={(e) => handleContactChange("linkedin", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none text-slate-200 font-mono"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 bg-slate-950 border-t border-slate-850 grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            if (window.confirm("Restore everything back to defaults?")) {
              onReset();
              onClose();
            }
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 hover:bg-red-500/5 text-xs font-bold uppercase transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black uppercase transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5 font-bold" /> Save Details
        </button>
      </div>
    </div>
  );
}
