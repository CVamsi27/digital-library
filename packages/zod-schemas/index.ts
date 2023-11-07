import { z } from "zod";

export const categorySchema = z.array(
  z.object({
    id: z.number(),
    name: z.string().min(2).max(15),
    color: z.string().min(3).max(20),
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

export const collectionEditSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  publishedDate: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  available: z.boolean().optional(),
  categoryId: z.number().optional(),
  img: z.string().nullable().optional(),
  price: z.number().optional(),
});

export const cartCollectionSchema = z.object({
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

export const collectionGetSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  publishedDate: z.string(),
  rating: z.number().min(1).max(5),
  available: z.boolean(),
  categoryId: z.number(),
  img: z.string().nullable(),
  price: z.number(),
  category: z.object({
    name: z.string(),
  }),
});

export const collectionArraySchema = z.array(cartCollectionSchema);

export const cartSchema = z.array(
  z.object({
    collectionId: z.number(),
    id: z.number(),
    collection: cartCollectionSchema,
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
