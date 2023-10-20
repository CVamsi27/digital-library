import prisma from "prisma";
import { categorySchema } from "zod-schemas";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    getCategories: publicProcedure.query(async () => {
        const category = await prisma.category.findMany();
        return categorySchema.safeParse(category);
    })
});

export type AppRouter = typeof appRouter;