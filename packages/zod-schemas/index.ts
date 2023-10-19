import { z } from "zod";

export const categorySchema = z.array(
  z.object({
    name: z.string().min(2).max(15),
    color: z.string().min(3).max(20),
  }),
);
