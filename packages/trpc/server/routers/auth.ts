import { router, publicProcedure } from "../trpc";
import { loginSchema, registerSchema } from "../../../zod-schemas";
import bcrypt from "bcryptjs";
import prisma from "../../../prisma";

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const existing = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existing) throw new Error("User already exists");
      const hashedPassword = await bcrypt.hash(input.password, 10);
      await prisma.user.create({
        data: {
          username: input.username,
          email: input.email,
          password: hashedPassword,
          provider: "credentials",
        },
      });
      return { success: true };
    }),
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!user || !user.password || !(await bcrypt.compare(input.password, user.password))) {
        throw new Error("Invalid credentials");
      }
      return { success: true };
    }),
});