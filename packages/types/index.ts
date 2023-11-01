import { z } from "zod";
import {
  categorySchema,
  collectionArraySchema,
  cartSchema,
} from "../zod-schemas";

export type CategoryProps = z.infer<typeof categorySchema>;

export type CollectionArrayProps = z.infer<typeof collectionArraySchema>;

export type CartProps = z.infer<typeof cartSchema>;

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
}

export interface PlaceOrderProps {
  cartLength: number;
}
