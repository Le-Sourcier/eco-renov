import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ChatBot from "../components/chatbot/ChatBot";

const EligibilityPage: React.FC = () => {
  useEffect(() => {
    document.title = "Vérifier mon éligibilité | ÉcoRénov";
  }, []);

  return (
    <div className="">
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 mb-10 lg:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Découvrez vos aides
                <br />
                <span className="text-secondary">en quelques clics</span>
              </h1>

              <p className="text-lg mb-8 opacity-90">
                Répondez à quelques questions simples pour connaître les aides
                auxquelles vous avez droit pour vos travaux de rénovation
                énergétique.
              </p>
            </motion.div>

            <div className="lg:w-1/2 lg:pl-12">
              <ChatBot />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EligibilityPage;
