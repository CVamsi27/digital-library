import { z } from "zod";
import { categorySchema, collectionSchema } from "../zod-schemas";

export type CategoryProps = z.infer<typeof categorySchema>;

export type collectionSchema = z.infer<typeof collectionSchema>;
