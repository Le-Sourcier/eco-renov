import { useContext } from "react";
import { ChatContextType } from "../types";
import { ChatContext } from "./context/ChatContext";

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
