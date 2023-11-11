import prisma from "../../../prisma";
import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { collectionSchema, collectionEditSchema } from "../../../zod-schemas";
import { getServerSession } from "next-auth/next";
import { TRPCError } from "@trpc/server";
import { Role } from "@prisma/client";

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

  grantAdminAccess: privateProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      if (!user || input.password !== process.env.ADMIN_SECRET)
        return "User does not exist";
      if (user.role === "ADMIN") return `${user.name} already has Admin Access`;

      const upgrade = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          role: Role.ADMIN,
        },
      });

      if (upgrade) return `${user.name} now has Admin Access`;
      return "Error";
    }),

  getUrl: publicProcedure
    .input(z.object({ path: z.string() }))
    .query(({ input }) => {
      return process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}${input.path}`
        : `http://localhost:${process.env.PORT ?? 3000}${input.path}`;
    }),

  getUserId: privateProcedure.query(async ({ ctx }) => {
    return ctx.userId;
  }),

  getCategories: publicProcedure.query(async () => {
    return await prisma.category.findMany();
  }),

  getCategoriesWithoutAll: publicProcedure.query(async () => {
    return await prisma.category.findMany({
      where: {
        name: {
          not: "All",
        },
      },
    });
  }),

  getCollection: publicProcedure.query(async () => {
    return await prisma.collection.findMany({
      orderBy: {
        id: "asc",
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

  getCollectionById: publicProcedure
    .input(z.object({ collctionId: z.number() }))
    .query(async ({ input }) => {
      return await prisma.collection.findFirst({
        where: {
          id: input.collctionId,
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

  getCollectionByCategory: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ input }) => {
      return await prisma.collection.findMany({
        orderBy: {
          id: "asc",
        },
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
        return "Book already exists in Cart";
      }
      await prisma.cart.create({
        data: {
          userID: input.userId,
          collectionId: input.collectionId,
        },
      });

      return "Book added in cart";
    }),

  deleteFromCart: privateProcedure
    .input(z.object({ cartId: z.number() }))
    .mutation(async ({ input }) => {
      const result = await prisma.cart.delete({
        where: {
          id: input.cartId,
        },
      });
      if (result) return "Book removed from Cart";
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
    if (result.count > 0) return "Order placed";
    return "Cart is empty";
  }),

  editCollection: privateProcedure
    .input(z.object({ itemId: z.number(), data: collectionEditSchema }))
    .mutation(async ({ input }) => {
      const result = await prisma.collection.update({
        where: {
          id: input.itemId,
        },
        data: {
          title: input.data.title,
          author: input.data.author,
          publishedDate: input.data.publishedDate,
          rating: input.data.rating,
          available: input.data.available,
          categoryId: input.data.categoryId,
          img: input.data.img,
          price: input.data.price,
        },
      });
      if (result) return "Book details are updated";
      return "Error";
    }),

  editQuantity: privateProcedure
    .input(
      z.object({
        cartId: z.number(),
        collectionId: z.number(),
        quantity: z.number().min(1).max(10),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const result = await prisma.cart.update({
        where: {
          id: input.cartId,
        },
        data: {
          userID: ctx.userId,
          collectionId: input.collectionId,
          quantity: input.quantity,
        },
      });
      if (result) return "Quantity updated";
      return "Error";
    }),
});

export type AppRouter = typeof appRouter;
