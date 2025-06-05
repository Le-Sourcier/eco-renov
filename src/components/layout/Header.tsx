import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Home, FileText } from "lucide-react";

const navLinks = [
  { path: "/", label: "Accueil" },
  { path: "/about", label: "À propos" },
  { path: "/start", label: "Éligibilité" },
  { path: "/contact", label: "Contact" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticked, setIsSticked] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsSticked(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false); // ferme le menu en cas de navigation
  }, [location]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isSticked ? "bg-bg-primary shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center font-bold ${
              !isSticked
                ? "text-white hover:text-neutral-200"
                : "text-primary hover:text-blue-700" // Assuming new primary is a shade of blue
            }`}
            aria-label="Accueil Éco Subvention"
          >
            <Home className="h-5 w-5 mr-2" aria-hidden="true" />
            Éco Subvention
          </Link>

          {/* Navigation Desktop */}
          <nav
            className="hidden md:flex space-x-6 items-center"
            aria-label="Navigation principale"
          >
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link font-medium ${
                  isActive(path)
                    ? "text-secondary"
                    : isSticked
                    ? "text-text-primary hover:text-primary"
                    : "text-white hover:text-neutral-200"
                }`}
                aria-current={isActive(path) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}

            <Link
              to="/dashboard"
              className={`flex items-center text-sm font-medium ${
                isActive("/dashboard")
                  ? "text-secondary"
                  : isSticked
                  ? "text-text-primary hover:text-primary"
                  : "text-white hover:text-neutral-200"
              }`}
            >
              <FileText size={16} className="mr-1" />
              Mes demandes
            </Link>

            <Link
              to="/start"
              className="bg-secondary hover:bg-teal-600 text-white text-sm px-4 py-1.5 rounded-lg transition-transform transition-colors duration-200 hover:scale-105"
            >
              Vérifier mon éligibilité
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-1 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
              isSticked ? "text-primary" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Ouvrir/fermer le menu mobile"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-bg-primary shadow-lg mt-2 rounded-lg"
            aria-label="Menu mobile"
          >
            <nav className="flex flex-col space-y-4 p-4">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`nav-link py-2 px-3 rounded-lg font-medium ${
                    isActive(path)
                      ? "text-secondary bg-teal-50" // Added a light bg for active mobile link
                      : "text-text-primary hover:text-primary hover:bg-neutral-100"
                  }`}
                  aria-current={isActive(path) ? "page" : undefined}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/start"
                className="bg-secondary hover:bg-teal-600 text-white w-full text-center py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Vérifier mon éligibilité
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X, Home, FileText } from "lucide-react";

// const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSticked, setIsSticked] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticked(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location]);

// No second component definition
