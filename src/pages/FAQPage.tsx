import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Search, Phone, Mail } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Qu'est-ce que le dispositif CEE ?",
    answer:
      "Le dispositif des Certificats d'Économies d'Énergie (CEE) est un programme national qui oblige les fournisseurs d'énergie à promouvoir des actions d'économies d'énergie auprès des consommateurs. Ils financent ainsi une partie des travaux de rénovation énergétique des particuliers.",
    category: "Général",
  },
  {
    id: 2,
    question: "Qui peut bénéficier des aides CEE ?",
    answer:
      "Tous les propriétaires et locataires peuvent bénéficier des aides CEE, sans condition de ressources. Le montant des aides varie selon vos revenus, le type de travaux réalisés et votre zone géographique.",
    category: "Éligibilité",
  },
  {
    id: 3,
    question: "Quels types de travaux sont éligibles aux CEE ?",
    answer:
      "Les travaux éligibles concernent principalement l'isolation (combles, murs, sols), le chauffage (pompe à chaleur, chaudière biomasse), les fenêtres et la ventilation. Les travaux doivent être réalisés par des professionnels certifiés RGE.",
    category: "Travaux",
  },
  {
    id: 4,
    question: "Comment sont versées les aides CEE ?",
    answer:
      "Les aides CEE peuvent être versées sous forme de prime directe, de bon d'achat, ou être directement déduites de vos factures de travaux selon l'organisme financeur.",
    category: "Financement",
  },
  {
    id: 5,
    question: "Peut-on cumuler les aides CEE avec d'autres dispositifs ?",
    answer:
      "Oui, les aides CEE sont cumulables avec d'autres dispositifs comme MaPrimeRénov', l'éco-PTZ ou les aides locales. Certaines conditions peuvent s'appliquer selon les dispositifs.",
    category: "Financement",
  },
];

const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

const FAQPage: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    document.title = "FAQ | Éco Subvention";
  }, []);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleQuestion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-6">Questions Fréquentes</h1>
            <p className="text-xl text-gray-200">
              Trouvez rapidement des réponses à vos questions sur les aides CEE
              et la rénovation énergétique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-control md:w-48"
              >
                <option value="">Toutes catégories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {filteredFaqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full text-left px-6 py-4 bg-white hover:bg-gray-50 transition-colors duration-300 flex justify-between items-center"
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    {activeId === faq.id ? (
                      <ChevronUp className="text-primary" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: activeId === faq.id ? "auto" : 0,
                      opacity: activeId === faq.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-gray-50 border-t">
                      <p className="text-gray-700">{faq.answer}</p>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary bg-opacity-10 rounded">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Aucun résultat trouvé pour votre recherche.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Vous avez encore des questions ?
            </h2>
            <p className="text-gray-600 mb-8">
              Notre équipe est disponible pour répondre à toutes vos questions
              sur les aides à la rénovation énergétique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33123456789" className="btn btn-primary">
                <Phone size={20} className="mr-2" />
                Nous appeler
              </a>
              <a href="mailto:contact@ecorenov.fr" className="btn btn-outline">
                <Mail size={20} className="mr-2" />
                Nous écrire
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
