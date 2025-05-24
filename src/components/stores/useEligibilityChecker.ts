import { create } from "zustand";
import axios from "axios";
import {
  EligibilityState,
  ApiResponse,
  EligibilityData,
  EligibilityFormData,
  RegisterFormData,
} from "../types";
import sec from "react-secure-storage";
const BASE_URL = import.meta.env.VITE_API_URL + "/v1";

export const useEligibilityStore = create<EligibilityState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isEligible: null,

  checkEligibility: async ({ ...form }: EligibilityFormData) => {
    set({ isLoading: true, error: null, isEligible: null });
    try {
      const res = await axios.post<ApiResponse<EligibilityData>>(
        `${BASE_URL}/eligibility`,
        { ...form }
      );
      const { data, message } = res.data;

      sec.setItem("git", data.accessToken);

      set({
        user: null,
        isEligible: data.isEligible,
        error: message || null,
        isLoading: false,
      });
      return data;
    } catch (err) {
      console.log("Error checking eligibility:", err);
      set({
        error: (err as Error).message,
        isLoading: false,
        isEligible: false,
      });
      return null;
    }
  },
  registreLead: async ({ ...form }: RegisterFormData) => {
    set({ isLoading: true, error: null });
    try {
      //   const formObject = Object.fromEntries(form.entries());

      const res = await axios.post<ApiResponse<EligibilityData>>(
        `${BASE_URL}/users/register-lead`,
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${sec.getItem("git")}`,
          },
        }
      );
      const { data, message } = res.data;
      set({ user: res.data.data, error: message || null, isLoading: false });
      return data;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return null;
    }
  },
}));
