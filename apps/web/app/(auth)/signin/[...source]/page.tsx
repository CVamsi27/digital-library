"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginView, Loading } from "ui";
import { useSearchParams } from "next/navigation";
import { t } from "trpc/client/client";
import { SourceProps } from "types";
import { defaultUseQueryParams } from "lib";

export default function SignIn({ params }: SourceProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const collectionId = searchParams.get("collectionId");
  const { mutate: postCartItemMutation, isLoading: addToCartLoading } =
    t.postToCart.useMutation();
  const { data: userId, isLoading: getUserIdLoading } = t.getUserId.useQuery(
    undefined,
    defaultUseQueryParams,
  );

  if (collectionId && userId && session) {
    postCartItemMutation({
      collectionId: Number(collectionId),
      userId: userId,
    });
    router.push("/cart");
  } else if (session) {
    router.push("/" + params.source.join("/"));
  } else if (collectionId) {
    router.push(
      "/signin/" + params.source.join("/") + "?collectionId=" + collectionId,
    );
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
