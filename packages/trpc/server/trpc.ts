import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth/next";
import prisma from "../../prisma";

const t = initTRPC.create();

const isAuth = t.middleware(async (opts) => {
  const session = await getServerSession();

  if (!session || !session?.user?.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const userId = await prisma.user.findFirst({
    select: {
      id: true,
    },
    where: {
      email: session?.user?.email,
    },
  });

  return opts.next({
    ctx: {
      userId: userId?.id,
      name: session?.user?.name,
      email: session?.user?.email,
      expires: session.expires,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
