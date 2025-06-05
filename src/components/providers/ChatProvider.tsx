import React, { useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import {
  AnalysisRequest,
  AnalysisStatus,
  HousingType,
  IncomeLevel,
  OTPData,
  RenovationType,
  UserData,
  UserStatus,
} from "../../types";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";
import { ApiResponse } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/users";
const initialUserData = {
  firstName: "",
  email: "",
  phone: "",
  postalCode: "",
  acceptPhoneCall: false,
  acceptEmailing: false,
  acceptTerms: false,
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(1);
  const [userStatus, setUserStatus] = useState<UserStatus>("");
  const [housingType, setHousingType] = useState<HousingType>("");
  const [renovationType, setRenovationType] = useState<RenovationType>("");
  const [incomeLevel, setIncomeLevel] = useState<IncomeLevel>("");
  // const [userData, setUserDataState] = useState<UserData>(initialUserData);
  const [userData, setUserDataState] = useState<UserData | null>(null);

  const [eligible, setEligible] = useState(false);
  const [analysisRequests, setAnalysisRequests] = useState<AnalysisRequest[]>(
    []
  );
  const [otpData, setOtpData] = useState<Record<string, OTPData>>({});
  const [loading, setLoading] = useState(true);
  const setUserData = (data: Partial<UserData | null>) => {
    setUserDataState((prev) => ({
      ...(prev === null ? initialUserData : prev),
      ...data,
    }));
  };

  const [accessToken, setAccessToken] = useState<string | null>(
    () => Cookies.get("accessToken") || null
  );

  const fetchUser = async () => {
    if (!accessToken) {
      setUserData(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get<ApiResponse<UserData>>(`${BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { data } = res.data;
      setUserData(data);
    } catch {
      setUserData(initialUserData);
      setAccessToken(null);
      Cookies.remove("accessToken");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      // if (!accessToken) {
      //   // const res = await refreshAccessToken();
      //   if (!res.accessToken) {
      //     setLoading(false);
      //     return;
      //   }
      // }
      await fetchUser();
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const resetChat = () => {
    setStep(1);
    setUserStatus("");
    setHousingType("");
    setRenovationType("");
    setIncomeLevel("");
    setUserDataState(initialUserData);
  };

  // Simple eligibility check - in a real app this would be more complex

  // Simulate report generation - in a real app this would generate a PDF
  const generateReport = () => {
    console.log("Generating report with data:", {
      userStatus,
      housingType,
      renovationType,
      incomeLevel,
      userData,
    });
    // Here we would normally call an API to generate the PDF
  };

  const createAnalysisRequest = (): string => {
    const newRequest: AnalysisRequest = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      status: "pending",
      type: renovationType,
      userData: {
        firstName: userData?.firstName || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        postalCode: userData?.postalCode || "",
        acceptPhoneCall: userData?.acceptPhoneCall ?? false,
        acceptEmailing: userData?.acceptEmailing ?? false,
        acceptTerms: userData?.acceptTerms ?? false,
      },
    };

    setAnalysisRequests((prev) => [...prev, newRequest]);
    return newRequest.id;
  };

  const updateAnalysisStatus = (
    id: string,
    status: AnalysisStatus,
    notes?: string
  ) => {
    setAnalysisRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status, notes: notes || request.notes }
          : request
      )
    );
  };

  const verifyAccess = async (reference: string): Promise<boolean> => {
    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // return analysisRequests.some((request) => request.id === reference);
    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/auth", {
        step: "verify-ecoref",
        code: reference,
      });
      if (res.status === 200) {
        const { data } = res.data;
        setAccessToken(data);
        Cookies.set("accessToken", data);
        // console.log("H: ", data);
        return true;
      } else {
        return false;
      }
    } catch {
      // console.log(error);
    }
    return false;
  };

  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTP = async (email: string): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const code = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP expires in 10 minutes

    setOtpData((prev) => ({
      ...prev,
      [email]: {
        code,
        expiresAt,
        verified: false,
      },
    }));

    // console.log("OTP sent:", code); // In production, this would be sent via email
  };

  const verifyOTP = async (email: string, code: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = otpData[email];
    if (!data) return false;

    const isValid = data.code === code && new Date() < data.expiresAt;
    if (isValid) {
      setOtpData((prev) => ({
        ...prev,
        [email]: { ...prev[email], verified: true },
      }));
    }

    return isValid;
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
        analysisRequests,
        setStep,
        setUserStatus,
        setHousingType,
        setRenovationType,
        setIncomeLevel,
        setUserData,
        resetChat,
        generateReport,
        setEligible,
        eligible,
        createAnalysisRequest,
        updateAnalysisStatus,
        verifyAccess,
        sendOTP,
        verifyOTP,
        loading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
