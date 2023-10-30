import { z } from "zod";
import { categorySchema, collectionArraySchema } from "../zod-schemas";

export type CategoryProps = z.infer<typeof categorySchema>;

export type CollectionArrayProps = z.infer<typeof collectionArraySchema>;

export interface ProvidersProps {
  providers: { id: string; name: string }[];
}
