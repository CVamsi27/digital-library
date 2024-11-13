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
import { OrderPlacedModal } from "../modal/order-placed-modal";
import { Star } from "../../icons/star";
import { QuantityCounter } from "../counter/quantity-counter";
import { CartProps } from "../../../types";
import { t } from "../../../trpc/client/client";
import { useState } from "react";
import { useToast } from "../../hooks";

export function CartTable({
  cartDetails,
  refetchCartData,
}: CartProps): JSX.Element {
  const { toast } = useToast();
  const list = Object.values(cartDetails);
  const options = { year: "numeric", month: "short", day: "2-digit" };

  const { mutateAsync: deleteCartItem, isLoading: isLoadingDeleteItem } =
    t.deleteFromCart.useMutation();
  const [loadingState, setLoadingState] = useState<Record<number, boolean>>({});

  const [quantity, setQuantity] = useState<Record<number, number>>(
    cartDetails.reduce((result: Record<number, number>, item) => {
      result[item.id] = item.quantity;
      return result;
    }, {}),
  );

  const totalPrice = list.reduce((accumulator, val) => {
    const itemPrice = quantity[val.id] * val.collection.price;
    return accumulator + itemPrice;
  }, 0);

  return (
    <div className="no-scrollbar m-6 grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 mx-10">
          {list.map((item) => {
            const isItemLoading = loadingState[item.id] || false;
            return (
              <Card shadow="sm" key={item.id} className="mx-6 mb-6 p-2">
                <CardBody className="overflow-visible p-0 flex items-center justify-center">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.collection.title}
                    className="object-cover h-[240px] w-[140px]"
                    src={item.collection.img ?? ""}
                  />
                  <div className="w-full mt-4 ml-4 text-left">
                    <div className="flex mr-4 justify-end">
                      <p className="mr-1">{item.collection.rating}</p>
                      <Star />
                    </div>
                    <p className="p-1 font-extrabold text-lg">
                      {item.collection.title}
                    </p>
                    <p className="p-1 text-xs">
                      by {item.collection.author} |{" "}
                      {new Date(
                        item.collection.publishedDate,
                      ).toLocaleDateString(
                        "en-US",
                        options as Intl.DateTimeFormatOptions,
                      )}{" "}
                      | {item.collection.category.name}
                    </p>
                    <p className="p-1 text-xl">${item.collection.price}</p>
                  </div>
                </CardBody>
                <CardFooter className="justify-between">
                  <QuantityCounter
                    itemId={item.id}
                    collectionId={item.collectionId}
                    quantity={quantity[item.id]}
                    setQuantity={setQuantity}
                  />
                  <Button
                    isDisabled={isItemLoading}
                    color="danger"
                    className="ml-2"
                    isLoading={isItemLoading}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- required
                    onPress={async () => {
                      setLoadingState((prevLoadingState) => ({
                        ...prevLoadingState,
                        [item.id]: true,
                      }));

                      const result = await deleteCartItem({
                        cartId: item.id,
                      });

                      if (!isLoadingDeleteItem) {
                        setLoadingState((prevLoadingState) => ({
                          ...prevLoadingState,
                          [item.id]: false,
                        }));
                      }

                      toast({ message: result });
                      await refetchCartData();
                    }}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="col-span-1 grid grid-cols-1">
        <Table aria-label="Price Details">
          <TableHeader>
            <TableColumn>Price Details</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Price ({list.length} items)</TableCell>
              <TableCell className="text-right">${totalPrice}</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Delivery Charges</TableCell>
              <TableCell className="text-right">
                {totalPrice + totalPrice === 0 ? "-" : "Free"}
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
          <OrderPlacedModal cartLength={list.length} />
        </div>
      </div>
    </div>
  );
}
