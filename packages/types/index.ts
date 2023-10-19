import { z } from "zod";
import { categorySchema } from "../zod-schemas";

export type CategoryProps = z.infer<typeof categorySchema>;
