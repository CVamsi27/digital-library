import { z } from "zod";

export const categorySchema = z.array(
  z.object({
    id: z.number(),
    name: z.string().min(2).max(15),
    color: z.string().min(3).max(20),
  }),
);

export const collectionArraySchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    publishedDate: z.string(),
    rating: z.number().min(1).max(5),
    available: z.boolean(),
    categoryId: z.number(),
    category: z.object({
      name: z.string(),
    }),
    img: z.string().nullable(),
    price: z.number(),
  }),
);

export const collectionSchema = z.object({
  title: z.string(),
  author: z.string(),
  publishedDate: z.string(),
  rating: z.number().min(1).max(5),
  available: z.boolean(),
  categoryId: z.number(),
  img: z.string().nullable(),
  price: z.number(),
});
