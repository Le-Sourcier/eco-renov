import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Clock, Target } from "lucide-react";

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "À propos | ÉcoRénov";
  }, []);

  return (
    <div className="">
      {/* Hero Section */}
      <section id="mission" className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-6">Notre Mission</h1>
            <p className="text-xl mb-8 text-gray-200">
              Faciliter l'accès aux aides à la rénovation énergétique pour tous
              les Français et accélérer la transition écologique de l'habitat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                Nous nous engageons à fournir un service de la plus haute
                qualité à nos clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Accessibilité</h3>
              <p className="text-gray-600">
                Nous rendons les aides accessibles à tous, sans distinction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Réactivité</h3>
              <p className="text-gray-600">
                Nous traitons chaque demande avec rapidité et efficacité.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Impact</h3>
              <p className="text-gray-600">
                Nous contribuons activement à la réduction de l'empreinte
                carbone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Notre Équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                alt="Marie Laurent"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Marie Laurent</h3>
                <p className="text-gray-600 mb-2">Directrice Générale</p>
                <p className="text-sm text-gray-500">
                  10 ans d'expérience dans la rénovation énergétique
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
                alt="Thomas Dubois"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Thomas Dubois</h3>
                <p className="text-gray-600 mb-2">Responsable Technique</p>
                <p className="text-sm text-gray-500">
                  Expert en solutions de chauffage écologique
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg"
                alt="Sophie Martin"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Sophie Martin</h3>
                <p className="text-gray-600 mb-2">
                  Responsable Relations Clients
                </p>
                <p className="text-sm text-gray-500">
                  Spécialiste en accompagnement personnalisé
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Prêt à commencer votre projet de rénovation ?
            </h2>
            <p className="text-lg mb-8 text-gray-200">
              Découvrez les aides auxquelles vous avez droit et commencez votre
              transformation énergétique dès aujourd'hui.
            </p>
            <button className="btn btn-secondary text-lg px-8 py-4 flex items-center mx-auto">
              Vérifier mon éligibilité <ArrowRight size={20} className="ml-2" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
