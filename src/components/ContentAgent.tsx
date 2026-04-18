import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Sparkles, Upload, Image as ImageIcon, Video, X, 
  Instagram, Twitter, Linkedin, Facebook, Check, 
  ChevronRight, ChevronLeft, Plus, Globe, Smartphone,
  Monitor, RefreshCw, Calendar, Clock
} from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContentAgentProps {
  onNavigate: (page: string) => void;
}

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "#E4405F" },
  { id: "twitter", name: "Twitter/X", icon: Twitter, color: "#1DA1F2" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0A66C2" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "#1877F2" },
];

interface DescriptionSection {
  id: string;
  title: string;
  content: string;
}

export function ContentAgent({ onNavigate }: ContentAgentProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  
  // Data State
  const [topic, setTopic] = useState("");
  const [descriptionSections, setDescriptionSections] = useState<DescriptionSection[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleTime, setScheduleTime] = useState("");
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Handlers
  const nextStep = () => {
    setDirection(1);
    setStep(s => Math.min(s + 1, 7));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 1));
  };

  const handleTopicSubmit = () => {
    if (!topic) return;
    setIsGenerating(true);
    // Mock AI Generation
    setTimeout(() => {
      setDescriptionSections([
        {
          id: "1",
          title: "Hook",
          content: "🚀 Transforming the future of education with Artificial Intelligence! imagine a classroom where every student gets a personalized tutor."
        },
        {
          id: "2",
          title: "Main Value",
          content: "AI isn't just about automation; it's about augmentation. By handling administrative tasks, teachers can focus on what they do best: inspiring students."
        },
        {
          id: "3",
          title: "Call to Action",
          content: "What are your thoughts on AI in the classroom? Drop a comment below! 👇 #EdTech #AI #FutureOfWork"
        }
      ]);
      setIsGenerating(false);
      nextStep();
    }, 1500);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    setMediaFiles(prev => [...prev, ...newFiles]);
  };

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          />
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div 
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                s <= step 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white text-gray-400 border border-gray-200'
              }`}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
          <span>Topic</span>
          <span>Content</span>
          <span>Media</span>
          <span>Channels</span>
          <span>Schedule</span>
          <span>Review</span>
          <span>Publish</span>
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {/* STEP 1: TOPIC INPUT */}
        {step === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">What do you want to post about?</h1>
            <p className="text-gray-500 mb-8 max-w-md">
              Enter a topic, and our AI agent will craft the perfect social media post structure for you.
            </p>
            <div className="w-full relative group">
              <Input 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., The future of AI in education..."
                className="h-14 pl-6 pr-32 rounded-2xl text-lg shadow-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                onKeyDown={(e) => e.key === 'Enter' && handleTopicSubmit()}
              />
              <Button 
                onClick={handleTopicSubmit}
                disabled={!topic || isGenerating}
                className="absolute right-2 top-2 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
              >
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Generate
                    <Sparkles className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: DESCRIPTION */}
        {step === 2 && (
          <motion.div
             key="step2"
             custom={direction}
             variants={variants}
             initial="enter"
             animate="center"
             exit="exit"
             className="max-w-3xl mx-auto"
           >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Review & Customize</h2>
                <p className="text-gray-500">Review the generated content and make it yours.</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleTopicSubmit}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>

            <div className="space-y-4 mb-8">
              {descriptionSections.map((section, index) => (
                <div key={section.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm group hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <Input 
                      value={section.title}
                      onChange={(e) => {
                        const newSections = [...descriptionSections];
                        newSections[index].title = e.target.value;
                        setDescriptionSections(newSections);
                      }}
                      className="font-semibold text-sm text-blue-600 border-none px-0 h-auto focus-visible:ring-0 max-w-[200px]" 
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                      onClick={() => setDescriptionSections(prev => prev.filter(s => s.id !== section.id))}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea 
                    value={section.content}
                    onChange={(e) => {
                      const newSections = [...descriptionSections];
                      newSections[index].content = e.target.value;
                      setDescriptionSections(newSections);
                    }}
                    className="min-h-[80px] bg-transparent border-0 focus-visible:ring-0 p-0 text-gray-700 resize-none w-full"
                  />
                </div>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-500 hover:text-blue-600 h-12 rounded-xl"
                onClick={() => setDescriptionSections(prev => [...prev, { id: Date.now().toString(), title: "New Section", content: "" }])}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep} className="bg-blue-600 text-white hover:bg-blue-700">Next Step <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: MEDIA */}
        {step === 3 && (
          <motion.div
             key="step3"
             custom={direction}
             variants={variants}
             initial="enter"
             animate="center"
             exit="exit"
             className="max-w-3xl mx-auto"
           >
             <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Visuals</h2>
                <p className="text-gray-500">Upload images/videos or generate them with AI.</p>
              </div>

              <div className="grid gap-6">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer relative"
                >
                   <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Drop files or click to upload</h3>
                  <p className="text-gray-500 mt-2">Supports JPG, PNG, MP4</p>
                </div>

                {mediaFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mediaFiles.map((file, i) => (
                      <div key={i} className="relative aspect-square rounded-xl bg-gray-100 overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {file.type.startsWith('video') ? <Video className="w-8 h-8 text-gray-400" /> : <ImageIcon className="w-8 h-8 text-gray-400" />}
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="h-8 w-8 text-xs"
                            onClick={() => setMediaFiles(prev => prev.filter((_, idx) => idx !== i))}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <div className="h-px bg-gray-200 flex-1" />
                  <span className="text-sm text-gray-400 font-medium">OR</span>
                  <div className="h-px bg-gray-200 flex-1" />
                </div>

                <Button variant="outline" className="h-12 border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:border-purple-300">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Image
                </Button>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep} className="bg-blue-600 text-white hover:bg-blue-700">Next Step <ChevronRight className="ml-2 w-4 h-4" /></Button>
              </div>
           </motion.div>
        )}

        {/* STEP 4: PLATFORMS */}
        {step === 4 && (
          <motion.div
             key="step4"
             custom={direction}
             variants={variants}
             initial="enter"
             animate="center"
             exit="exit"
             className="max-w-3xl mx-auto"
           >
             <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Select Platforms</h2>
                <p className="text-gray-500">Where should this content be published?</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {platforms.map(platform => {
                  const isSelected = selectedPlatforms.includes(platform.id);
                  return (
                    <div 
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-sm' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: platform.color }}
                          >
                            <platform.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                            <p className="text-xs text-gray-500">{isSelected ? 'Connected' : 'Click to connect'}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button 
                  onClick={nextStep} 
                  disabled={selectedPlatforms.length === 0}
                  className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Next Step <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
           </motion.div>
        )}

        {/* STEP 5: SCHEDULE */}
        {step === 5 && (
          <motion.div
             key="step5"
             custom={direction}
             variants={variants}
             initial="enter"
             animate="center"
             exit="exit"
             className="max-w-3xl mx-auto"
           >
             <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Schedule Post</h2>
                <p className="text-gray-500">Pick the perfect time for your audience.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Select Date & Time</h3>
                      <p className="text-xs text-gray-500">When should this go live?</p>
                    </div>
                  </div>
                  
                  <Input 
                    type="datetime-local" 
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="h-12 text-lg"
                  />
                  
                  <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 text-sm">AI Recommendation</h4>
                      <p className="text-yellow-700 text-xs mt-1">Based on your audience activity, the best time to post is Tomorrow at 9:00 AM.</p>
                      <Button 
                        variant="link" 
                        className="text-yellow-800 p-0 h-auto text-xs font-semibold mt-1"
                        onClick={() => {
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          tomorrow.setHours(9, 0, 0, 0);
                          setScheduleTime(tomorrow.toISOString().slice(0, 16));
                        }}
                      >
                        Use Recommendation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button 
                  onClick={nextStep} 
                  disabled={!scheduleTime}
                  className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Next Step <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
           </motion.div>
        )}

        {/* STEP 6: FINAL REVIEW */}
        {step === 6 && (
          <motion.div
             key="step6"
             custom={direction}
             variants={variants}
             initial="enter"
             animate="center"
             exit="exit"
             className="max-w-3xl mx-auto"
           >
             <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Final Review</h2>
                <p className="text-gray-500">Double check everything before publishing.</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1 block">Topic</span>
                  <h3 className="text-lg font-semibold text-gray-900">{topic}</h3>
                </div>

                <div className="p-6 border-b border-gray-100 grid md:grid-cols-2 gap-8">
                  <div>
                    <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-3 block">Content</span>
                    <div className="space-y-4 text-sm text-gray-600">
                      {descriptionSections.map(section => (
                        <div key={section.id}>
                          <p>{section.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-3 block">Media ({mediaFiles.length})</span>
                    <div className="grid grid-cols-3 gap-2">
                       {mediaFiles.map((file, i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          {file.type.startsWith('video') ? <Video className="w-5 h-5 text-gray-400" /> : <ImageIcon className="w-5 h-5 text-gray-400" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50">
                  <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-3 block">Publishing To</span>
                  <div className="flex gap-3">
                    {selectedPlatforms.map(id => {
                      const p = platforms.find(p => p.id === id);
                      if (!p) return null;
                      return (
                         <Badge key={id} className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 pl-1 pr-2 py-1 flex items-center gap-1">
                           <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px]" style={{ backgroundColor: p.color }}>
                             <p.icon className="w-2.5 h-2.5" />
                           </div>
                           {p.name}
                         </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>

              {scheduleTime && (
                <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Clock className="w-5 h-5 text-blue-600" />
                     <div>
                       <span className="text-xs font-bold text-blue-600 tracking-wider uppercase block">Scheduled For</span>
                       <span className="text-sm font-semibold text-gray-900">{new Date(scheduleTime).toLocaleString()}</span>
                     </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setStep(5)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-100">
                    Change
                  </Button>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button 
                  onClick={() => {
                    setIsPublishing(true);
                    setTimeout(() => {
                      setIsPublishing(false);
                      nextStep();
                    }, 2000);
                  }} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-purple-500/20"
                >
                  {isPublishing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      Publish Now <Globe className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
           </motion.div>
        )}

        {/* STEP 7: SUCCESS */}
        {step === 7 && (
          <motion.div
             key="step7"
             custom={direction}
             variants={variants}
             initial="enter"
             animate="center"
             exit="exit"
             className="max-w-xl mx-auto text-center py-12"
           >
             <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
               <Check className="w-12 h-12" />
             </div>
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Published Successfully!</h2>
             <p className="text-gray-500 mb-8">Your content is now live on {selectedPlatforms.length} platforms.</p>
             
             <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Success Rate</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">Now</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Time Published</div>
                </div>
             </div>

             <Button 
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 rounded-xl"
              onClick={() => {
                setStep(1);
                setTopic("");
                setDescriptionSections([]);
                setMediaFiles([]);
                setSelectedPlatforms([]);
                setScheduleTime("");
              }}
             >
               Start New Post
             </Button>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
