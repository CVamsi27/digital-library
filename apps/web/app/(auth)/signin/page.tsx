"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginView, Loading } from "ui";
import { useSearchParams } from "next/navigation";
import { t } from "trpc/client/client";
import { defaultUseQueryParams } from "lib";

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const collectionId = searchParams.get("collectionId");
  const { data: userId, isLoading: getUserIdLoading } = t.getUserId.useQuery(
    undefined,
    defaultUseQueryParams,
  );
  const { mutate: postCartItemMutation, isLoading: addToCartLoading } =
    t.postToCart.useMutation();
  const dataMigration = () => {
    if (status === "loading" || addToCartLoading || getUserIdLoading) {
      return <Loading />;
    } else if (collectionId && userId && session) {
      postCartItemMutation({
        collectionId: Number(collectionId),
        userId: userId,
      });
      if (addToCartLoading) return <Loading />;
      else router.push("/cart");
    } else if (session) {
      router.push("/");
    } else {
      return <LoginView />;
    }
  };

  return <>{dataMigration()}</>;
}
