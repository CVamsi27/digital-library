"use client";

import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { CardEditModal } from "../modal/cardEditModal";
import { Star } from "../../icons/star";
import { CollectionProps } from "../../../types";
import { t } from "../../../trpc/client/client";
import { TRPCError } from "../../../trpc";
import { useRouter } from "next/navigation";

export function CollectionCard(props: CollectionProps) {
  const router = useRouter();
  const { collections, userId, isAdmin } = props;
  const collectionsArray = Object.values(collections);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const { mutateAsync: postCartItemMutation, isLoading: isLoadingAddToCart } =
    t.postToCart.useMutation();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 mx-10">
      {collectionsArray.map((item) => (
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
          <CardFooter className="justify-end">
            <div className="flex">
              {isAdmin ? <CardEditModal /> : <></>}
              <Button
                isDisabled={!item.available || !userId}
                color="primary"
                className="ml-2"
                isLoading={isLoadingAddToCart}
                onPress={async () => {
                  if (!userId) {
                    throw new TRPCError({ code: "UNAUTHORIZED" });
                  }
                  const message = await postCartItemMutation({
                    collectionId: item.id,
                    userId: userId,
                  });
                  alert(message);
                  router.push("/cart");
                }}
              >
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
