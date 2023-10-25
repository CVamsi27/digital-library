"use client";
import { CardAddModal, CollectionCard, Loading } from "ui";
import { t } from "trpc/client/client";
import { defaultUseQueryParams } from "lib";

export default function Page({
  params,
}: {
  params: { categoryId: string };
}): JSX.Element {
  const { data: collections, isLoading: isLoadingCollection } =
    params.categoryId == "10"
      ? t.getCollection.useQuery(undefined, defaultUseQueryParams)
      : t.getCollectionByCategory.useQuery(
          {
            categoryId: Number(params.categoryId),
          },
          defaultUseQueryParams,
        );
  const { data: categoryList, isLoading: isLoadingCategories } =
    t.getCategories.useQuery(undefined, defaultUseQueryParams);

  return (
    <>
      {isLoadingCollection || isLoadingCategories ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-end mt-4 mr-4">
            {categoryList === undefined ? (
              <></>
            ) : (
              <CardAddModal {...categoryList} />
            )}
          </div>
          {collections === undefined ? (
            <></>
          ) : (
            <CollectionCard {...collections} />
          )}
        </>
      )}
    </>
  );
}
