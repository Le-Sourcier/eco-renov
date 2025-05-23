// User related types
export type UserStatus = 'proprietaire' | 'locataire' | '';
export type HousingType = 'maison' | 'appartement' | '';
export type RenovationType = 'chauffage' | 'isolation' | 'fenetres' | 'multiple' | '';
export type IncomeLevel = 'tres_modeste' | 'modeste' | 'intermediaire' | 'superieur' | '';

export interface UserData {
  firstName: string;
  email: string;
  phone: string;
  postalCode: string;
}

// Eligibility report related types
export interface SubsidyAmount {
  cee: number;
  maprime: number;
  total: number;
}

export interface Contractor {
  id: number;
  name: string;
  specialties: string[];
  phone: string;
  rating: number;
  reviews: number;
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