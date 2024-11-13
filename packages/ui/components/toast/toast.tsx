import React from "react";
import { X } from "lucide-react";
import { ToastProps } from "../../../types";

export const Toast: React.FC<ToastProps & { onClose: () => void }> = ({
  message,
  duration = 3000,
  onClose,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div
        className={`flex items-center p-4 rounded-lg shadow-lg max-w-md text-white bg-primary`}
        role="alert"
      >
        <p className="flex-1">{message}</p>
        <button
          onClick={onClose}
          className={`ml-4 p-1 hover:bg-opacity-20 rounded hover:bg-primary-500`}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
