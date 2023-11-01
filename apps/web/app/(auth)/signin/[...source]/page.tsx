"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginView, Loading } from "ui";
import { SourceProps } from "types";

export default function SignIn({ params }: SourceProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (session) {
    router.push("/auth-callback/" + params.source.join("/"));
  }

  return <>{status === "loading" ? <Loading /> : <LoginView />}</>;
}
