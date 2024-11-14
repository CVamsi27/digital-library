"use client";
import { CartTable } from "ui";
import { t } from "trpc/client/client";
import { Loading } from "ui";
import { defaultUseQueryParams } from "lib";
import { useSession } from "next-auth/react";
import { ContinueShopping } from "ui/components/cart/continue-shopping";

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
        <div className="flex justify-center items-center mt-40">
          {!session ? (
            <p className="text-xl md:text-3xl text-gray-600">
              Please Login to View Cart
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-xl md:text-3xl text-gray-600">
                Your Cart is Empty
              </p>
              <ContinueShopping />
            </div>
          )}
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
