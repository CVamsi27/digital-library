export interface ToastProps {
  id: number;
  message: string;
  duration?: number;
}

export interface ToastOptions extends Omit<ToastProps, "id"> {}

export interface ToastContextType {
  toast: (options: ToastOptions) => void;
  removeToast: (id: number) => void;
}

export interface GoogleBooksVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    categories?: string[];
  };
  saleInfo?: {
    buyLink?: string;
  };
}

export interface GoogleBooksResponse {
  items: GoogleBooksVolume[];
  totalItems: number;
}
