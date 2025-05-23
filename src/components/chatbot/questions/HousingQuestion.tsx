import React from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../../../context/ChatContext';
import { Home, Building2 } from 'lucide-react';

const HousingQuestion: React.FC = () => {
  const { housingType, setHousingType } = useChat();

  return (
    <div className="chat-question">
      <motion.h3 
        className="text-lg font-semibold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Quel type de logement souhaitez-vous rénover ?
      </motion.h3>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setHousingType('maison')}
          className={`flex items-center p-4 border-2 rounded-lg transition-all ${
            housingType === 'maison' 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Home size={24} className={`mr-3 ${housingType === 'maison' ? 'text-primary' : 'text-gray-500'}`} />
          <div className="text-left">
            <h4 className="font-medium">Maison individuelle</h4>
            <p className="text-sm text-gray-600">Pavillon, maison de ville...</p>
          </div>
        </button>
        
        <button
          onClick={() => setHousingType('appartement')}
          className={`flex items-center p-4 border-2 rounded-lg transition-all ${
            housingType === 'appartement' 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Building2 size={24} className={`mr-3 ${housingType === 'appartement' ? 'text-primary' : 'text-gray-500'}`} />
          <div className="text-left">
            <h4 className="font-medium">Appartement</h4>
            <p className="text-sm text-gray-600">En copropriété ou en monopropriété</p>
          </div>
        </button>
      </motion.div>
      
      <motion.p 
        className="mt-4 text-sm text-gray-500 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Les montants d'aides peuvent varier selon le type de logement.
      </motion.p>
    </div>
  );
};

export default HousingQuestion;