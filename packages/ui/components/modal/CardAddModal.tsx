"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, useDisclosure } from "@nextui-org/react";

export function CardAddModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>
        Add Item
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Details</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent
                  label="Title"
                  placeholder="Enter title"
                />
                <Input
                  endContent
                  label="Author"
                  placeholder="Enter Author name"
                />
                <Input
                  endContent
                  label="Image"
                  placeholder="Enter Image URL"
                />
                <Input
                  endContent
                  label="Published Date"
                  placeholder="Enter Published Date"
                />
                <Input
                  endContent
                  label="Rating"
                  placeholder="Enter rating"
                />
                <Input
                  endContent
                  label="Price"
                  placeholder="Enter price"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Available
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

