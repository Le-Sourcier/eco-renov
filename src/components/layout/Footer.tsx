import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-200 pt-12 pb-6" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Éco Subvention</h3>
            <p className="mb-4 text-neutral-300">
              Simplifiez vos démarches pour la rénovation énergétique et trouvez
              les aides CEE auxquelles vous avez droit.
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur Facebook"
                className="hover:text-secondary transition-colors duration-300"
              >
                <Facebook size={20} aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur Twitter"
                className="hover:text-secondary transition-colors duration-300"
              >
                <Twitter size={20} aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur Instagram"
                className="hover:text-secondary transition-colors duration-300"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur LinkedIn"
                className="hover:text-secondary transition-colors duration-300"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Liens rapides</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="hover:text-secondary transition-colors duration-300"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-secondary transition-colors duration-300"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/start"
                    className="hover:text-secondary transition-colors duration-300"
                  >
                    Vérifier mon éligibilité
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-secondary transition-colors duration-300"
                  >
                    Questions fréquentes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-secondary transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              {/* <li className="flex items-start">
                <MapPin
                  size={20}
                  className="mr-2 mt-1 flex-shrink-0 text-secondary"
                  aria-hidden="true"
                />
                <span>123 Avenue de l'Écologie, 75000 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={20}
                  className="mr-2 flex-shrink-0 text-secondary" // Lucide icon color, keep as new secondary (teal)
                  aria-hidden="true"
                />
                <a
                  href="tel:+33123456789"
                  className="hover:text-secondary transition-colors duration-300"
                >
                  +33 (0)1 23 45 67 89
                </a>
              </li> */}
              <li className="flex items-center">
                <Mail
                  size={20}
                  className="mr-2 flex-shrink-0 text-secondary"
                  aria-hidden="true"
                />
                <a
                  href="mailto:contact@ecorenov.fr"
                  className="hover:text-secondary transition-colors duration-300"
                >
                  contact@ecorenov.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Restez informé</h3>
            <p className="mb-4 text-neutral-300">
              Abonnez-vous à notre newsletter pour recevoir les dernières
              informations sur les aides à la rénovation énergétique.
            </p>
            <form
              className="flex flex-col space-y-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-neutral-700 text-neutral-100 placeholder-neutral-400 border border-neutral-600"
                aria-label="Adresse email pour la newsletter"
                required
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-teal-600 transition-colors duration-300 text-white px-4 py-2 rounded-lg font-medium"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0 text-neutral-300">
              &copy; {new Date().getFullYear()} Éco Subvention. Tous droits
              réservés.
            </p>
            <nav>
              <ul className="flex flex-wrap justify-center space-x-4">
                <li>
                  <Link
                    to="/privacy"
                    className="text-neutral-300 hover:text-secondary transition-colors duration-300"
                  >
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-neutral-300 hover:text-secondary transition-colors duration-300"
                  >
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mentions-legales"
                    className="text-neutral-300 hover:text-secondary transition-colors duration-300"
                  >
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
