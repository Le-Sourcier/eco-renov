import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
        isSticked ? "bg-white shadow-md" : "fixed top-0"
      }`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="  flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center font-bold ${
              !isSticked
                ? "text-white hover:text-gray-200 "
                : "text-primary hover:text-primary-dark"
            }`}
            aria-label="Accueil Éco Subvention"
          >
            <Home className="h-5 w-5 mr-2 " aria-hidden="true" />
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
                className={`nav-link ${
                  isActive(path)
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                } ${!isSticked && "text-white  hover:text-gray-200 "} `}
                aria-current={isActive(path) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}

            <Link
              to="/dashboard"
              className={`flex items-center text-sm font-medium ${
                isActive("/dashboard")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              } ${!isSticked && "text-white  hover:text-gray-200 "}`}
            >
              <FileText size={16} className="mr-1" />
              Mes demandes
            </Link>

            <Link
              to="/start"
              className="btn btn-secondary text-sm px-4 py-1.5 transition-transform hover:scale-105"
            >
              Vérifier mon éligibilité
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary p-1 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Ouvrir/fermer le menu mobile"
          >
            {isMenuOpen ? (
              <X size={20} className={`${isSticked ? "" : "text-white"}`} />
            ) : (
              <Menu size={20} className={`${isSticked ? "" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <nav
            className="md:hidden bg-white shadow-lg mt-2 rounded-lg animate-fadeIn"
            aria-label="Menu mobile"
          >
            <div className="flex flex-col space-y-4 p-4">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`nav-link ${
                    isActive(path)
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                  aria-current={isActive(path) ? "page" : undefined}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/start"
                className="btn btn-secondary w-full text-center py-2"
              >
                Vérifier mon éligibilité
              </Link>
            </div>
          </nav>
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

//   const isActive = (path: string) => location.pathname === path;

//   // Check if the header is sticky
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticked(window.scrollY > 0);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`sticky  top-0 left-0 w-full z-50 transition-colors duration-300 ${
//         isSticked ? "bg-white shadow-md " : "bg-transparent"
//       }`}
//       role="banner"
//     >
//       <div className="container mx-auto px-4 py-2">
//         <div className="flex justify-between items-center h-full">
//           <Link
//             to="/"
//             className="header-logo flex items-center transition-colors duration-300 hover:text-primary-dark"
//             aria-label="Accueil Éco Subvention"
//           >
//             <Home className="h-5 w-5 mr-2 text-primary" aria-hidden="true" />
//             <span className="font-bold text-primary">Éco Subvention</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav
//             className="hidden md:flex items-center space-x-6 header-nav"
//             role="navigation"
//           >
//             <Link
//               to="/"
//               className={`nav-link ${
//                 isActive("/")
//                   ? "text-primary"
//                   : "text-gray-600 hover:text-primary"
//               }`}
//               aria-current={isActive("/") ? "page" : undefined}
//             >
//               Accueil
//             </Link>
//             <Link
//               to="/about"
//               className={`nav-link ${
//                 isActive("/about")
//                   ? "text-primary"
//                   : "text-gray-600 hover:text-primary"
//               }`}
//               aria-current={isActive("/about") ? "page" : undefined}
//             >
//               À propos
//             </Link>
//             <Link
//               to="/start"
//               className={`nav-link ${
//                 isActive("/start")
//                   ? "text-primary"
//                   : "text-gray-600 hover:text-primary"
//               }`}
//               aria-current={isActive("/start") ? "page" : undefined}
//             >
//               Éligibilité
//             </Link>
//             <Link
//               to="/contact"
//               className={`nav-link ${
//                 isActive("/contact")
//                   ? "text-primary"
//                   : "text-gray-600 hover:text-primary"
//               }`}
//               aria-current={isActive("/contact") ? "page" : undefined}
//             >
//               Contact
//             </Link>

//             <Link
//               to="/dashboard"
//               className={`text-sm font-medium flex items-center ${
//                 isActive("/access")
//                   ? "text-primary"
//                   : "text-gray-600 hover:text-primary"
//               }`}
//             >
//               <FileText size={16} className="mr-1" />
//               Mes demandes
//             </Link>
//             <Link
//               to="/start"
//               className="btn btn-secondary text-sm px-4 py-1.5 transition-transform hover:scale-105"
//             >
//               Vérifier mon éligibilité
//             </Link>
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-expanded={isMenuOpen}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? (
//               <X size={20} aria-hidden="true" />
//             ) : (
//               <Menu size={20} aria-hidden="true" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <nav
//             className="md:hidden animate-fadeIn absolute left-0 right-0 top-[var(--header-height)] bg-white shadow-lg"
//             role="navigation"
//           >
//             <div className="container py-4">
//               <div className="flex flex-col space-y-4">
//                 <Link
//                   to="/"
//                   className={`nav-link ${
//                     isActive("/")
//                       ? "text-primary"
//                       : "text-gray-600 hover:text-primary"
//                   }`}
//                   aria-current={isActive("/") ? "page" : undefined}
//                 >
//                   Accueil
//                 </Link>
//                 <Link
//                   to="/about"
//                   className={`nav-link ${
//                     isActive("/about")
//                       ? "text-primary"
//                       : "text-gray-600 hover:text-primary"
//                   }`}
//                   aria-current={isActive("/about") ? "page" : undefined}
//                 >
//                   À propos
//                 </Link>
//                 <Link
//                   to="/start"
//                   className={`nav-link ${
//                     isActive("/start")
//                       ? "text-primary"
//                       : "text-gray-600 hover:text-primary"
//                   }`}
//                   aria-current={isActive("/start") ? "page" : undefined}
//                 >
//                   Éligibilité
//                 </Link>
//                 <Link
//                   to="/contact"
//                   className={`nav-link ${
//                     isActive("/contact")
//                       ? "text-primary"
//                       : "text-gray-600 hover:text-primary"
//                   }`}
//                   aria-current={isActive("/contact") ? "page" : undefined}
//                 >
//                   Contact
//                 </Link>
//                 <Link
//                   to="/start"
//                   className="btn btn-secondary w-full text-center py-2"
//                 >
//                   Vérifier mon éligibilité
//                 </Link>
//               </div>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
