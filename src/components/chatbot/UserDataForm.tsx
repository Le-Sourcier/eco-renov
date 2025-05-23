import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, ArrowRight } from 'lucide-react';

const UserDataForm: React.FC = () => {
  const { userData, setUserData, isEligible, generateReport } = useChat();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!userData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!userData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'L\'email est invalide';
    }
    
    if (!userData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(userData.phone)) {
      newErrors.phone = 'Le format du téléphone est invalide';
    }
    
    if (!userData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    } else if (!/^[0-9]{5}$/.test(userData.postalCode)) {
      newErrors.postalCode = 'Le code postal doit contenir 5 chiffres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      generateReport();
      setIsSubmitted(true);
      
      // Redirect to results page after 2 seconds
      setTimeout(() => {
        navigate('/report/123');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const eligible = isEligible();

  return (
    <div className="chat-form">
      {isSubmitted ? (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
            <Check size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">Demande envoyée avec succès !</h3>
          <p className="text-gray-600 mb-4">
            Votre rapport personnalisé est en cours de génération.
            Vous allez être redirigé vers les résultats dans quelques instants...
          </p>
          <div className="mt-4">
            <Loader2 size={24} className="animate-spin mx-auto text-primary" />
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            className={`mb-6 p-4 rounded-lg ${eligible ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className={`text-lg font-semibold ${eligible ? 'text-green-700' : 'text-orange-700'}`}>
              {eligible 
                ? 'Bonne nouvelle ! Vous pourriez être éligible aux aides CEE' 
                : 'Vous pourriez être éligible à certaines aides, mais avec des conditions'}
            </h3>
            <p className={`text-sm ${eligible ? 'text-green-600' : 'text-orange-600'}`}>
              {eligible 
                ? 'Complétez le formulaire ci-dessous pour recevoir votre rapport personnalisé détaillant toutes les aides disponibles pour votre projet.' 
                : 'Certaines restrictions peuvent s\'appliquer selon votre situation. Complétez le formulaire pour une analyse détaillée.'}
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  className={`form-control ${errors.firstName ? 'border-error' : ''}`}
                  value={userData.firstName}
                  onChange={(e) => setUserData({ firstName: e.target.value })}
                  placeholder="Entrez votre prénom"
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className={`form-control ${errors.email ? 'border-error' : ''}`}
                  value={userData.email}
                  onChange={(e) => setUserData({ email: e.target.value })}
                  placeholder="exemple@email.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  className={`form-control ${errors.phone ? 'border-error' : ''}`}
                  value={userData.phone}
                  onChange={(e) => setUserData({ phone: e.target.value })}
                  placeholder="0612345678"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="postalCode" className="form-label">Code postal</label>
                <input
                  type="text"
                  id="postalCode"
                  className={`form-control ${errors.postalCode ? 'border-error' : ''}`}
                  value={userData.postalCode}
                  onChange={(e) => setUserData({ postalCode: e.target.value })}
                  placeholder="75000"
                  maxLength={5}
                />
                {errors.postalCode && <div className="invalid-feedback">{errors.postalCode}</div>}
              </div>
            </div>
            
            <div className="form-group mt-4">
              <div className="flex items-start mb-4">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1"
                  required
                />
                <label htmlFor="privacy" className="ml-2 text-sm text-gray-700">
                  J'accepte que mes données soient utilisées dans le cadre de ma demande d'éligibilité 
                  conformément à la <a href="/privacy" className="text-primary hover:underline">politique de confidentialité</a>.
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Traitement en cours...
                </>
              ) : (
                <>
                  Obtenir mon rapport personnalisé
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </button>
          </motion.form>
        </>
      )}
    </div>
  );
};

export default UserDataForm;