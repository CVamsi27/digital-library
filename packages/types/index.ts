import { z } from "zod";
import {
  categorySchema,
  collectionArraySchema,
  cartSchema,
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
}

export interface PlaceOrderProps {
  cartLength: number;
}
