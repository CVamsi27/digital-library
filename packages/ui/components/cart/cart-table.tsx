"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { QuantityCounter } from "../counter/quantity-counter";
import { CartItem } from "../../../types";
import { useCart } from "../../context";
import { useState } from "react";
import { useToast } from "../../hooks";
import { ContinueShopping } from "./continue-shopping";

export function CartTable({ cart }: { cart: CartItem[] }): JSX.Element {
  const { toast } = useToast();
  const { removeFromCart, updateQuantity } = useCart();
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

  const options = { year: "numeric", month: "short", day: "2-digit" };

  const totalPrice = cart.reduce((accumulator, val) => {
    return accumulator + val.quantity * val.price;
  }, 0);

  const handleCheckout = () => {
    const isbns = cart
      .map((item) => item.isbn10)
      .filter(Boolean)
      .join(",");
    const url = `https://www.amazon.com/gp/aws/cart/add.html?${cart
      .map((item, index) => {
        if (item.isbn10) {
          return `ASIN.${index + 1}=${item.isbn10}&Quantity.${index + 1}=${item.quantity}`;
        }
        return null;
      })
      .filter(Boolean)
      .join("&")}`;
    window.location.href = url;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="no-scrollbar my-6 sm:my-6 sm:mx-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:mx-10"
          variants={containerVariants}
        >
          {cart.map((item) => {
            const isItemLoading = loadingState[item.id] || false;
            return (
              <motion.div key={item.id} variants={itemVariants} data-testid="cart-item">
                <Card shadow="lg" className="mx-6 mb-6 p-2 hover:shadow-2xl transition-all duration-300">
                  <CardBody className="overflow-visible p-0 flex items-center justify-center">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.title}
                      className="object-cover h-[240px] w-[140px] transition-transform duration-300 hover:scale-105"
                      src={item.image}
                    />
                    <div className="w-full mt-4 ml-4 text-left">
                      <p className="p-1 font-extrabold text-lg line-clamp-2">{item.title}</p>
                      <p className="p-1 text-xs text-gray-600">
                        by {item.authors.join(", ")}
                      </p>
                      <p className="p-1 text-xl font-semibold text-green-600">${item.price}</p>
                    </div>
                  </CardBody>
                  <CardFooter className="justify-between">
                    <QuantityCounter
                      itemId={item.id}
                      collectionId={item.id} // not used
                      quantity={item.quantity}
                      setQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        isDisabled={isItemLoading}
                        color="danger"
                        className="ml-2 shadow-md hover:shadow-lg transition-shadow duration-200"
                        isLoading={isItemLoading}
                        onPress={() => {
                          setLoadingState((prevLoadingState) => ({
                            ...prevLoadingState,
                            [item.id]: true,
                          }));

                          removeFromCart(item.id);

                          setLoadingState((prevLoadingState) => ({
                            ...prevLoadingState,
                            [item.id]: false,
                          }));

                          toast({ message: "Removed from cart" });
                        }}
                      >
                        Remove
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="grid grid-cols-1 sm:col-start-1 sm:col-span-2 lg:col-span-1 xl:col-span-2 lg:col-start-2 xl:col-start-2 mx-6">
        <Table aria-label="Price Details">
          <TableHeader>
            <TableColumn>Price Details</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Price ({cart.length} items)</TableCell>
              <TableCell className="text-right">${totalPrice}</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Delivery Charges</TableCell>
              <TableCell className="text-right">
                {totalPrice === 0 ? "-" : "Free"}
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Discount</TableCell>
              <TableCell className="text-right">$0</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>Secured Packaging Fee</TableCell>
              <TableCell className="text-right">
                ${totalPrice === 0 ? 0 : 0.5}
              </TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell className="text-lg font-bold">Total Price</TableCell>
              <TableCell className="text-lg text-right font-bold">
                ${totalPrice + (totalPrice === 0 ? 0 : 0.5)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-center mt-2">
          <Button color="primary" onPress={handleCheckout}>
            Checkout
          </Button>
        </div>
        <div className="flex justify-center mt-2">
          <ContinueShopping />
        </div>
      </div>
    </div>
  );
}
