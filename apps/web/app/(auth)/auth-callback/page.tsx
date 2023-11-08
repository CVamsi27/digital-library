"use client";
import { useRouter } from "next/navigation";
import { t } from "trpc/client/client";
import { Loading } from "ui";

const Page = () => {
  const router = useRouter();

  t.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push("/");
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/signin");
      }
    },
    retry: true,
    retryDelay: 500,
  });

  return (
    <div className="w-full mt-8 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loading />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;