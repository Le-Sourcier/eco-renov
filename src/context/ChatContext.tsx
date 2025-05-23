import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for our chat data
type UserStatus = 'proprietaire' | 'locataire' | '';
type HousingType = 'maison' | 'appartement' | '';
type RenovationType = 'chauffage' | 'isolation' | 'fenetres' | 'multiple' | '';
type IncomeLevel = 'tres_modeste' | 'modeste' | 'intermediaire' | 'superieur' | '';

interface ChatContextType {
  step: number;
  userStatus: UserStatus;
  housingType: HousingType;
  renovationType: RenovationType;
  incomeLevel: IncomeLevel;
  userData: {
    firstName: string;
    email: string;
    phone: string;
    postalCode: string;
  };
  setStep: (step: number) => void;
  setUserStatus: (status: UserStatus) => void;
  setHousingType: (type: HousingType) => void;
  setRenovationType: (type: RenovationType) => void;
  setIncomeLevel: (level: IncomeLevel) => void;
  setUserData: (data: Partial<{
    firstName: string;
    email: string;
    phone: string;
    postalCode: string;
  }>) => void;
  resetChat: () => void;
  isEligible: () => boolean;
  generateReport: () => void;
}

const initialUserData = {
  firstName: '',
  email: '',
  phone: '',
  postalCode: ''
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [userStatus, setUserStatus] = useState<UserStatus>('');
  const [housingType, setHousingType] = useState<HousingType>('');
  const [renovationType, setRenovationType] = useState<RenovationType>('');
  const [incomeLevel, setIncomeLevel] = useState<IncomeLevel>('');
  const [userData, setUserDataState] = useState(initialUserData);

  const setUserData = (data: Partial<typeof initialUserData>) => {
    setUserDataState(prev => ({ ...prev, ...data }));
  };

  const resetChat = () => {
    setStep(1);
    setUserStatus('');
    setHousingType('');
    setRenovationType('');
    setIncomeLevel('');
    setUserDataState(initialUserData);
  };

  // Simple eligibility check - in a real app this would be more complex
  const isEligible = () => {
    // Example logic: Owners are eligible for all types of work
    // Tenants are only eligible for heating renovations
    if (userStatus === 'proprietaire') return true;
    if (userStatus === 'locataire' && renovationType === 'chauffage') return true;
    return false;
  };

  // Simulate report generation - in a real app this would generate a PDF
  const generateReport = () => {
    console.log('Generating report with data:', {
      userStatus,
      housingType,
      renovationType,
      incomeLevel,
      userData
    });
    // Here we would normally call an API to generate the PDF
  };

  return (
    <ChatContext.Provider
      value={{
        step,
        userStatus,
        housingType,
        renovationType,
        incomeLevel,
        userData,
        setStep,
        setUserStatus,
        setHousingType,
        setRenovationType,
        setIncomeLevel,
        setUserData,
        resetChat,
        isEligible,
        generateReport
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};