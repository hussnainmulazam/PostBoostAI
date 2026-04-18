import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  FileText, Sparkles, Plus, ArrowLeft, CheckCircle2, AlertCircle, TrendingUp, Download, Edit
} from "lucide-react";
import { motion } from "framer-motion";

interface ResumeAgentProps {
  onNavigate: (page: string) => void;
}

export function ResumeAgent({ onNavigate }: ResumeAgentProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white" style={{ paddingTop: 0, marginTop: 0 }}>
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 h-[420px] w-[420px] rounded-full bg-[#C084FC]/30 blur-[200px]" />
        <div className="absolute bottom-10 left-0 h-[360px] w-[360px] rounded-full bg-[#00F5FF]/25 blur-[180px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent opacity-60" />
      </div>

      <div className="relative z-10 w-full">
        {/* Header */}
        <header className="glass border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="glass rounded-xl p-2 hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Career Builder</p>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">Resume Agent</h1>
                <p className="text-xs sm:text-sm text-white/60">Build and optimize your professional resume</p>
              </div>
            </div>
            <Button className="hidden bg-white/10 text-white hover:bg-white/20 sm:inline-flex">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Optimize
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="w-full p-4 sm:p-6 lg:p-8">
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Profile Strength */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong rounded-2xl border border-white/10 p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">Profile Strength</h2>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2 text-white">78%</div>
                <div className="text-sm text-white/60">Good Progress</div>
              </div>
              <Progress value={78} className="mb-6 h-2 bg-white/10" style={{ background: 'rgba(255,255,255,0.1)' }} />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#80FFEA]" />
                  <span>Contact info complete</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#80FFEA]" />
                  <span>Work experience added</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span>Add more skills</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span>Include certifications</span>
                </div>
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-[#C084FC] to-[#00F5FF] text-white hover:opacity-90">
                <TrendingUp className="w-4 h-4 mr-2" />
                Improve Profile
              </Button>
            </motion.div>

            {/* Resume Templates */}
            <div className="lg:col-span-2 glass-strong rounded-2xl border border-white/10 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-xl font-semibold text-white">Resume Templates</h2>
                <Button size="sm" className="bg-gradient-to-r from-[#C084FC] to-[#00F5FF] text-white hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Resume
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'Modern Professional', desc: 'Clean and contemporary design', color: '#00F5FF' },
                  { name: 'Creative Designer', desc: 'Perfect for creative professionals', color: '#C084FC' },
                  { name: 'Tech Engineer', desc: 'Technical and structured layout', color: '#3B82F6' },
                  { name: 'Executive', desc: 'Professional and authoritative style', color: '#80FFEA' },
                ].map((template, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass rounded-xl border border-white/10 p-4 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group"
                  >
                    <div className={`aspect-[8.5/11] rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${template.color === '#00F5FF' ? 'from-[#00F5FF]/20 to-transparent' : template.color === '#C084FC' ? 'from-[#C084FC]/20 to-transparent' : template.color === '#3B82F6' ? 'from-[#3B82F6]/20 to-transparent' : 'from-[#80FFEA]/20 to-transparent'}`}>
                      <FileText className="w-12 h-12 text-white/40" />
                    </div>
                    <h3 className="mb-2 font-semibold text-white">{template.name}</h3>
                    <p className="text-sm text-white/60 mb-4">{template.desc}</p>
                    <Button variant="outline" size="sm" className="w-full glass border-white/10 text-white hover:bg-white/10">
                      <Edit className="w-4 h-4 mr-2" />
                      Use Template
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-strong rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-[#00F5FF]" />
              AI Suggestions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { text: "Add quantifiable achievements to your experience", color: "#00F5FF" },
                { text: "Include keywords from target job descriptions", color: "#C084FC" },
                { text: "Optimize summary for ATS systems", color: "#80FFEA" }
              ].map((suggestion, idx) => (
                <div key={idx} className="glass rounded-xl border-l-4 border border-white/10 p-4 bg-white/5" style={{ borderLeftColor: suggestion.color }}>
                  <p className="text-sm text-white/80">{suggestion.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
