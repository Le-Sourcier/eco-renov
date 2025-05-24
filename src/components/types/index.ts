export interface ApiResponse<T> {
  error: boolean;
  status: number;
  message: string;
  data: T;
}
export type EligibilityData = {
  accessToken: string;
  userStatus: string;
  housingType: string;
  renovationType: string;
  incomeLevel: string;
  isEligible: boolean;
  estimatedAmount: string;
  postalCode: string;
};
export type EligibilityFormData = {
  userStatus: string;
  housingType: string;
  renovationType: string;
  incomeLevel: string;
};

export type RegisterFormData = {
  firstName: string;
  email: string;
  phone: string;
  postalCode: string;
};

export type EligibilityState = {
  isLoading: boolean;
  error: string | null;
  user: EligibilityData | null;
  isEligible: boolean | null;
  checkEligibility: ({
    ...form
  }: EligibilityFormData) => Promise<EligibilityData | null>;

  registreLead: ({
    ...form
  }: RegisterFormData) => Promise<EligibilityData | null>;
};
