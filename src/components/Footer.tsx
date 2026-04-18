"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Phone, Rocket } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
  SiX,
  SiYoutube
} from "react-icons/si";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: "Features", path: "/" },
    { label: "Pricing", path: "/pricing" },
    { label: "Platforms", path: "/" },
    { label: "How It Works", path: "/" },
  ];

  const companyLinks = [
    { label: "About Us", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: "Careers", path: "/" },
    { label: "Contact", path: "/contact" },
  ];

  const resourcesLinks = [
    { label: "FAQ", path: "/faq" },
    { label: "Help Center", path: "/" },
    { label: "API", path: "/" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", path: "/" },
    { label: "Terms of Service", path: "/" },
    { label: "Cookie Policy", path: "/" },
    { label: "GDPR", path: "/" },
  ];

  const socialLinks = [
    { icon: SiInstagram, href: "#", label: "Instagram" },
    { icon: SiTiktok, href: "#", label: "TikTok" },
    { icon: SiX, href: "#", label: "X / Twitter" },
    { icon: SiLinkedin, href: "#", label: "LinkedIn" },
    { icon: SiYoutube, href: "#", label: "YouTube" },
    { icon: SiFacebook, href: "#", label: "Facebook" },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="relative bg-black text-gray-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 h-full w-full bg-black">
        <div className="absolute h-full w-full bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="PostBoost" className="w-48 h-auto object-contain" />
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed max-w-md">
              The ultimate social media management tool. Schedule, post, and grow your social reach across all platforms in one place.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span className="text-xs sm:text-sm">support@postboost.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span className="text-xs sm:text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span className="text-xs sm:text-sm">San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors cursor-pointer group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-base sm:text-lg mb-6">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-base sm:text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold text-base sm:text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs sm:text-sm text-gray-400">
              © {currentYear} PostBoost. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-6">
              {legalLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link.path)}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 hover:underline"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

