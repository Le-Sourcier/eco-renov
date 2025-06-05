import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Conditions d'utilisation | Éco Subvention";
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Conditions d'utilisation
        </h1>

        <div className="prose prose-sm">
          <p className="mb-4">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            1. Acceptation des conditions
          </h2>
          <p className="mb-4">
            En accédant et en utilisant le site Éco Subvention, vous acceptez
            d'être lié par ces conditions d'utilisation, toutes les lois et
            réglementations applicables, et acceptez que vous êtes responsable
            du respect des lois locales applicables.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            2. Utilisation de la licence
          </h2>
          <p className="mb-4">
            La permission d'utiliser les documents du site Éco Subvention est
            accordée, à condition que :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              L'utilisation de ces documents est à des fins personnelles et non
              commerciales
            </li>
            <li>
              Toute copie de ces documents doit conserver tous les droits
              d'auteur
            </li>
            <li>Vous n'êtes pas autorisé à modifier ou copier les documents</li>
          </ul>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            3. Clause de non-responsabilité
          </h2>
          <p className="mb-4">
            Les documents sur le site Éco Subvention sont fournis "tels quels".
            Éco Subvention ne donne aucune garantie, expresse ou implicite, et
            décline par la présente toute garantie, y compris, sans limitation,
            les garanties implicites de qualité marchande et d'adéquation à un
            usage particulier.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            4. Limitations
          </h2>
          <p className="mb-4">
            Éco Subvention ou ses fournisseurs ne seront en aucun cas
            responsables des dommages spéciaux, accessoires, indirects ou
            consécutifs résultant de l'accès ou de l'utilisation ou de
            l'impossibilité d'accéder ou d'utiliser les documents du site.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            5. Exactitude des documents
          </h2>
          <p className="mb-4">
            Les documents apparaissant sur le site Éco Subvention peuvent
            inclure des erreurs techniques, typographiques ou photographiques.
            Éco Subvention ne garantit pas que les documents de son site Web
            sont exacts, complets ou à jour.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            6. Liens
          </h2>
          <p className="mb-4">
            Éco Subvention n'a pas examiné tous les sites liés à son site
            Internet et n'est pas responsable du contenu de ces sites liés.
            L'inclusion de tout lien n'implique pas l'approbation par Éco
            Subvention du site. L'utilisation de ces sites Web liés est aux
            risques de l'utilisateur.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            7. Modifications
          </h2>
          <p className="mb-4">
            Éco Subvention peut réviser ces conditions d'utilisation de son site
            Web à tout moment sans préavis. En utilisant ce site Web, vous
            acceptez d'être lié par la version alors en vigueur de ces
            conditions d'utilisation.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
            8. Loi applicable
          </h2>
          <p className="mb-4">
            Ces conditions sont régies et interprétées conformément aux lois
            françaises, et vous vous soumettez irrévocablement à la juridiction
            exclusive des tribunaux de ce pays.
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

export default TermsPage;
