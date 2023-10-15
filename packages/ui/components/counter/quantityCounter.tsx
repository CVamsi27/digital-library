"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";

export function QuantityCounter() {
  const [count, setCount] = useState(1);
  return (
    <div className="flex">
      <Button
        isDisabled={count == 1}
        isIconOnly
        onPress={() => setCount((c) => c - 1)}
      >
        -
      </Button>
      <div className="text-lg p-2 mx-1">{count}</div>
      <Button
        isDisabled={count == 10}
        isIconOnly
        onPress={() => setCount((c) => c + 1)}
      >
        +
      </Button>
    </div>
  );
}
