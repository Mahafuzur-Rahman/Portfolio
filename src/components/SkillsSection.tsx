import { motion } from "motion/react";
import { Code2, Server, Settings2, ShieldCheck, Brain, MessageSquare, Users, Clock, Layers, Sparkles } from "lucide-react";
import { SkillCategory } from "../types";

interface SkillsProps {
  categories: SkillCategory[];
  softSkills?: string[];
}

export default function SkillsSection({ categories, softSkills }: SkillsProps) {
  // Map index to specific category icons
  const getCategoryIcon = (categoryName: string) => {
    const nameLower = categoryName.toLowerCase();
    if (nameLower.includes("programming") || nameLower.includes("language")) {
      return <Code2 className="w-5 h-5 text-emerald-400" />;
    }
    if (nameLower.includes("web") || nameLower.includes("database") || nameLower.includes("sql")) {
      return <Server className="w-5 h-5 text-emerald-400" />;
    }
    return <Settings2 className="w-5 h-5 text-emerald-400" />;
  };

  // Helper to map soft skills to custom visual assets (icons and descriptions)
  const getSoftSkillInfo = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("problem")) {
      return {
        icon: <Brain className="w-6 h-6 text-emerald-400" />,
        title: "Problem Solving",
        desc: "Resolving complex programmatic puzzles and system bottlenecks with analytical precision and efficient algorithms."
      };
    }
    if (lower.includes("comm")) {
      return {
        icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
        title: "Communication",
        desc: "Articulating complex technical logic clearly to peers and preparing detailed, coherent documentation."
      };
    }
    if (lower.includes("team")) {
      return {
        icon: <Users className="w-6 h-6 text-emerald-400" />,
        title: "Teamwork",
        desc: "Synergizing with diverse project teams and volunteer groups like Bangladesh Red Crescent Society to hit goals."
      };
    }
    if (lower.includes("time") || lower.includes("schedul")) {
      return {
        icon: <Clock className="w-6 h-6 text-emerald-400" />,
        title: "Time Management",
        desc: "Balancing a rigorous CSE semester at AIUB alongside simultaneous active building of web and IoT applications."
      };
    }
    if (lower.includes("critical")) {
      return {
        icon: <Layers className="w-6 h-6 text-emerald-400" />,
        title: "Critical Thinking",
        desc: "Evaluating technical architectures objectively to choose the most scalable, stable, and cost-effective routes."
      };
    }
    return {
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      title: name,
      desc: "Adapting swiftly to modern technology stacks, framework pivots, and evolving software development paradigms."
    };
  };

  return (
    <section id="skills" className="py-24 bg-slate-900/40 border-t border-slate-800/80">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-3"
          >
            <ShieldCheck className="w-4 h-4" />
            Capabilities
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            Technical & Soft Skills
          </motion.h2>
          
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>

          {/* Sub-Header Selection / Quick Navigation */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById("skills");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold uppercase tracking-wider border border-emerald-500/20 cursor-pointer transition-all"
            >
              Technical Skills
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("soft-skills");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/25 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
            >
              Soft Skills
            </button>
          </div>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:border-emerald-500/20 hover:bg-slate-950/70 transition-all flex flex-col h-full shadow-lg"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80 mb-6">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  {getCategoryIcon(category.categoryName)}
                </div>
                <h3 className="font-bold text-base text-slate-100">{category.categoryName}</h3>
              </div>

              {/* Skills Progress Bar List */}
              <div className="space-y-4 flex-grow">
                {category.skills.map((skill, skillIdx) => (
                  <div key={`${category.id}-skill-${skillIdx}`} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-300">{skill.name}</span>
                      <span className="font-mono text-emerald-400 font-bold">{skill.percentage}%</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIdx * 0.05, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills Section */}
        {softSkills && softSkills.length > 0 && (
          <div id="soft-skills" className="mt-24 pt-16 border-t border-slate-800/50">
            {/* Sub-Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-3"
              >
                <Sparkles className="w-4 h-4" />
                Interpersonal Strengths
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight"
              >
                Professional & Soft Skills
              </motion.h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
                Core competencies that drive collaboration, timely execution, and critical engineering problem-solving.
              </p>
            </div>

            {/* Soft Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {softSkills.map((skillName, idx) => {
                const info = getSoftSkillInfo(skillName);
                return (
                  <motion.div
                    key={`soft-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ y: -5 }}
                    className="p-5 rounded-2xl bg-slate-950/30 border border-slate-800 hover:border-emerald-500/20 hover:bg-slate-950/60 transition-all flex flex-col text-left h-full group"
                  >
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all">
                      {info.icon}
                    </div>

                    <h4 className="font-extrabold text-sm sm:text-base text-slate-100 uppercase tracking-wider mb-2 group-hover:text-emerald-400 transition-colors">
                      {info.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {info.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

