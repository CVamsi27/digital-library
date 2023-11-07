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
