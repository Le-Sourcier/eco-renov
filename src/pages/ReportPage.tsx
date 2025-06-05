import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useChat } from "../components/useChat";

const ReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    userData,
    housingType,
    renovationType,
    createAnalysisRequest,
    analysisRequests,
  } = useChat();

  const [loading, setLoading] = useState(true);
  const [requestId, setRequestId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Votre Rapport Personnalisé | Éco Subvention";
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAnalysisRequest = () => {
    const newRequestId = createAnalysisRequest();
    setRequestId(newRequestId);
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-primary">
            Chargement de votre rapport personnalisé...
          </h2>
        </div>
      </div>
    );
  }

  const currentRequest = requestId
    ? analysisRequests.find((req) => req.id === requestId)
    : null;

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

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <CheckCircle2 size={32} className="text-primary mr-3" />
            <div>
              <h2 className="text-2xl font-bold">
                Félicitations, {userData?.firstName} !
              </h2>
              <p className="text-gray-600">
                Votre dossier est éligible pour une analyse détaillée.
              </p>
            </div>
          </div>

          {currentRequest ? (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-primary mb-3">
                Demande d'analyse en cours
              </h3>
              <p className="text-gray-700 mb-4">
                Votre demande a été enregistrée avec succès. Vous allez être
                redirigé vers votre tableau de bord pour suivre l'avancement de
                votre dossier.
              </p>
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin h-6 w-6 text-primary" />
                <span className="ml-2 text-gray-600">
                  Redirection en cours...
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-2">Type de logement</h3>
                  <p className="text-gray-700 capitalize">{housingType}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-2">Type de travaux</h3>
                  <p className="text-gray-700 capitalize">{renovationType}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-bold text-lg mb-4">Prochaines étapes</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold">
                        Analyse détaillée de votre projet
                      </h4>
                      <p className="text-gray-600">
                        Un expert analysera votre dossier pour déterminer
                        précisément les aides auxquelles vous avez droit.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold">Estimation personnalisée</h4>
                      <p className="text-gray-600">
                        Vous recevrez une estimation détaillée des aides
                        disponibles pour votre projet.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold">Accompagnement personnalisé</h4>
                      <p className="text-gray-600">
                        Un conseiller vous accompagnera dans toutes les étapes
                        de votre projet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAnalysisRequest}
                className="btn btn-primary w-full mt-6 flex items-center justify-center"
              >
                Demander une analyse détaillée
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
