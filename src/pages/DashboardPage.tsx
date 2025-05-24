import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useChat } from "../components/useChat";

const statusInfo = {
  pending: {
    label: "En attente",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  in_progress: {
    label: "En cours d'analyse",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  completed: {
    label: "Analyse terminée",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  cancelled: {
    label: "Annulée",
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
};

const DashboardPage: React.FC = () => {
  const { analysisRequests, userData } = useChat();
  const navigator = useNavigate();

  useEffect(() => {
    document.title = "Tableau de bord | ÉcoRénov";
  }, []);

  return (
    <div className="pt-16">
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl font-bold mb-2">
              Bonjour, {userData.firstName}
            </h1>
            <p className="text-gray-200">
              Suivez l'avancement de vos demandes d'analyse
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {analysisRequests.length > 0 ? (
              <div className="space-y-6">
                {analysisRequests.map((request) => {
                  const status = statusInfo[request.status];
                  const StatusIcon = status.icon;

                  return (
                    <motion.div
                      onClick={() => navigator("/report/details/" + request.id)}
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-white rounded-lg shadow-md p-6 border ${status.borderColor}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div
                            className={`p-2 rounded-full ${status.bgColor} mr-4`}
                          >
                            <StatusIcon className={`h-6 w-6 ${status.color}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">
                              Demande #{request.id}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Créée le{" "}
                              {request.createdAt.toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${status.bgColor} ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Type de travaux
                          </h4>
                          <p className="capitalize">{request.type}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Contact
                          </h4>
                          <p>{request.userData.email}</p>
                        </div>
                      </div>

                      {request.notes && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-2">Notes</h4>
                          <p className="text-gray-600">{request.notes}</p>
                        </div>
                      )}

                      {request.status === "completed" && (
                        <div className="mt-4">
                          <Link
                            to={`/report/${request.id}`}
                            className="btn btn-primary w-full flex items-center justify-center"
                          >
                            Voir l'analyse détaillée
                            <ArrowRight size={20} className="ml-2" />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  Aucune demande d'analyse
                </h2>
                <p className="text-gray-500 mb-6">
                  Vous n'avez pas encore fait de demande d'analyse pour vos
                  travaux de rénovation.
                </p>
                <Link to="/start" className="btn btn-primary">
                  Commencer une nouvelle demande
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
