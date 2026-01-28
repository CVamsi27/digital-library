import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { auth } from "next-auth/v5";

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const session = await auth();
  return {
    session,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new Error("Unauthorized");
    }
    return next();
  })
);