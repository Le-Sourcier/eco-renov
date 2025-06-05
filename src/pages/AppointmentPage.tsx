import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEligibilityStore } from "../components/stores/useEligibilityChecker";

const AppointmentPage: React.FC = () => {
  const { user } = useEligibilityStore();
  useEffect(() => {
    document.title = "Prendre rendez-vous | Éco Subvention";
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    date: "",
    time: "",
    projectType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        postalCode: "",
        date: "",
        time: "",
        projectType: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="pt-16">
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Prenez rendez-vous avec un conseiller
            </h1>
            <p className="text-lg text-gray-200">
              Discutez de votre projet avec l'un de nos experts en rénovation
              énergétique
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-600 mb-2">
                    Rendez-vous confirmé !
                  </h2>
                  <p className="text-gray-600">
                    Nous vous avons envoyé un email de confirmation avec tous
                    les détails.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="form-control pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="form-control pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="form-control pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="form-control pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Code postal
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              postalCode: e.target.value,
                            })
                          }
                          className="form-control pl-10"
                          required
                          pattern="[0-9]{5}"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type de projet
                      </label>
                      <div className="relative">
                        <FileText
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <select
                          value={formData.projectType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              projectType: e.target.value,
                            })
                          }
                          className="form-control pl-10"
                          required
                        >
                          <option value="">Sélectionnez un type</option>
                          <option value="chauffage">Chauffage</option>
                          <option value="isolation">Isolation</option>
                          <option value="fenetres">Fenêtres</option>
                          <option value="multiple">Plusieurs travaux</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date souhaitée
                      </label>
                      <div className="relative">
                        <Calendar
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className="form-control pl-10"
                          required
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Horaire préféré
                      </label>
                      <div className="relative">
                        <Clock
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <select
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                          }
                          className="form-control pl-10"
                          required
                        >
                          <option value="">Sélectionnez un horaire</option>
                          {availableTimes.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (optionnel)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="form-control h-32"
                      placeholder="Décrivez brièvement votre projet..."
                    ></textarea>
                  </div>

                  <div className="flex items-start mb-4">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-1"
                      required
                    />
                    <label
                      htmlFor="privacy"
                      className="ml-2 text-sm text-gray-600"
                    >
                      J'accepte que mes données soient utilisées pour le
                      traitement de ma demande de rendez-vous, conformément à la{" "}
                      <Link
                        to="/privacy"
                        className="text-primary hover:underline"
                      >
                        politique de confidentialité
                      </Link>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary w-full flex items-center justify-center ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Traitement en cours...
                      </>
                    ) : (
                      "Confirmer le rendez-vous"
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-bold text-primary mb-6">
                Informations importantes
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">
                    Déroulement du rendez-vous
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Durée moyenne : 30-45 minutes</li>
                    <li>• Discussion de vos besoins et objectifs</li>
                    <li>• Analyse préliminaire de votre éligibilité</li>
                    <li>• Présentation des solutions adaptées</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700 mb-2">
                    Documents utiles
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Avis d'imposition récent</li>
                    <li>• Factures d'énergie</li>
                    <li>• Photos du logement (si disponibles)</li>
                    <li>• Devis existants (si disponibles)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentPage;
