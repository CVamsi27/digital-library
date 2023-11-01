import { z } from "zod";

export const categorySchema = z.array(
  z.object({
    id: z.number(),
    name: z.string().min(2).max(15),
    color: z.string().min(3).max(20),
  }),
);

export const collectionSchema = z.object({
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
});

export const collectionArraySchema = z.array(collectionSchema);

export const cartSchema = z.array(
  z.object({
    collectionId: z.number(),
    id: z.number(),
    collection: collectionSchema,
    userID: z.number(),
    quantity: z.number(),
  }),
);

export const userDetailsSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  role: z.string(),
});
