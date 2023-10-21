import { z } from "zod";

export const categorySchema = z.array(
  z.object({
    id: z.number(),
    name: z.string().min(2).max(15),
    color: z.string().min(3).max(20),
  }),
);

export const collectionSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    publishedDate: z.date(),
    rating: z.number().min(1).max(5),
    available: z.boolean(),
    categoryId: z.string(),
    img: z.string(),
    price: z.number(),
  }),
);
