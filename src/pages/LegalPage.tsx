import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LegalPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Mentions Légales | ÉcoRénov';
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Mentions Légales</h1>
        
        <div className="prose prose-sm">
          <p className="mb-4">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
          
          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">1. Informations légales</h2>
          <p className="mb-4">
            Le site ÉcoRénov est édité par :
          </p>
          <ul className="list-none pl-0 mb-4">
            <li><strong>Société :</strong> ÉcoRénov SAS</li>
            <li><strong>Capital social :</strong> 100 000 €</li>
            <li><strong>RCS :</strong> Paris B 123 456 789</li>
            <li><strong>Siège social :</strong> 123 Avenue de l'Écologie, 75000 Paris</li>
            <li><strong>SIRET :</strong> 123 456 789 00001</li>
            <li><strong>TVA Intracommunautaire :</strong> FR 12 345678900</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">2. Direction de la publication</h2>
          <p className="mb-4">
            <strong>Directeur de la publication :</strong> Marie Laurent<br />
            <strong>Contact :</strong> direction@ecorenov.fr
          </p>
          
          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">3. Hébergement</h2>
          <p className="mb-4">
            Le site est hébergé par :<br />
            <strong>Société :</strong> OVH SAS<br />
            <strong>Adresse :</strong> 2 rue Kellermann - 59100 Roubaix - France<br />
            <strong>Téléphone :</strong> 08 203 203 63
          </p>
          
          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">4. Propriété intellectuelle</h2>
          <p className="mb-4">
            L'ensemble du contenu du site (textes, images, vidéos, etc.) est protégé par le droit d'auteur. 
            Toute reproduction, même partielle, est soumise à l'autorisation préalable d'ÉcoRénov.
          </p>
          
          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">5. Protection des données personnelles</h2>
          <p className="mb-4">
            Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement 
            Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, 
            de suppression et d'opposition aux données personnelles vous concernant.
          </p>
          <p className="mb-4">
            Pour exercer ces droits, contactez notre Délégué à la Protection des Données :<br />
            <strong>Email :</strong> dpo@ecorenov.fr<br />
            <strong>Adresse :</strong> 123 Avenue de l'Écologie, 75000 Paris
          </p>
          
          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">6. Cookies</h2>
          <p className="mb-4">
            Le site utilise des cookies pour améliorer l'expérience utilisateur. Pour plus d'informations, 
            consultez notre <Link to="/privacy" className="text-primary hover:underline">politique de confidentialité</Link>.
          </p>
          
          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">7. Crédits</h2>
          <p className="mb-4">
            <strong>Design et développement :</strong> ÉcoRénov<br />
            <strong>Photos :</strong> Pexels, Unsplash<br />
            <strong>Icônes :</strong> Lucide Icons
          </p>
          
          <h2 className="text-xl font-semibold text-primary mt-6 mb-3">8. Contact</h2>
          <p className="mb-4">
            Pour toute question concernant ces mentions légales, contactez-nous :<br />
            <strong>Email :</strong> contact@ecorenov.fr<br />
            <strong>Téléphone :</strong> +33 (0)1 23 45 67 89<br />
            <strong>Adresse :</strong> 123 Avenue de l'Écologie, 75000 Paris
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

export default LegalPage;