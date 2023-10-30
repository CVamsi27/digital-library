"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginView, Loading } from "ui";

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (session) {
    router.push("/auth-callback");
  }

  return <>{status === "loading" ? <Loading /> : <LoginView />}</>;
}
