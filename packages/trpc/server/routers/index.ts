import prisma, { Role } from "../../../prisma";
import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { collectionSchema } from "../../../zod-schemas";
import { getServerSession } from "next-auth/next";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const session = await getServerSession();

    if (!session?.user?.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const dbUser = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    if (!dbUser) {
      await prisma.user.create({
        data: {
          email: session?.user?.email,
          name: session?.user?.name,
        },
      });
    }

    return { success: true };
  }),

  getCategories: publicProcedure.query(async () => {
    return await prisma.category.findMany();
  }),

  getCollectionByCategory: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ input }) => {
      return await prisma.collection.findMany({
        where: {
          categoryId: input.categoryId,
          category: {
            id: input.categoryId,
          },
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      });
    }),

  getCollection: publicProcedure.query(async () => {
    return await prisma.collection.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }),

  postBookDetails: privateProcedure
    .input(collectionSchema)
    .mutation(async ({ input }) => {
      return await prisma.collection.create({
        data: {
          title: input.title,
          author: input.author,
          publishedDate: input.publishedDate,
          rating: input.rating,
          available: input.available,
          categoryId: input.categoryId,
          img: input.img,
          price: input.price,
        },
      });
    }),

  // addToCart: privateProcedure
  // .input(),
});

export type AppRouter = typeof appRouter;
