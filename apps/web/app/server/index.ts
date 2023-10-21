import prisma from "prisma";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getCategories: publicProcedure.query(async () => {
    return await prisma.category.findMany();
  }),
  getCollection: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ input }) => {
      return await prisma.collection.findMany({
        where: {
          categoryId: input.categoryId,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
