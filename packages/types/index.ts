import { z } from "zod";
import {
  categorySchema,
  collectionArraySchema,
  cartSchema,
  collectionGetSchema,
} from "../zod-schemas";
import { t } from "../trpc/client/client";

export type CategoryProps = z.infer<typeof categorySchema>;

export type CollectionArrayProps = z.infer<typeof collectionArraySchema>;

export interface CartProps {
  cartDetails: z.infer<typeof cartSchema>;
  refetchCartData: ReturnType<typeof t.getCartDetails.useQuery>["refetch"];
}

export interface ProvidersProps {
  providers: { id: string; name: string }[];
}

export interface SourceProps {
  params: { source: string[] };
}

export interface CollectionProps {
  collections: CollectionArrayProps;
  userId?: number;
  isAdmin?: boolean;
  categoryList: CategoryProps;
  refetchCollection: ReturnType<typeof t.getCategories.useQuery>["refetch"];
}

export interface PlaceOrderProps {
  cartLength: number;
}

export interface CardEditProps {
  categoryList: CategoryProps;
  collectionData: z.infer<typeof collectionGetSchema>;
  refetchCollection: ReturnType<typeof t.getCategories.useQuery>["refetch"];
}

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

const IndustryIdentifierSchema = z.object({
  type: z.string(),
  identifier: z.string(),
});

const ReadingModesSchema = z.object({
  text: z.boolean(),
  image: z.boolean(),
});

const ImageLinksSchema = z.object({
  smallThumbnail: z.string().url().optional(),
  thumbnail: z.string().url().optional(),
});

const VolumeInfoSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).optional(),
  publisher: z.string().optional(),
  publishedDate: z.string().optional(),
  description: z.string().optional(),
  industryIdentifiers: z.array(IndustryIdentifierSchema).optional(),
  readingModes: ReadingModesSchema.optional(),
  pageCount: z.number().optional(),
  printType: z.string().optional(),
  categories: z.array(z.string()).optional(),
  maturityRating: z.string().optional(),
  allowAnonLogging: z.boolean().optional(),
  contentVersion: z.string().optional(),
  imageLinks: ImageLinksSchema.optional(),
  language: z.string(),
  previewLink: z.string().url(),
  infoLink: z.string().url(),
  canonicalVolumeLink: z.string().url(),
});

const SaleInfoSchema = z.object({
  country: z.string(),
  saleability: z.string(),
  isEbook: z.boolean(),
});

const AccessInfoSchema = z.object({
  country: z.string(),
  viewability: z.string(),
  embeddable: z.boolean(),
  publicDomain: z.boolean(),
  textToSpeechPermission: z.string(),
  epub: z.object({
    isAvailable: z.boolean(),
    acsTokenLink: z.string().url().optional(),
  }),
  pdf: z.object({
    isAvailable: z.boolean(),
    acsTokenLink: z.string().url().optional(),
  }),
  webReaderLink: z.string().url(),
  accessViewStatus: z.string(),
  quoteSharingAllowed: z.boolean(),
});

const SearchInfoSchema = z.object({
  textSnippet: z.string(),
});

const ItemSchema = z.object({
  kind: z.string(),
  id: z.string(),
  etag: z.string(),
  selfLink: z.string().url(),
  volumeInfo: VolumeInfoSchema,
  saleInfo: SaleInfoSchema.optional(),
  accessInfo: AccessInfoSchema.optional(),
  searchInfo: SearchInfoSchema.optional(),
});

export const GoogleBooksResponseSchema = z.object({
  kind: z.string(),
  totalItems: z.number(),
  items: z.array(ItemSchema).optional(),
});

export type GoogleBooksResponse = z.infer<typeof GoogleBooksResponseSchema>;
