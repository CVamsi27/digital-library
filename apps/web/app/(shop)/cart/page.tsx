"use client";
import { CartTable } from "ui";
import { t } from "trpc/client/client";
import { Loading } from "ui";
import { defaultUseQueryParams } from "lib";
import { useSession } from "next-auth/react";

export default function Page(): JSX.Element {
  const {
    data: cartDetails,
    isLoading: isLoadingCartDetails,
    refetch: refetchCartData,
    isFetching: isFetchingCartDetails,
  } = t.getCartDetails.useQuery(undefined, defaultUseQueryParams);
  const { data: session } = useSession();

  return (
    <>
      {isLoadingCartDetails || isFetchingCartDetails ? (
        <Loading />
      ) : !cartDetails || cartDetails.length === 0 ? (
        <div className="flex justify-center items-center mt-80">
          <p className="text-3xl text-gray-600">
            {!session ? "Please Login to View Cart" : "Your Cart is Empty"}
          </p>
        </div>
      ) : (
        <CartTable
          cartDetails={cartDetails}
          refetchCartData={refetchCartData}
        />
      )}
    </>
  );
}
