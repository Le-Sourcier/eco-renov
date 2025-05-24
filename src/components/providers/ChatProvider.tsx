import React, { useState, ReactNode } from "react";
import {
  AnalysisRequest,
  AnalysisStatus,
  HousingType,
  IncomeLevel,
  OTPData,
  RenovationType,
  UserStatus,
} from "../../types";
import { ChatContext } from "../context/ChatContext";

const initialUserData = {
  firstName: "",
  email: "",
  phone: "",
  postalCode: "",
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(1);
  const [userStatus, setUserStatus] = useState<UserStatus>("");
  const [housingType, setHousingType] = useState<HousingType>("");
  const [renovationType, setRenovationType] = useState<RenovationType>("");
  const [incomeLevel, setIncomeLevel] = useState<IncomeLevel>("");
  const [userData, setUserDataState] = useState(initialUserData);
  const [eligible, setEligible] = useState(false);
  const [analysisRequests, setAnalysisRequests] = useState<AnalysisRequest[]>(
    []
  );
  const [otpData, setOtpData] = useState<Record<string, OTPData>>({});

  const setUserData = (data: Partial<typeof initialUserData>) => {
    setUserDataState((prev) => ({ ...prev, ...data }));
  };

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
      userData: { ...userData },
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return analysisRequests.some((request) => request.id === reference);
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

    console.log("OTP sent:", code); // In production, this would be sent via email
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
