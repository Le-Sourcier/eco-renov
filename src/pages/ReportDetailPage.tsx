import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Download, Printer, Share2, CheckCircle2 } from "lucide-react";
import SummaryCard from "../components/cards/SummaryCard";
import { useChat } from "../components/useChat";
import LoadingSpinner from "../components/ui/loadingSpinner";

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userData } = useChat();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Votre Rapport Personnalisé | Éco Subvention";
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const localContractors = [
    {
      id: 1,
      name: "Éco-Habitat Solutions",
      specialties: ["Isolation", "Chauffage"],
      phone: "01 23 45 67 89",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Renov'Energie",
      specialties: ["Pompe à chaleur", "Fenêtres"],
      phone: "01 98 76 54 32",
      rating: 4.9,
      reviews: 86,
    },
    {
      id: 3,
      name: "Thermo Concept",
      specialties: ["Chauffage", "Ventilation"],
      phone: "01 45 67 89 12",
      rating: 4.7,
      reviews: 93,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Votre Rapport d'Éligibilité Personnalisé
        </h1>
        <p className="text-gray-600">
          Référence: ECO-{id}-{new Date().getFullYear()}
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 bg-gray-100 rounded-full p-1">
          <button className="flex items-center space-x-1 px-4 py-2 rounded-full bg-white shadow-sm">
            <Download size={16} />
            <span>Télécharger</span>
          </button>
          <button className="flex items-center space-x-1 px-4 py-2 rounded-full hover:bg-white hover:shadow-sm transition-all">
            <Printer size={16} />
            <span>Imprimer</span>
          </button>
          <button className="flex items-center space-x-1 px-4 py-2 rounded-full hover:bg-white hover:shadow-sm transition-all">
            <Share2 size={16} />
            <span>Partager</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <CheckCircle2 size={24} className="text-green-500 mr-2" />
              <h2 className="text-xl font-bold">
                Félicitations, {userData?.firstName} !
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              Selon les informations que vous nous avez fournies, vous pourriez
              être éligible aux aides CEE et MaPrimeRénov' pour votre projet de
              rénovation énergétique.
            </p>

            <SummaryCard />

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 italic">
                * Cette estimation est donnée à titre indicatif et sera affinée
                lors de l'étude détaillée de votre projet avec l'un de nos
                conseillers.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Prochaines étapes</h2>

            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <div>
                  <h3 className="font-bold">Un conseiller vous contacte</h3>
                  <p className="text-gray-600">
                    Dans les 24h, un conseiller vous appellera pour discuter de
                    votre projet et affiner l'estimation de vos aides.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">
                  2
                </div>
                <div>
                  <h3 className="font-bold">Visite technique à domicile</h3>
                  <p className="text-gray-600">
                    Un artisan RGE se déplace chez vous pour réaliser un
                    diagnostic précis et établir un devis.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">
                  3
                </div>
                <div>
                  <h3 className="font-bold">
                    Constitution de votre dossier d'aides
                  </h3>
                  <p className="text-gray-600">
                    Nous nous occupons de toutes les démarches administratives
                    pour obtenir vos aides CEE et MaPrimeRénov'.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">
                  4
                </div>
                <div>
                  <h3 className="font-bold">Réalisation des travaux</h3>
                  <p className="text-gray-600">
                    Les travaux sont réalisés par un artisan certifié RGE, avec
                    un suivi de chantier assuré par nos équipes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/appointment" className="btn btn-primary w-full">
                Prendre rendez-vous avec un conseiller
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              Artisans RGE près de chez vous
            </h2>

            <div className="space-y-4">
              {localContractors.map((contractor) => (
                <div
                  key={contractor.id}
                  className="border-b pb-4 last:border-0 last:pb-0"
                >
                  <h3 className="font-bold">{contractor.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="font-medium text-amber-500 mr-1">
                      {contractor.rating}
                    </span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(contractor.rating)
                              ? "text-amber-500"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1">({contractor.reviews} avis)</span>
                  </div>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Spécialités :</span>
                    {contractor.specialties.join(", ")}
                  </p>
                  <a
                    href={`tel:${contractor.phone}`}
                    className="text-secondary font-medium hover:underline"
                  >
                    {contractor.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500 italic">
                Ces artisans sont certifiés RGE et ont été vérifiés par nos
                équipes.
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Documents à préparer</h2>

            <div className="space-y-3">
              <div className="flex items-start">
                <input type="checkbox" id="doc1" className="mt-1 mr-2" />
                <label htmlFor="doc1" className="cursor-pointer">
                  <span className="font-medium block">
                    Avis d'imposition 2023
                  </span>
                  <span className="text-sm text-gray-600">
                    Pour vérifier votre éligibilité à MaPrimeRénov'
                  </span>
                </label>
              </div>

              <div className="flex items-start">
                <input type="checkbox" id="doc2" className="mt-1 mr-2" />
                <label htmlFor="doc2" className="cursor-pointer">
                  <span className="font-medium block">
                    Facture d'énergie récente
                  </span>
                  <span className="text-sm text-gray-600">
                    Pour évaluer vos économies potentielles
                  </span>
                </label>
              </div>

              <div className="flex items-start">
                <input type="checkbox" id="doc3" className="mt-1 mr-2" />
                <label htmlFor="doc3" className="cursor-pointer">
                  <span className="font-medium block">
                    Justificatif de propriété
                  </span>
                  <span className="text-sm text-gray-600">
                    Taxe foncière ou acte de propriété
                  </span>
                </label>
              </div>

              <div className="flex items-start">
                <input type="checkbox" id="doc4" className="mt-1 mr-2" />
                <label htmlFor="doc4" className="cursor-pointer">
                  <span className="font-medium block">
                    Devis antérieurs (si disponibles)
                  </span>
                  <span className="text-sm text-gray-600">
                    Pour comparer les offres
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
