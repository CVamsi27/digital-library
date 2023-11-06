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
      ) : !cartDetails ? (
        <></>
      ) : (
        <CartTable
          cartDetails={cartDetails}
          refetchCartData={refetchCartData}
        />
      )}
    </>
  );
}
