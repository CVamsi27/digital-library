"use client";

import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { CardEditModal } from "../modal/cardEditModal";
import { Star } from "../../icons/star";
import { CollectionArrayProps } from "../../../types";

export function CollectionCard(collections: CollectionArrayProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 mx-10">
      {collections.map((item, index) => (
        <Card shadow="sm" key={index} className="m-6 p-2">
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
                by {item.author} | {item.publishedDate} | {item.category.name}
              </p>
              <p className="p-1 text-xl">{item.price}</p>
            </div>
          </CardBody>
          <CardFooter className="justify-end">
            <div className="flex">
              <CardEditModal />
              <Button
                isDisabled={!item.available}
                color="primary"
                className="ml-2"
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
