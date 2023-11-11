"use client";
import { CartTable } from "ui";
import { t } from "trpc/client/client";
import { Loading } from "ui";
import { defaultUseQueryParams } from "lib";

export default function Page(): JSX.Element {
  const {
    data: cartDetails,
    isLoading: isLoadingCartDetails,
    refetch: refetchCartData,
    isFetching: isFetchingCartDetails,
  } = t.getCartDetails.useQuery(undefined, defaultUseQueryParams);

  return (
    <>
      {isLoadingCartDetails || isFetchingCartDetails ? (
        <Loading />
      ) : !cartDetails || cartDetails.length === 0 ? (
        <div className="flex justify-center items-center mt-80">
          <p className="text-3xl text-gray-600">Your Cart is Empty</p>
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
