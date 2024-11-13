import { useCallback, useState } from "react";
import { ToastOptions, ToastProps } from "../../types";
import { Toast } from "../components";
import { ToastContext } from "../context";

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...options, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {toasts.map((toastProps) => (
        <Toast
          key={toastProps.id}
          {...toastProps}
          onClose={() => {
            removeToast(toastProps.id);
          }}
        />
      ))}
    </ToastContext.Provider>
  );
};
