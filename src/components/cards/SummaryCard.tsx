import React from "react";
import { Calendar, FileText, MapPin, Wrench } from "lucide-react";
import { useChat } from "../useChat";
// interface SummaryCardProps {
//   isReady: boolean;
// }

const SummaryCard: React.FC = () => {
  const { userData, housingType, renovationType, incomeLevel } = useChat();

  // Calculate example funding amounts based on user data
  const determineSubsidyAmounts = () => {
    // This is a simplified example - in a real app, these would be calculated from actual data
    let ceeAmount = 0;
    let maprimeAmount = 0;

    // Base amount by renovation type
    switch (renovationType) {
      case "chauffage":
        ceeAmount = 2500;
        maprimeAmount = 3000;
        break;
      case "isolation":
        ceeAmount = 3000;
        maprimeAmount = 2500;
        break;
      case "fenetres":
        ceeAmount = 1500;
        maprimeAmount = 1000;
        break;
      case "multiple":
        ceeAmount = 4500;
        maprimeAmount = 6000;
        break;
      default:
        ceeAmount = 2000;
        maprimeAmount = 2000;
    }

    // Adjust by income level
    switch (incomeLevel) {
      case "tres_modeste":
        maprimeAmount *= 1.5;
        break;
      case "modeste":
        maprimeAmount *= 1.2;
        break;
      case "intermediaire":
        maprimeAmount *= 0.8;
        break;
      case "superieur":
        maprimeAmount *= 0.5;
        break;
      default:
      // No adjustment
    }

    // Adjust by housing type
    if (housingType === "maison") {
      ceeAmount *= 1.2;
      maprimeAmount *= 1.1;
    }

    return {
      cee: Math.round(ceeAmount),
      maprime: Math.round(maprimeAmount),
      total: Math.round(ceeAmount + maprimeAmount),
    };
  };

  const subsidyAmounts = determineSubsidyAmounts();
  const isReady = 1 + 1 == 2;
  if (!isReady) {
    {
      /* Summary waiting message indicator */
    }
    return (
      <div>
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h3 className="font-bold text-green-800 mb-2">
            Estimation préliminaire de vos aides :
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Aides CEE</p>
              <p className="text-xl font-bold text-primary">
                {subsidyAmounts.cee} €
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">MaPrimeRénov'</p>
              <p className="text-xl font-bold text-primary">
                {subsidyAmounts.maprime} €
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-green-600">
                {subsidyAmounts.total} €
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Calendar size={20} className="text-primary mr-2" />
            <div>
              <p className="text-sm text-gray-500">Date d'estimation</p>
              <p className="font-medium">
                {new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin size={20} className="text-primary mr-2" />
            <div>
              <p className="text-sm text-gray-500">Code postal</p>
              <p className="font-medium">{userData?.postalCode}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FileText size={20} className="text-primary mr-2" />
            <div>
              <p className="text-sm text-gray-500">Type de logement</p>
              <p className="font-medium capitalize">{housingType}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Wrench size={20} className="text-primary mr-2" />
            <div>
              <p className="text-sm text-gray-500">Type de travaux</p>
              <p className="font-medium capitalize">
                {renovationType === "chauffage"
                  ? "Chauffage"
                  : renovationType === "isolation"
                  ? "Isolation"
                  : renovationType === "fenetres"
                  ? "Fenêtres"
                  : "Rénovation globale"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-red-100 p-6 rounded-lg mb-4">
        <h3 className="font-bold text-primary mb-3">
          Analyse détaillée en cours de traitement
        </h3>
        <p className="text-gray-700 mb-4">
          Votre demande pour le projet de {renovationType} est en cours de
          traitement pat nos analystes expert. Merci de votre patience, cela
          garantit des estimations fiables et personnalisées.
        </p>
      </div>
    </div>
  );

  {
    /* Summary results */
  }
};

export default SummaryCard;
