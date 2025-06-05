import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cookie } from "lucide-react";

interface CookiePreferences {
  necessary: boolean; // Always true once consent is given in any form
  analytics: boolean;
  marketing: boolean;
  consented: boolean; // Has the user made a choice regarding analytics/marketing?
}

const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false); // Default to false, will be set by delay logic if no consent
  const [analyticsAccepted, setAnalyticsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    const storedConsentState = localStorage.getItem("cookieConsentState");

    if (storedConsentState) {
      try {
        const preferences: CookiePreferences = JSON.parse(storedConsentState);
        if (preferences.consented) {
          setShowBanner(false);
          setAnalyticsAccepted(preferences.analytics);
          setMarketingAccepted(preferences.marketing);
          return; // User has already consented, do nothing further to show banner
        }
      } catch (error) {
        console.error("Error parsing cookie consent state:", error);
        // Fall through to timer logic if state is malformed
      }
    }

    // If no prior valid consent or error, set a timer to show the banner
    timerId = setTimeout(() => {
      setShowBanner(true);
    }, 2000);

    return () => {
      clearTimeout(timerId); // Cleanup timeout if component unmounts
    };
  }, []);

  const handleAcceptAll = () => {
    const preferencesToSave: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      consented: true,
    };
    localStorage.setItem(
      "cookieConsentState",
      JSON.stringify(preferencesToSave)
    );
    setAnalyticsAccepted(true);
    setMarketingAccepted(true);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const preferencesToSave: CookiePreferences = {
      necessary: true,
      analytics: analyticsAccepted,
      marketing: marketingAccepted,
      consented: true,
    };
    localStorage.setItem(
      "cookieConsentState",
      JSON.stringify(preferencesToSave)
    );
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  // JSX structure is kept for now, but buttons will call non-existent handlers
  // This will be updated in subsequent subtasks.
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-4 left-4 right-4 bg-bg-primary text-text-primary p-6 shadow-2xl z-[100] max-h-[70vh] overflow-y-auto rounded-lg md:bottom-4 md:left-4 md:right-auto md:max-w-md md:max-h-[80vh]"
    >
      {/* Removed inner container mx-auto. Padding is handled by the parent. */}
      <div className="flex items-center mb-4">
        <Cookie size={28} className="text-primary mr-3 flex-shrink-0" />
        <h2 className="text-xl font-semibold text-primary">
          Gestion des cookies
        </h2>
      </div>

      <p className="text-text-secondary text-sm mb-4">
        Nous utilisons des cookies pour améliorer votre expérience sur notre
        site. Vous pouvez choisir les types de cookies que vous autorisez. Pour
        en savoir plus, consultez notre{" "}
        <Link to="/privacy" className="text-secondary hover:underline">
          politique de confidentialité
        </Link>
        .
      </p>

      <div className="space-y-3 mb-6">
        {" "}
        {/* Adjusted space-y for tighter packing if needed */}
        {/* Nécessaires */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="cookies-necessary"
            className="form-checkbox h-5 w-5 text-secondary accent-secondary rounded border-neutral-300 focus:ring-secondary focus:ring-offset-0 mt-0.5"
            checked={true}
            disabled
          />
          <div>
            <label
              htmlFor="cookies-necessary"
              className="font-medium text-text-primary text-sm cursor-pointer"
            >
              Nécessaires
            </label>
            <p className="text-xs text-text-secondary mt-1">
              Ces cookies sont essentiels au fonctionnement du site et ne
              peuvent pas être désactivés.
            </p>
          </div>
        </div>
        {/* Analytiques */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="cookies-analytics"
            className="form-checkbox h-5 w-5 text-secondary accent-secondary rounded border-neutral-300 focus:ring-secondary focus:ring-offset-0 mt-0.5"
            checked={analyticsAccepted}
            onChange={() => setAnalyticsAccepted(!analyticsAccepted)}
          />
          <div>
            <label
              htmlFor="cookies-analytics"
              className="font-medium text-text-primary text-sm cursor-pointer"
            >
              Analytiques
            </label>
            <p className="text-xs text-text-secondary mt-1">
              Ces cookies nous aident à comprendre comment les visiteurs
              interagissent avec le site.
            </p>
          </div>
        </div>
        {/* Marketing */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="cookies-marketing"
            className="form-checkbox h-5 w-5 text-secondary accent-secondary rounded border-neutral-300 focus:ring-secondary focus:ring-offset-0 mt-0.5"
            checked={marketingAccepted}
            onChange={() => setMarketingAccepted(!marketingAccepted)}
          />
          <div>
            <label
              htmlFor="cookies-marketing"
              className="font-medium text-text-primary text-sm cursor-pointer"
            >
              Marketing
            </label>
            <p className="text-xs text-text-secondary mt-1">
              Ces cookies sont utilisés pour suivre les visiteurs et afficher
              des publicités pertinentes.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
        <button
          onClick={handleSavePreferences}
          className="px-4 py-2 bg-primary hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white rounded-lg text-sm font-medium w-full sm:w-auto"
        >
          Sauvegarder mes préférences
        </button>
        <button
          onClick={handleAcceptAll}
          className="px-4 py-2 bg-secondary hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 text-white rounded-lg text-sm font-medium w-full sm:w-auto"
        >
          Tout accepter
        </button>
      </div>
    </motion.div>
  );
};

export default CookieConsentBanner;
