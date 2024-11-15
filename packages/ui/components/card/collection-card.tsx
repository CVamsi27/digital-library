"use client";

import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { CardEditModal } from "../modal/card-edit-modal";
import { Star } from "../../icons/star";
import { CollectionProps } from "../../../types";
import { t } from "../../../trpc/client/client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../../hooks";

export function CollectionCard({
  collections,
  userId,
  isAdmin,
  categoryList,
  refetchCollection,
}: CollectionProps): JSX.Element {
  const router = useRouter();
  const params = usePathname();
  const collectionsArray = Object.values(collections);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const { mutateAsync: postCartItemMutation, isLoading } =
    t.postToCart.useMutation();
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-10">
      {collectionsArray.map((item) => {
        const isItemLoading = loadingState[item.id] || false;
        return (
          <Card shadow="sm" key={item.id} className="m-6 p-2">
            <CardBody className="overflow-visible p-0 flex items-center justify-center">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="object-cover h-[240px] w-[140px]"
                src={item.img ?? ""}
              />
              <div className="w-full mt-4 ml-4 text-left">
                <div className="flex mr-4 justify-end">
                  <p className="mr-1">{item.rating}</p>
                  <Star />
                </div>
                <p className="p-1 font-extrabold text-lg">{item.title}</p>
                <p className="p-1 text-xs">
                  by {item.author} |{" "}
                  {new Date(item.publishedDate).toLocaleDateString(
                    "en-US",
                    options as Intl.DateTimeFormatOptions,
                  )}{" "}
                  | {item.category.name}
                </p>
                <p className="p-1 text-xl">${item.price}</p>
              </div>
            </CardBody>
            <CardFooter className="justify-end" key={item.id}>
              <div className="flex">
                {isAdmin ? (
                  <CardEditModal
                    categoryList={categoryList}
                    collectionData={item}
                    refetchCollection={refetchCollection}
                  />
                ) : (
                  <div />
                )}
                <Button
                  isDisabled={!item.available || isItemLoading}
                  color="primary"
                  className="ml-2"
                  isLoading={isItemLoading}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises -- required
                  onPress={async () => {
                    if (!userId) {
                      router.push(
                        "/signin/" + params + "?collectionId=" + item.id,
                      );
                      return;
                    }

                    setLoadingState((prevLoadingState) => ({
                      ...prevLoadingState,
                      [item.id]: true,
                    }));

                    const message = await postCartItemMutation({
                      collectionId: item.id,
                      userId,
                    });

                    if (!isLoading) {
                      setLoadingState((prevLoadingState) => ({
                        ...prevLoadingState,
                        [item.id]: false,
                      }));
                    }

                    toast({ message: message });
                    router.push("/cart");
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
