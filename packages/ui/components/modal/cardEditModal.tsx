"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";

export function CardEditModal() {
  const categoryList = [
    "Mystery",
    "Poetry",
    "Fiction",
    "Biography",
    "Romance",
    "Adventure",
    "Historical",
    "Thriller ",
    "Horror",
    "All",
  ];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>Edit</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Details
              </ModalHeader>
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
                <Input endContent label="Image" placeholder="Enter Image URL" />
                <Input
                  endContent
                  label="Published Date"
                  placeholder="Enter Published Date"
                />
                <Select label="Category" placeholder="Select Category">
                  {categoryList.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </Select>
                <Input endContent label="Rating" placeholder="Enter rating" />
                <Input endContent label="Price" placeholder="Enter price" />
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
                  Save Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
