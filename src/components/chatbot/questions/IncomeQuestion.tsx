import React from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../../../context/ChatContext';
import { EuroIcon } from 'lucide-react';

const IncomeQuestion: React.FC = () => {
  const { incomeLevel, setIncomeLevel } = useChat();

  return (
    <div className="chat-question">
      <motion.h3 
        className="text-lg font-semibold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Dans quelle tranche de revenus vous situez-vous ?
      </motion.h3>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setIncomeLevel('tres_modeste')}
          className={`flex items-center w-full p-4 border-2 rounded-lg transition-all ${
            incomeLevel === 'tres_modeste' 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <EuroIcon size={24} className={`mr-3 ${incomeLevel === 'tres_modeste' ? 'text-primary' : 'text-gray-500'}`} />
          <div className="text-left">
            <h4 className="font-medium">Ménage très modeste</h4>
            <p className="text-sm text-gray-600">Revenu fiscal de référence &lt; 21 123€ (1 personne)</p>
          </div>
        </button>
        
        <button
          onClick={() => setIncomeLevel('modeste')}
          className={`flex items-center w-full p-4 border-2 rounded-lg transition-all ${
            incomeLevel === 'modeste' 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <EuroIcon size={24} className={`mr-3 ${incomeLevel === 'modeste' ? 'text-primary' : 'text-gray-500'}`} />
          <div className="text-left">
            <h4 className="font-medium">Ménage modeste</h4>
            <p className="text-sm text-gray-600">Revenu fiscal de référence &lt; 25 714€ (1 personne)</p>
          </div>
        </button>
        
        <button
          onClick={() => setIncomeLevel('intermediaire')}
          className={`flex items-center w-full p-4 border-2 rounded-lg transition-all ${
            incomeLevel === 'intermediaire' 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <EuroIcon size={24} className={`mr-3 ${incomeLevel === 'intermediaire' ? 'text-primary' : 'text-gray-500'}`} />
          <div className="text-left">
            <h4 className="font-medium">Ménage intermédiaire</h4>
            <p className="text-sm text-gray-600">Revenu fiscal de référence &lt; 39 192€ (1 personne)</p>
          </div>
        </button>
        
        <button
          onClick={() => setIncomeLevel('superieur')}
          className={`flex items-center w-full p-4 border-2 rounded-lg transition-all ${
            incomeLevel === 'superieur' 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <EuroIcon size={24} className={`mr-3 ${incomeLevel === 'superieur' ? 'text-primary' : 'text-gray-500'}`} />
          <div className="text-left">
            <h4 className="font-medium">Ménage supérieur</h4>
            <p className="text-sm text-gray-600">Revenu fiscal de référence &gt; 39 192€ (1 personne)</p>
          </div>
        </button>
      </motion.div>
      
      <motion.p 
        className="mt-4 text-sm text-gray-500 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Les plafonds indiqués correspondent à un foyer d'une personne en Île-de-France. Les montants peuvent varier selon votre localisation et la composition de votre foyer.
      </motion.p>
    </div>
  );
};

export default IncomeQuestion;