"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginView, Loading } from "ui";
import { useSearchParams } from "next/navigation";
import { t } from "trpc/client/client";
import { SourceProps } from "types";

export default function SignIn({ params }: SourceProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const collectionId = searchParams.get("collectionId");
  const { mutate: postCartItemMutation, isLoading: addToCartLoading } =
    t.postToCart.useMutation();
  const { data: userId, isLoading: getUserIdLoading } = t.getUserId.useQuery();

  if (collectionId && userId && session) {
    postCartItemMutation({
      collectionId: Number(collectionId),
      userId: userId,
    });
    router.push("/cart");
  } else if (session) {
    router.push("/");
  } else {
    router.push("/signin/" + params.source.join("/"));
  }

  return (
    <>
      {status === "loading" || addToCartLoading || getUserIdLoading ? (
        <Loading />
      ) : (
        <LoginView />
      )}
    </>
  );
}
