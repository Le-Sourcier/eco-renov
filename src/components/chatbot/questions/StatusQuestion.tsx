import React from "react";
import { motion } from "framer-motion";
import { useChat } from "../../context/ChatContext";
import { Home, Building } from "lucide-react";

const StatusQuestion: React.FC = () => {
  const { userStatus, setUserStatus } = useChat();

  return (
    <div className="chat-question">
      <motion.h3
        className="text-lg font-semibold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Quel est votre statut d'occupation ?
      </motion.h3>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setUserStatus("proprietaire")}
          className={`flex items-center p-4 border-2 rounded-lg transition-all ${
            userStatus === "proprietaire"
              ? "border-primary bg-primary bg-opacity-10"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Home
            size={24}
            className={`mr-3 ${
              userStatus === "proprietaire" ? "text-primary" : "text-gray-500"
            }`}
          />
          <div className="text-left">
            <h4 className="font-medium">Propriétaire</h4>
            <p className="text-sm text-gray-600">
              J'habite dans mon logement ou je le mets en location
            </p>
          </div>
        </button>

        <button
          onClick={() => setUserStatus("locataire")}
          className={`flex items-center p-4 border-2 rounded-lg transition-all ${
            userStatus === "locataire"
              ? "border-primary bg-primary bg-opacity-10"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Building
            size={24}
            className={`mr-3 ${
              userStatus === "locataire" ? "text-primary" : "text-gray-500"
            }`}
          />
          <div className="text-left">
            <h4 className="font-medium">Locataire</h4>
            <p className="text-sm text-gray-600">
              Je loue mon logement à un propriétaire
            </p>
          </div>
        </button>
      </motion.div>

      <motion.p
        className="mt-4 text-sm text-gray-500 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Votre statut d'occupation détermine les aides auxquelles vous pouvez
        prétendre.
      </motion.p>
    </div>
  );
};

export default StatusQuestion;
