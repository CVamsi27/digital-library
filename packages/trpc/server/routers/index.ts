import prisma from "../../../prisma";
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

  isAdmin: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const dbUser = await prisma.user.findFirst({
      where: {
        email: ctx.email,
      },
    });
    if (dbUser?.role == "ADMIN") return true;
    return false;
  }),

  getUserId: privateProcedure.query(async ({ ctx }) => {
    return ctx.userId;
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

  getCartDetails: privateProcedure.query(async ({ ctx }) => {
    return await prisma.cart.findMany({
      where: {
        userID: ctx.userId,
      },
      include: {
        collection: {
          select: {
            id: true,
            title: true,
            author: true,
            publishedDate: true,
            rating: true,
            available: true,
            categoryId: true,
            category: {
              select: {
                name: true,
              },
            },
            img: true,
            price: true,
          },
        },
      },
    });
  }),

  postToCart: privateProcedure
    .input(z.object({ collectionId: z.number(), userId: z.number() }))
    .mutation(async ({ input }) => {
      const ifExists = await prisma.cart.findFirst({
        where: {
          userID: input.userId,
          collectionId: input.collectionId,
        },
      });

      if (ifExists) {
        return "Data already exists";
      }
      await prisma.cart.create({
        data: {
          userID: input.userId,
          collectionId: input.collectionId,
        },
      });

      return "Data inserted successfully";
    }),

  deleteFromCart: privateProcedure
    .input(z.object({ cartId: z.number() }))
    .mutation(async ({ input }) => {
      const result = await prisma.cart.delete({
        where: {
          id: input.cartId,
        },
      });
      if (result) return "Item removed successfully";
      else return "Failed";
    }),

  deleteUserCart: privateProcedure.mutation(async ({ ctx }) => {
    const userCartIds = await prisma.cart.findMany({
      where: {
        userID: ctx.userId,
      },
    });
    const result = await prisma.cart.deleteMany({
      where: {
        id: {
          in: userCartIds.map((data) => data.id),
        },
      },
    });
    if (result.count > 0) return "Order places successfully";
    else return "Cart is empty";
  }),
});

export type AppRouter = typeof appRouter;
