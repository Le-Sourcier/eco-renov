import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <p className="text-sm text-gray-300">
        Nous utilisons des cookies pour améliorer votre expérience sur notre
        site. En continuant, vous acceptez notre utilisation des cookies. Vous
        pouvez consulter notre{" "}
        <Link
          to="/privacy"
          className="underline hover:text-gray-100 transition-colors duration-200"
        >
          politique de confidentialité
        </Link>{" "}
        pour en savoir plus.
      </p>
      <div className="flex space-x-3 flex-shrink-0">
        <button
          onClick={handleAccept}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Accepter
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Refuser
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
