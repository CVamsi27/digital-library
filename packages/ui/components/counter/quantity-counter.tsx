"use client";

import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { t } from "../../../trpc/client/client";

interface QuantityProps {
  itemId: number;
  collectionId: number;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<Record<number, number>>>;
}

export function QuantityCounter({
  itemId,
  collectionId,
  quantity,
  setQuantity,
}: QuantityProps) {
  const { mutate: quantityMutate } = t.editQuantity.useMutation();
  return (
    <div className="flex">
      <Button
        isDisabled={quantity === 1}
        isIconOnly
        onPress={() => {
          setQuantity((previousState) => ({
            ...previousState,
            [itemId]: quantity - 1,
          }));
          quantityMutate({
            cartId: itemId,
            collectionId,
            quantity,
          });
        }}
      >
        -
      </Button>
      <div className="text-lg p-2 mx-1">{quantity}</div>
      <Button
        isDisabled={quantity === 10}
        isIconOnly
        onPress={() => {
          setQuantity((previousState) => ({
            ...previousState,
            [itemId]: quantity + 1,
          }));
          quantityMutate({
            cartId: itemId,
            collectionId,
            quantity,
          });
        }}
      >
        +
      </Button>
    </div>
  );
}
