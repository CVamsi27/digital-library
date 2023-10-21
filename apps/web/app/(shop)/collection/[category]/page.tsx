import { CardAddModal, CollectionCard, Loading } from "ui";
import { trpc } from "@/app/_trpc/client";

export default function Page({
  params,
}: {
  params: { categoryId: number };
}): JSX.Element {
  const { data: collections, isLoading } = trpc.getCollection.useQuery({
    categoryId: params.categoryId,
  });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !collections ? (
        <div></div>
      ) : (
        <>
          <div className="flex justify-end mt-4 mr-4">
            <CardAddModal />
          </div>
          <CollectionCard />
        </>
      )}
    </>
  );
}
