import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = "Politique de Confidentialité | Éco Subvention";
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Politique de Confidentialité
        </h1>

        <div className="prose prose-sm">
          <p className="mb-4">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            1. Introduction
          </h2>
          <p className="mb-4">
            Éco Subvention s'engage à protéger votre vie privée. Cette politique
            de confidentialité explique comment nous collectons, utilisons et
            protégeons vos données personnelles lorsque vous utilisez notre
            service d'éligibilité aux aides CEE.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            2. Données collectées
          </h2>
          <p className="mb-2">Nous collectons les informations suivantes :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Informations de contact (nom, prénom, adresse email, numéro de
              téléphone)
            </li>
            <li>Adresse et code postal</li>
            <li>Type de logement et statut d'occupation</li>
            <li>Informations sur vos projets de rénovation énergétique</li>
            <li>Niveau de revenus (tranche fiscale)</li>
          </ul>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            3. Utilisation des données
          </h2>
          <p className="mb-2">Vos données personnelles sont utilisées pour :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Vérifier votre éligibilité aux aides à la rénovation énergétique
            </li>
            <li>Générer un rapport personnalisé avec les aides disponibles</li>
            <li>Vous mettre en relation avec des artisans RGE qualifiés</li>
            <li>Vous contacter pour le suivi de votre dossier</li>
            <li>
              Améliorer nos services et réaliser des statistiques anonymisées
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            4. Partage des données
          </h2>
          <p className="mb-4">Vos données peuvent être partagées avec :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Nos partenaires artisans RGE pour la réalisation des travaux
            </li>
            <li>
              Les organismes financeurs des aides (uniquement avec votre
              consentement explicite)
            </li>
          </ul>
          <p className="mb-4">
            Nous ne vendons jamais vos données à des tiers à des fins
            commerciales.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            5. Conservation des données
          </h2>
          <p className="mb-4">
            Nous conservons vos données pendant une durée de 3 ans à compter de
            votre dernière interaction avec nos services, ou jusqu'à ce que vous
            demandiez leur suppression.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            6. Vos droits
          </h2>
          <p className="mb-2">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l'effacement de vos données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d'opposition au traitement de vos données</li>
          </ul>
          <p className="mb-4">
            Pour exercer ces droits, contactez-nous à{" "}
            <a
              href="mailto:privacy@ecosubvention.fr"
              className="text-primary hover:underline"
            >
              privacy@ecosubvention.fr
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            7. Sécurité
          </h2>
          <p className="mb-4">
            Nous mettons en œuvre des mesures de sécurité appropriées pour
            protéger vos données contre tout accès, modification, divulgation ou
            destruction non autorisés.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            8. Cookies
          </h2>
          <p className="mb-4">
            Notre site utilise des cookies pour améliorer votre expérience. Vous
            pouvez configurer votre navigateur pour refuser tous les cookies ou
            pour être averti lorsqu'un cookie est envoyé.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            9. Modifications
          </h2>
          <p className="mb-4">
            Nous pouvons modifier cette politique de confidentialité à tout
            moment. Les modifications entrent en vigueur dès leur publication
            sur cette page.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            10. Contact
          </h2>
          <p className="mb-4">
            Pour toute question concernant cette politique, contactez notre
            Délégué à la Protection des Données à{" "}
            <a
              href="mailto:dpo@ecosubvention.fr"
              className="text-primary hover:underline"
            >
              dpo@ecosubvention.fr
            </a>
            .
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="btn btn-outline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
