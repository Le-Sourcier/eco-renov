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
    document.title = "Tableau de bord | Éco Subvention";
  }, []);

  // Helper function to get new status styles
  const getNewStatusStyles = (statusKey: keyof typeof statusInfo) => {
    switch (statusKey) {
      case "pending":
        return { color: "text-amber-600", bgColor: "bg-amber-100", borderColor: "border-amber-400", label: statusInfo.pending.label, icon: statusInfo.pending.icon };
      case "in_progress":
        return { color: "text-sky-600", bgColor: "bg-sky-100", borderColor: "border-sky-400", label: statusInfo.in_progress.label, icon: statusInfo.in_progress.icon };
      case "completed":
        return { color: "text-emerald-600", bgColor: "bg-emerald-100", borderColor: "border-emerald-400", label: statusInfo.completed.label, icon: statusInfo.completed.icon };
      case "cancelled":
        return { color: "text-rose-600", bgColor: "bg-rose-100", borderColor: "border-rose-400", label: statusInfo.cancelled.label, icon: statusInfo.cancelled.icon };
      default: // Should not happen
        return { color: "text-gray-600", bgColor: "bg-gray-100", borderColor: "border-gray-400", label: "Inconnu", icon: HelpCircle };
    }
  };

  return (
    <div> {/* Removed pt- typo */}
      <section className="bg-primary text-white py-16"> {/* Updated padding */}
        <div className="container mx-auto px-4"> {/* Removed pt-20 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl font-bold mb-2 text-white"> {/* Ensured text-white */}
              Bonjour, {userData?.firstName}
            </h1>
            <p className="text-neutral-200"> {/* Updated text color */}
              Suivez l'avancement de vos demandes d'analyse
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-bg-secondary"> {/* Added bg-bg-secondary */}
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {analysisRequests.length > 0 ? (
              <div className="space-y-6">
                {analysisRequests.map((request) => {
                  const currentStatusStyles = getNewStatusStyles(request.status as keyof typeof statusInfo);
                  const StatusIcon = currentStatusStyles.icon;

                  return (
                    <motion.div
                      onClick={() => navigator("/report/details/" + request.id)}
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-bg-primary rounded-lg shadow-lg p-6 border ${currentStatusStyles.borderColor}`} // Updated card styles
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div
                            className={`p-2 rounded-full ${currentStatusStyles.bgColor} mr-4`} // Updated icon bg color
                          >
                            <StatusIcon className={`h-6 w-6 ${currentStatusStyles.color}`} /> {/* Updated icon color */}
                          </div>
                          <div>
                            <h3 className="text-text-primary font-bold text-lg"> {/* Updated text color */}
                              Demande #{request.id}
                            </h3>
                            <p className="text-text-secondary text-sm"> {/* Updated text color */}
                              Créée le{" "}
                              {request.createdAt.toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${currentStatusStyles.bgColor} ${currentStatusStyles.color}`} // Updated status label styles
                        >
                          {currentStatusStyles.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-text-secondary text-sm font-medium"> {/* Updated text color */}
                            Type de travaux
                          </h4>
                          <p className="text-text-primary capitalize">{request.type}</p> {/* Updated text color */}
                        </div>
                        <div>
                          <h4 className="text-text-secondary text-sm font-medium"> {/* Updated text color */}
                            Contact
                          </h4>
                          <p className="text-text-primary">{request.userData.email}</p> {/* Updated text color */}
                        </div>
                      </div>

                      {request.notes && (
                        <div className="bg-neutral-100 rounded-lg p-4 mt-4"> {/* Updated notes section styles */}
                          <h4 className="text-text-primary font-medium mb-2">Notes</h4> {/* Updated text color */}
                          <p className="text-text-secondary">{request.notes}</p> {/* Updated text color */}
                        </div>
                      )}

                      {request.status === "completed" && (
                        <div className="mt-4">
                          <Link
                            to={`/report/${request.id}`}
                            className="inline-flex items-center justify-center w-full bg-secondary hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors" // Updated button styles
                          >
                            Voir l'analyse détaillée
                            <ArrowRight size={20} className="ml-2 text-white" /> {/* Ensured icon color */}
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="text-neutral-400 mx-auto mb-4 h-16 w-16" /> {/* Updated icon color */}
                <h2 className="text-text-primary text-xl font-bold mb-2"> {/* Updated text color */}
                  Aucune demande d'analyse
                </h2>
                <p className="text-text-secondary mb-6"> {/* Updated text color */}
                  Vous n'avez pas encore fait de demande d'analyse pour vos
                  travaux de rénovation.
                </p>
                <Link
                  to="/start"
                  className="inline-flex items-center bg-secondary hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors" // Updated button styles
                >
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
