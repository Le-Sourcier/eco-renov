import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../context/ChatContext";
import { ArrowRight, Check } from "lucide-react";
import StatusQuestion from "./questions/StatusQuestion";
import HousingQuestion from "./questions/HousingQuestion";
import RenovationQuestion from "./questions/RenovationQuestion";
import IncomeQuestion from "./questions/IncomeQuestion";
import UserDataForm from "./UserDataForm";
import { useEligibilityStore } from "../stores/useEligibilityChecker";

const ChatBot: React.FC = () => {
  const {
    step,
    setStep,
    userStatus,
    housingType,
    renovationType,
    incomeLevel,
    setEligible,
  } = useChat();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { checkEligibility, isLoading } = useEligibilityStore();

  // Auto-scroll to the bottom when new content is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [step]);

  // Determine if the user can proceed to next step
  const canProceed = () => {
    switch (step) {
      case 1:
        return !!userStatus;
      case 2:
        return !!housingType;
      case 3:
        return !!renovationType;
      case 4:
        return !!incomeLevel;
      default:
        return false;
    }
  };

  const handleNextStep = async () => {
    if (canProceed()) {
      if (step === 4) {
        await checkEligibility({
          userStatus,
          housingType,
          renovationType,
          incomeLevel,
        })
          .then((response) => {
            if (response) {
              setEligible(response.isEligible);

              setStep(step + 1);
            } else {
              throw new Error("Error checking eligibility");
            }
          })
          .catch(() => {
            throw new Error("Error checking eligibility:");
          });
      } else {
        setStep(step + 1);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-primary text-white">
        <h3 className="text-xl font-bold">Assistant d'éligibilité</h3>
        <p className="text-sm opacity-80">
          Répondez à quelques questions pour découvrir vos aides
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between bg-gray-100 px-4 py-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`flex flex-col items-center ${
              s <= step ? "text-primary" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                ${
                  s < step
                    ? "bg-primary text-white"
                    : s === step
                    ? "border-2 border-primary text-primary"
                    : "border-2 border-gray-300 text-gray-400"
                }`}
            >
              {s < step ? <Check size={16} /> : s}
            </div>
            <span className="text-xs hidden sm:block">
              {s === 1
                ? "Statut"
                : s === 2
                ? "Logement"
                : s === 3
                ? "Travaux"
                : s === 4
                ? "Revenus"
                : "Contact"}
            </span>
          </div>
        ))}
      </div>

      <div ref={chatContainerRef} className="p-4 h-[400px] overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && <StatusQuestion />}
            {step === 2 && <HousingQuestion />}
            {step === 3 && <RenovationQuestion />}
            {step === 4 && <IncomeQuestion />}
            {step === 5 && <UserDataForm />}
          </motion.div>
        </AnimatePresence>
      </div>

      {step < 5 && (
        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Question {step}/4</span>
          </div>
          <button
            onClick={handleNextStep}
            disabled={!canProceed() || isLoading}
            className={`btn btn-primary ${
              !canProceed() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Continuer <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
