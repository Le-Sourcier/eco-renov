import React from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../../../context/ChatContext';
import { Flame, Layers, AppWindowIcon as WindowIcon, ListChecks } from 'lucide-react';

const RenovationQuestion: React.FC = () => {
  const { renovationType, setRenovationType } = useChat();

  return (
    <div className="chat-question">
      <motion.h3 
        className="text-lg font-semibold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Quel type de travaux souhaitez-vous réaliser ?
      </motion.h3>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setRenovationType('chauffage')}
          className={`flex items-center p-4 border-2 rounded-lg transition-all ${
            renovationType === 'chauffage' 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Flame size={24} className={`mr-3 ${renovationType === 'chauffage' ? 'text-primary' : 'text-gray-500'}`} />
          <div className="text-left">
            <h4 className="font-medium">Chauffage</h4>
            <p className="text-sm text-gray-600">Pompe à chaleur, chaudière, poêle...</p>
          </div>
        </button>
        
        <button
          onClick={() => setRenovationType('isolation')}
          className={`flex items-center p-4 border-2 rounded-lg transition-all ${
            renovationType === 'isolation' 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Layers size={24} className={`mr-3 ${renovationType === 'isolation' ? 'text-primary' : 'text-gray-500'}`} />
          <div className="text-left">
            <h4 className="font-medium">Isolation</h4>
            <p className="text-sm text-gray-600">Murs, combles, planchers...</p>
          </div>
        </button>
        
        <button
          onClick={() => setRenovationType('fenetres')}
          className={`flex items-center p-4 border-2 rounded-lg transition-all ${
            renovationType === 'fenetres' 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <WindowIcon size={24} className={`mr-3 ${renovationType === 'fenetres' ? 'text-primary' : 'text-gray-500'}`} />
          <div className="text-left">
            <h4 className="font-medium">Fenêtres</h4>
            <p className="text-sm text-gray-600">Remplacement de menuiseries</p>
          </div>
        </button>
        
        <button
          onClick={() => setRenovationType('multiple')}
          className={`flex items-center p-4 border-2 rounded-lg transition-all ${
            renovationType === 'multiple' 
              ? 'border-primary bg-primary bg-opacity-10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <ListChecks size={24} className={`mr-3 ${renovationType === 'multiple' ? 'text-primary' : 'text-gray-500'}`} />
          <div className="text-left">
            <h4 className="font-medium">Plusieurs travaux</h4>
            <p className="text-sm text-gray-600">Rénovation globale</p>
          </div>
        </button>
      </motion.div>
      
      <motion.p 
        className="mt-4 text-sm text-gray-500 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Le montant des aides CEE varie selon le type de travaux. Des bonus sont accordés pour les rénovations globales.
      </motion.p>
    </div>
  );
};

export default RenovationQuestion;