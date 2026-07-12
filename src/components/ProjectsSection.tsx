import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, ExternalLink, Github, Eye, X } from "lucide-react";
import { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Derive unique categories for filtering
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-slate-900 border-t border-slate-800/80">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-3"
          >
            <Briefcase className="w-5 h-5" />
            Work
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            Featured Projects
          </motion.h2>
          
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === category
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold"
                  : "bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800/80"
              }`}
            >
              {category === "All" ? "All Projects" : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:border-emerald-500/20 transition-all flex flex-col h-full overflow-hidden shadow-xl"
              >
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950 shrink-0">
                  <img
                    src={project.imageUrl || "https://picsum.photos/seed/placeholder/600/400"}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/600/400`;
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-10">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-slate-950 shadow-lg transition-transform hover:scale-110 cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5 font-bold" />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full self-start mb-3 font-semibold font-mono">
                    {project.category}
                  </span>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs mb-5 flex-grow line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech badging */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800/80 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] text-slate-500 px-1.5 py-1">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-800/60">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs text-emerald-400 font-bold hover:text-emerald-300 transition-colors mr-auto cursor-pointer"
                    >
                      Read Details →
                    </button>

                    <div className="flex items-center gap-2.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 bg-slate-900 hover:bg-slate-850 hover:text-emerald-400 rounded-xl text-slate-400 border border-slate-800/80 transition-all"
                          title="Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-slate-900 border border-slate-800/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Banner */}
                <div className="relative aspect-video w-full bg-slate-950">
                  <img
                    src={selectedProject.imageUrl || "https://picsum.photos/seed/placeholder/600/400"}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${selectedProject.id}/600/400`;
                    }}
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-slate-900 hover:text-red-400 text-slate-300 rounded-xl border border-slate-800/80 transition-all z-10 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs text-slate-950 bg-emerald-500 px-3 py-1 rounded-full font-bold shadow-lg">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 space-y-6 max-h-[50vh] overflow-y-auto scrollbar-thin">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">Project Overview</h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">Tech Stack Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-bold font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-800">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold text-slate-950 transition-all flex items-center gap-2 text-xs shadow-md"
                      >
                        <Github className="w-4 h-4" />
                        View Codebase
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-750 font-semibold text-xs transition-all ml-auto border border-slate-700/60 cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
