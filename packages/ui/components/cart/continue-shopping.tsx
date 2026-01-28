"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const ContinueShopping = () => {
  const router = useRouter();
  return (
    <Button
      color="primary"
      onPress={() => {
        router.push("/categories");
      }}
    >
      Continue Shopping
    </Button>
  );
};
