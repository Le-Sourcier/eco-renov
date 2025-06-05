import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  HelpCircle,
  BarChart3,
  BadgeCheck,
} from "lucide-react";
import ChatBot from "../components/chatbot/ChatBot";
import DepartmentMap from "../components/map/DepartmentMap";
import TestimonialSlider from "../components/testimonials/TestimonialSlider";
import NavigationObserver from "../components/navigation/NavigationObserver";
import SectionNav from "../components/navigation/SectionNav";
import { scrollToHash } from "../components/utils/scroll";

const sections = [
  { id: "hero", label: "Accueil" },
  { id: "map", label: "Carte des aides" },
  { id: "benefits", label: "Avantages" },
  { id: "testimonials", label: "Témoignages" },
  { id: "faq", label: "FAQ" },
  { id: "partners", label: "Partenaires" },
];

const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    document.title =
      "Éco Subvention - Vérifiez votre éligibilité aux aides CEE";
    scrollToHash();
  }, []);

  return (
    <div className=" ">
      <NavigationObserver
        sectionIds={sections.map((s) => s.id)}
        onChange={setActiveSection}
      />
      <SectionNav sections={sections} activeSection={activeSection} />

      {/* Hero Section */}
      <section
        id="hero"
        className="bg-gradient-to-br from-primary to-blue-700 text-white py-20" // Updated: from-primary to-blue-700
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white" // Ensured text-white
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Découvrez les aides pour <br className="hidden md:block" />
                <span className="text-secondary">rénover votre logement</span> {/* text-secondary is new teal, good */}
              </motion.h1>

              <motion.p
                className="text-lg mb-8 text-neutral-200 opacity-90" // Updated: text-neutral-200
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Économisez jusqu'à 90% sur vos travaux de rénovation énergétique
                grâce aux Certificats d'Économies d'Énergie (CEE).
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-2">
                  <Check
                    size={20}
                    className="text-secondary mr-2 flex-shrink-0" // text-secondary is new teal, good
                  />
                  <span className="text-neutral-100">Accompagnement personnalisé de A à Z</span> {/* Updated: text-neutral-100 */}
                </div>
                <div className="flex items-center mb-2">
                  <Check
                    size={20}
                    className="text-secondary mr-2 flex-shrink-0" // text-secondary is new teal, good
                  />
                  <span className="text-neutral-100">Artisans RGE qualifiés dans votre région</span> {/* Updated: text-neutral-100 */}
                </div>
                <div className="flex items-center mb-2">
                  <Check
                    size={20}
                    className="text-secondary mr-2 flex-shrink-0" // text-secondary is new teal, good
                  />
                  <span className="text-neutral-100">Simulation immédiate de vos aides financières</span> {/* Updated: text-neutral-100 */}
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 lg:pl-12">
              <ChatBot />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-16 bg-bg-secondary"> {/* Updated: bg-bg-secondary */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4"> {/* Updated: badge colors */}
              AIDES PAR RÉGION
            </span>
            <h2 className="text-3xl font-bold mb-4 text-primary"> {/* Updated: text-primary (new blue) */}
              Montants des aides CEE par département
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto"> {/* Updated: text-text-secondary */}
              Les montants des aides CEE varient selon votre localisation
              géographique. Explorez la carte pour découvrir les aides
              disponibles dans votre département.
            </p>
          </div>

          <DepartmentMap />
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-bg-primary"> {/* Updated: bg-bg-primary (white) */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4"> {/* Updated: badge colors */}
              POURQUOI NOUS CHOISIR
            </span>
            <h2 className="text-3xl font-bold mb-4 text-primary"> {/* Updated: text-primary (new blue) */}
              Simplifiez votre rénovation énergétique
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto"> {/* Updated: text-text-secondary */}
              Nous vous guidons à travers les démarches administratives et vous
              mettons en relation avec des artisans qualifiés pour une
              rénovation sans souci.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="card bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"> {/* Ensured bg-white, rounded-lg, shadow-lg */}
              <div className="card-body p-6"> {/* Added padding to card-body for consistency */}
                <div className="bg-primary bg-opacity-10 p-3 rounded-full inline-flex mb-4"> {/* This will be blue bg-opacity-10 */}
                  <HelpCircle size={24} className="text-primary" /> {/* text-primary (new blue) */}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary"> {/* text-primary (new blue) */}
                  Accompagnement personnalisé
                </h3>
                <p className="text-text-secondary leading-relaxed"> {/* Updated: text-text-secondary */}
                  Un conseiller dédié vous accompagne tout au long de votre
                  projet, de l'étude de faisabilité jusqu'à la réception des
                  travaux.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"> {/* Ensured bg-white, rounded-lg, shadow-lg */}
              <div className="card-body p-6"> {/* Added padding to card-body for consistency */}
                <div className="bg-primary bg-opacity-10 p-3 rounded-full inline-flex mb-4"> {/* This will be blue bg-opacity-10 */}
                  <BarChart3 size={24} className="text-primary" /> {/* text-primary (new blue) */}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary"> {/* text-primary (new blue) */}
                  Économies garanties
                </h3>
                <p className="text-text-secondary leading-relaxed"> {/* Updated: text-text-secondary */}
                  Réduisez vos factures d'énergie grâce à des travaux financés
                  jusqu'à 90% par les aides CEE et MaPrimeRénov'.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"> {/* Ensured bg-white, rounded-lg, shadow-lg */}
              <div className="card-body p-6"> {/* Added padding to card-body for consistency */}
                <div className="bg-primary bg-opacity-10 p-3 rounded-full inline-flex mb-4"> {/* This will be blue bg-opacity-10 */}
                  <BadgeCheck size={24} className="text-primary" /> {/* text-primary (new blue) */}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary"> {/* text-primary (new blue) */}
                  Artisans certifiés RGE
                </h3>
                <p className="text-text-secondary leading-relaxed"> {/* Updated: text-text-secondary */}
                  Nos artisans partenaires sont tous certifiés RGE (Reconnu
                  Garant de l'Environnement), garantissant un travail de
                  qualité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-bg-secondary"> {/* Updated: bg-bg-secondary */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4"> {/* Updated: badge colors */}
              TÉMOIGNAGES
            </span>
            <h2 className="text-3xl font-bold mb-4 text-primary"> {/* Updated: text-primary (new blue) */}
              Ce que nos clients disent
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto"> {/* Updated: text-text-secondary */}
              Découvrez les témoignages de propriétaires ayant bénéficié des
              aides CEE et réalisé d'importantes économies sur leurs travaux de
              rénovation.
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary"> {/* Updated: bg-primary (new blue) */}
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-6 text-white" // text-white is good
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Prêt à économiser sur vos travaux de rénovation ?
          </motion.h2>

          <motion.p
            className="text-lg mb-8 text-white opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ne passez pas à côté des aides auxquelles vous avez droit. Vérifiez
            votre éligibilité en moins de 3 minutes.
          </motion.p>

          <Link
            to="/start"
            className="bg-secondary hover:bg-teal-600 text-white text-lg px-8 py-4 inline-flex items-center rounded-lg hover:scale-105 transition-transform transition-colors duration-300" // Updated: button styles
          >
            Vérifier mon éligibilité <ArrowRight size={20} className="ml-2 text-white" /> {/* Ensured icon is white */}
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-bg-primary"> {/* Updated: bg-bg-primary (white) */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4"> {/* Updated: badge colors */}
              FAQ
            </span>
            <h2 className="text-3xl font-bold mb-4 text-primary"> {/* Updated: text-primary (new blue) */}
              Questions fréquentes
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto"> {/* Updated: text-text-secondary */}
              Retrouvez les réponses aux questions les plus fréquemment posées
              sur les aides CEE et la rénovation énergétique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* FAQ Card 1 */}
            <div className="card bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"> {/* Ensured bg-white, rounded-lg, shadow-lg */}
              <div className="card-body p-6"> {/* Added padding to card-body for consistency */}
                <h3 className="text-lg font-bold mb-2 text-primary"> {/* Updated: text-primary (new blue) */}
                  Qu'est-ce que le dispositif CEE ?
                </h3>
                <p className="text-text-secondary leading-relaxed"> {/* Updated: text-text-secondary */}
                  Le dispositif des Certificats d'Économies d'Énergie (CEE)
                  oblige les fournisseurs d'énergie à promouvoir des actions
                  d'économies d'énergie. Ils financent ainsi des travaux de
                  rénovation énergétique pour les particuliers.
                </p>
              </div>
            </div>

            {/* FAQ Card 2 */}
            <div className="card bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"> {/* Ensured bg-white, rounded-lg, shadow-lg */}
              <div className="card-body p-6"> {/* Added padding to card-body for consistency */}
                <h3 className="text-lg font-bold mb-2 text-primary"> {/* Updated: text-primary (new blue) */}
                  Qui peut bénéficier des aides CEE ?
                </h3>
                <p className="text-text-secondary leading-relaxed"> {/* Updated: text-text-secondary */}
                  Tous les propriétaires et locataires peuvent bénéficier des
                  aides CEE, sans condition de ressources. Le montant varie
                  selon vos revenus et le type de travaux réalisés.
                </p>
              </div>
            </div>

            {/* FAQ Card 3 */}
            <div className="card bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"> {/* Ensured bg-white, rounded-lg, shadow-lg */}
              <div className="card-body p-6"> {/* Added padding to card-body for consistency */}
                <h3 className="text-lg font-bold mb-2 text-primary"> {/* Updated: text-primary (new blue) */}
                  Quels travaux sont éligibles aux CEE ?
                </h3>
                <p className="text-text-secondary leading-relaxed"> {/* Updated: text-text-secondary */}
                  Les travaux éligibles concernent principalement l'isolation
                  (combles, murs, sols), le chauffage (pompe à chaleur,
                  chaudière biomasse), les fenêtres et la ventilation.
                </p>
              </div>
            </div>

            {/* FAQ Card 4 */}
            <div className="card bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"> {/* Ensured bg-white, rounded-lg, shadow-lg */}
              <div className="card-body p-6"> {/* Added padding to card-body for consistency */}
                <h3 className="text-lg font-bold mb-2 text-primary"> {/* Updated: text-primary (new blue) */}
                  Comment sont versées les aides CEE ?
                </h3>
                <p className="text-text-secondary leading-relaxed"> {/* Updated: text-text-secondary */}
                  Les aides CEE peuvent être versées sous forme de prime
                  directe, de bon d'achat, ou être directement déduites de vos
                  factures de travaux selon l'organisme financeur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-16 bg-bg-secondary"> {/* Updated: bg-bg-secondary */}
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4"> {/* Updated: badge colors */}
            PARTENAIRES
          </span>
          <h2 className="text-3xl font-bold mb-8 text-primary"> {/* Updated: text-primary (new blue) */}
            Nos partenaires de confiance
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16"> {/* Existing styles are fine */}
            <div className="grayscale hover:grayscale-0 transition-all flex justify-center items-center">
              <img
                src="/logo-CEE.png"
                alt="Certificats d'économie d'énergie (CEE)"
                className="h-20 object-contain"
              />
            </div>

            <div className="grayscale hover:grayscale-0 transition-all flex justify-center items-center">
              <img
                src="/MaPrimeRenov.svg"
                alt="MaPrimeRenov"
                className="h-20 object-contain"
              />
            </div>

            <div className="grayscale hover:grayscale-0 transition-all flex justify-center items-center">
              <img
                src="/logo_rge_qualibat.svg"
                alt="RGE Qualibat"
                className="h-20 object-contain"
              />
            </div>

            <div hidden className="grayscale hover:grayscale-0 transition-all flex justify-center items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/fr/thumb/3/36/Logo_RGE.png/640px-Logo_RGE.png"
                alt="RGE"
                className="h-20 object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
