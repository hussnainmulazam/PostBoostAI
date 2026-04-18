"use client";
import { useState, memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Rocket } from "lucide-react";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Blog", path: "/blog" },
    { name: "Pricing", path: "/pricing" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];


  return (
    <div className="relative w-full z-[100]">
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Link
            to="/"
            onClick={handleNavClick}
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-gray-900 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img src="/logo.png" alt="PostBoost" className="h-10 sm:h-12 max-w-none object-contain" />
          </Link>
          <NavItems 
            items={navItems.map(item => ({ 
              name: item.name, 
              link: item.path,
              onClick: handleNavClick,
              isActive: location.pathname === item.path
            }))}
          />
          <div className="flex items-center gap-4">
            <NavbarButton 
              variant="secondary"
              onClick={() => navigate('/login')}
              as="button"
            >
              Sign In
            </NavbarButton>
            <NavbarButton 
              variant="primary"
              onClick={() => navigate('/signup')}
              as="button"
            >
              Sign Up →
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Link
              to="/"
              onClick={handleNavClick}
              className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
            >
              <img src="/logo.png" alt="PostBoost" className="h-10 max-w-none object-contain" />
            </Link>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                to={item.path}
                onClick={handleNavClick}
                className={`relative text-neutral-600 ${
                  location.pathname === item.path ? 'font-semibold text-gray-900' : ''
                }`}
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
                variant="primary"
                className="w-full"
                as="button"
              >
                Sign In
              </NavbarButton>
              <NavbarButton
                onClick={() => {
                  navigate('/signup');
                  setIsMobileMenuOpen(false);
                }}
                variant="primary"
                className="w-full"
                as="button"
              >
                Sign Up →
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}

export default memo(Navbar);