import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth/next";

const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getServerSession();

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userName: session?.user?.name,
      email: session?.user?.email,
      expires: session.expires,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
