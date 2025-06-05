import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Mail,
  Key,
  ArrowRight,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { VerificationType } from "../types";
import { useChat } from "../components/useChat";

const AccessRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { verifyAccess, sendOTP, verifyOTP } = useChat();
  const [verificationType, setVerificationType] =
    useState<VerificationType>("reference");
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = "Accéder à mes demandes | Éco Subvention";
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await sendOTP(email);
      setOtpSent(true);
    } catch {
      setError("Une erreur est survenue lors de l'envoi du code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const verified = await verifyOTP(email, otp);
      if (verified) {
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError("Code incorrect. Veuillez réessayer.");
      }
    } catch {
      setError("Une erreur est survenue lors de la vérification.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReferenceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const verified = await verifyAccess(reference);
      if (verified) {
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError("Référence invalide. Veuillez vérifier et réessayer.");
      }
    } catch {
      setError("Une erreur est survenue lors de la vérification.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Accès vérifié !
          </h2>
          <p className="text-gray-600">
            Redirection vers votre tableau de bord...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt">
      <section className="bg-primary text-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Accéder à mes demandes
            </h1>
            <p className="text-lg text-gray-200">
              Consultez l'état d'avancement de vos demandes d'analyse
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => setVerificationType("reference")}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    verificationType === "reference"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Key size={20} className="mr-2" />
                  Référence
                </button>
                <button
                  onClick={() => setVerificationType("email")}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    verificationType === "email"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Mail size={20} className="mr-2" />
                  Email
                </button>
              </div>

              {verificationType === "reference" ? (
                <form onSubmit={handleReferenceSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro de référence
                    </label>
                    <input
                      type="text"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="form-control"
                      placeholder="Ex: ECO-123-2024"
                      required
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Accéder
                        <ArrowRight size={20} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              ) : otpSent ? (
                <form onSubmit={handleOTPSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Code de vérification
                    </label>
                    <input
                      type="text"
                      name="otp"
                      autoComplete="one-time-code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="form-control"
                      placeholder="Entrez le code reçu par email"
                      required
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Vérifier
                        <ArrowRight size={20} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Entrez votre email"
                      required
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Recevoir le code
                        <ArrowRight size={20} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    Comment accéder à mes demandes ?
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Vous pouvez accéder à vos demandes soit en utilisant le
                    numéro de référence qui vous a été envoyé par email, soit en
                    vérifiant votre adresse email avec un code à usage unique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccessRequestsPage;
