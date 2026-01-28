"use client";

import { Button } from "@nextui-org/react";

interface QuantityProps {
  itemId: string;
  collectionId: string;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export function QuantityCounter({
  itemId,
  quantity,
  setQuantity,
}: QuantityProps) {
  return (
    <div className="flex">
      <Button
        isDisabled={quantity === 1}
        isIconOnly
        onPress={() => setQuantity(quantity - 1)}
      >
        -
      </Button>
      <div className="text-lg p-2 mx-1">{quantity}</div>
      <Button
        isDisabled={quantity === 10}
        isIconOnly
        onPress={() => setQuantity(quantity + 1)}
      >
        +
      </Button>
    </div>
  );
}
