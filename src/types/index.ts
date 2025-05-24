// Define the types for our chat data
export type UserStatus = "proprietaire" | "locataire" | "";
export type HousingType = "maison" | "appartement" | "";
export type RenovationType =
  | "chauffage"
  | "isolation"
  | "fenetres"
  | "multiple"
  | "";
export type IncomeLevel =
  | "tres_modeste"
  | "modeste"
  | "intermediaire"
  | "superieur"
  | "";

export interface ChatContextType {
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
  setUserData: (
    data: Partial<{
      firstName: string;
      email: string;
      phone: string;
      postalCode: string;
    }>
  ) => void;
  analysisRequests: AnalysisRequest[];
  resetChat: () => void;
  generateReport: () => void;
  setEligible: (eligible: boolean) => void;
  eligible: boolean;
  createAnalysisRequest: () => string;
  updateAnalysisStatus: (
    id: string,
    status: AnalysisStatus,
    notes?: string
  ) => void;
  verifyAccess: (reference: string) => Promise<boolean>;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, code: string) => Promise<boolean>;
}

export interface UserData {
  firstName: string;
  email: string;
  phone: string;
  postalCode: string;
}

// Analysis request related types
export type AnalysisStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled";
export type VerificationType = "email" | "reference";

export interface AnalysisRequest {
  id: string;
  createdAt: Date;
  status: AnalysisStatus;
  type: RenovationType;
  userData: UserData;
  estimatedAmount?: number;
  notes?: string;
}

export interface OTPData {
  code: string;
  expiresAt: Date;
  verified: boolean;
}

// Eligibility report related types
export interface SubsidyAmount {
  cee: number;
  maprime: number;
  total: number;
}

// Map related types
export interface DepartmentData {
  code: string;
  name: string;
  subsidyAmount: number;
}

// Testimonial related types
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  savingsAmount: string;
  image: string;
}

// // User related types
// export type UserStatus = 'proprietaire' | 'locataire' | '';
// export type HousingType = 'maison' | 'appartement' | '';
// export type RenovationType = 'chauffage' | 'isolation' | 'fenetres' | 'multiple' | '';
// export type IncomeLevel = 'tres_modeste' | 'modeste' | 'intermediaire' | 'superieur' | '';

// export interface UserData {
//   firstName: string;
//   email: string;
//   phone: string;
//   postalCode: string;
// }

// // Eligibility report related types
// export interface SubsidyAmount {
//   cee: number;
//   maprime: number;
//   total: number;
// }

// export interface Contractor {
//   id: number;
//   name: string;
//   specialties: string[];
//   phone: string;
//   rating: number;
//   reviews: number;
// }

// // Map related types
// export interface DepartmentData {
//   code: string;
//   name: string;
//   subsidyAmount: number;
// }

// // Testimonial related types
// export interface Testimonial {
//   id: number;
//   name: string;
//   location: string;
//   text: string;
//   rating: number;
//   savingsAmount: string;
//   image: string;
// }
