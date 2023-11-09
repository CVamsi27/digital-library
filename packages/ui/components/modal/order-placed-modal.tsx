"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { t } from "../../../trpc/client/client";
import { useState } from "react";
import { PlaceOrderProps } from "../../../types";

export function OrderPlacedModal(props: PlaceOrderProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { mutateAsync: placeOrder, isLoading: isLoadingDeleteCart } =
    t.deleteUserCart.useMutation();
  const [output, setOutput] = useState("");
  return (
    <>
      {props.cartLength === 0 ? (
        <Button
          color="primary"
          onPress={() => {
            router.push("/categories");
          }}
        >
          Continue Shopping
        </Button>
      ) : (
        <Button
          isLoading={isLoadingDeleteCart}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises -- required
          onPress={async () => {
            const message = await placeOrder();
            setOutput(message);
            onOpen();
          }}
          color="primary"
          className=" text-lg"
        >
          Place Order
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Order Status
              </ModalHeader>
              <ModalBody>
                <p>{output}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  onPressChange={() => {
                    router.refresh();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    router.push("/categories");
                  }}
                >
                  Continue Shopping
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
