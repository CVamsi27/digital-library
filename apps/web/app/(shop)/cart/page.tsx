"use client";
import { CartTable } from "ui";
import { ContinueShopping } from "ui/components/cart/continue-shopping";
import { useCart } from "ui/context";

export default function Page(): JSX.Element {
  const { cart } = useCart();

  return (
    <>
      {cart.length === 0 ? (
        <div className="flex justify-center items-center mt-40">
          <div className="flex flex-col gap-3">
            <p className="text-xl md:text-3xl text-gray-600">
              Your Cart is Empty
            </p>
            <ContinueShopping />
          </div>
        </div>
      ) : (
        <CartTable cart={cart} />
      )}
    </>
  );
}
