import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Send, MapPin, Phone, Mail, CheckCircle2, Copy, ArrowRight, Sparkles 
} from "lucide-react";
import { toast } from "sonner";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { LitButton } from "@/components/ui/lit-button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WorldMapDemo from "./WorldMapDemo";

/* --- Floating Input Component --- */
const ModernInput = ({ 
  id, label, type = "text", value, onChange, placeholder, required = false, isTextarea = false 
}: any) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  const InputEl = isTextarea ? "textarea" as any : "input";

  return (
    <div className="relative w-full group mb-6">
      <label 
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${
          isActive 
            ? "-top-6 text-sm text-indigo-600 dark:text-indigo-400" 
            : "top-3 text-base text-gray-400 dark:text-gray-500"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <InputEl
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        className={`w-full bg-transparent border-b-2 border-gray-200 dark:border-white/10 px-0 py-3 text-gray-900 dark:text-white outline-none transition-all duration-300 focus:border-indigo-500 dark:focus:border-indigo-400 ${
          isTextarea ? "min-h-[100px] resize-y" : "h-12"
        }`}
        required={required}
      />
      <div className={`absolute bottom-0 left-0 h-[2px] bg-indigo-500 transition-all duration-500 ease-out ${focused ? "w-full" : "w-0"}`} />
    </div>
  );
};

/* --- Main Component --- */
export function Contact() {
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      toast.success("We received your message!");
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    toast.success(`Copied: ${text}`);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="min-h-screen bg-transparent overflow-hidden relative selection:bg-indigo-500/30">
      
      <Navbar />

      {/* Main Content */}
      <section className="pt-32 lg:pt-40 pb-20 px-4 sm:px-6 relative z-10 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_38%)]" />
        <div className="container mx-auto max-w-7xl relative z-20">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Typography & Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 font-medium text-sm mb-8 border border-purple-200 cursor-default hover:bg-purple-100 transition-colors w-max">
                <Sparkles className="w-4 h-4" />
                We're here to help
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-gray-900">
                Let's build <br />
                <TextGenerateEffect 
                  words="something great." 
                  className="text-gray-900 block mt-2" 
                />
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12 max-w-lg">
                Have a project in mind, a question about our platform, or just want to chat? We'd love to hear from you. Our team typically responds within minutes.
              </p>

              {/* Contact Info Bento */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Email Block */}
                <div 
                  onClick={() => copyToClipboard('hello@postboost.ai', 'email')}
                  className="group cursor-pointer p-6 rounded-3xl bg-gray-50/80 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                    {copiedItem === 'email' ? <CheckCircle2 className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email us</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">hello@postboost.ai</p>
                </div>

                {/* Phone Block */}
                <div 
                  onClick={() => copyToClipboard('+1 (555) 123-4567', 'phone')}
                  className="group cursor-pointer p-6 rounded-3xl bg-gray-50/80 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    {copiedItem === 'phone' ? <CheckCircle2 className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Call us</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
                </div>

                {/* HQ Block */}
                <div className="sm:col-span-2 p-6 rounded-3xl bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-0.5">Headquarters</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">123 Innovation Drive, Silicon Valley</p>
                    </div>
                  </div>
                  <a href="https://maps.google.com/?q=Silicon+Valley" target="_blank" rel="noreferrer" className="w-full sm:w-auto text-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 flex items-center gap-6">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Follow us</p>
                <div className="h-px w-12 bg-gray-200 dark:bg-gray-800" />
                <div className="flex gap-4">
                  {[FaTwitter, FaLinkedin, FaGithub].map((Icon, idx) => (
                    <a key={idx} href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-1 transition-all">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: High-Impact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 bg-white dark:bg-gray-900 shadow-[0_0_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(255,255,255,0.02)] rounded-[40px] -z-10" />
              <div className="absolute inset-0 rounded-[40px] border border-gray-100 dark:border-white/5 pointer-events-none -z-10" />
              
              <div className="p-8 sm:p-12 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-10">Fill out the form below and we'll get back to you shortly.</p>

                {submitSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="flex-1 flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Awesome!</h4>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs">Your message has safely landed in our inbox. We'll be in touch soon.</p>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-8 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 mt-6">
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8 mb-8">
                      <ModernInput id="name" label="Your Name" value={formData.name} onChange={(e: any) => setFormData({...formData, name: e.target.value})} required placeholder="John Doe" />
                      <ModernInput id="email" type="email" label="Email Address" value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} required placeholder="john@example.com" />
                    </div>
                    <div className="mb-8">
                      <ModernInput id="company" label="Company (Optional)" value={formData.company} onChange={(e: any) => setFormData({...formData, company: e.target.value})} placeholder="Acme Inc." />
                    </div>
                    <div className="mb-10">
                      <ModernInput id="message" label="How can we help?" value={formData.message} onChange={(e: any) => setFormData({...formData, message: e.target.value})} required isTextarea placeholder="Tell us about your project or inquiry..." />
                    </div>
                    
                    <LitButton
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-auto w-full h-12 justify-center text-base font-medium rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <span className="flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </LitButton>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Connectivity - Full Bleed Map Section */}
      <section className="w-full relative overflow-hidden bg-slate-950 dark:bg-black pt-24 pb-0 flex flex-col items-center">
        {/* Map Header Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center z-20 mb-10 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Global Connectivity
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We operate across borders, serving users and enterprises from data centers spanning multiple continents. Our presence is truly global.
          </p>
        </motion.div>

        {/* The WorldMapDemo wrapper spans full width */}
        <div className="w-full max-w-[100vw] overflow-x-hidden flex justify-center opacity-90 hover:opacity-100 transition-opacity duration-700 relative z-10 [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)]">
          <WorldMapDemo />
        </div>
      </section>

      <Footer />
    </div>
  );
}


