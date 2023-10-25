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
import { CategoryProps } from "../../../types";
import { t } from "../../../trpc/client/client";
import { useState } from "react";

export function CardAddModal(categoryList: CategoryProps) {
  const { mutate: postBookMutate } = t.postBookDetails.useMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const categoriesArray = Object.values(categoryList);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [rating, setRating] = useState(5);
  const [available, setAvailable] = useState(true);
  const [categoryId, setCategoryId] = useState(1);
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(1);

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Item
      </Button>
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
                Add Details
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent
                  label="Title"
                  placeholder="Enter title"
                  onValueChange={setTitle}
                />
                <Input
                  endContent
                  label="Author"
                  placeholder="Enter Author name"
                  onValueChange={setAuthor}
                />
                <Input
                  endContent
                  type="url"
                  label="Image"
                  placeholder="Enter Image URL"
                  onValueChange={setImg}
                />
                <Input
                  endContent
                  label="Published Date"
                  placeholder="Format - yyyy-mm-dd"
                  onChange={(e) => {
                    const pd = new Date(e.target.value+"T00:00:00").toISOString();
                    setPublishedDate(pd)
                  }}
                />
                <Select
                  label="Category"
                  placeholder="Select Category"
                  defaultSelectedKeys={["Fiction"]}
                  onChange={(e) => {
                    const c = categoriesArray.find(
                      (c) => c.name === e.target.value,
                    );
                    setCategoryId(c?.id ?? 1);
                  }}
                >
                  {categoriesArray.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  endContent
                  type="number"
                  label="Rating"
                  placeholder="Enter rating"
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <Input
                  endContent
                  type="number"
                  label="Price"
                  placeholder="Enter price"
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    defaultSelected
                    classNames={{
                      label: "text-small",
                    }}
                    onValueChange={setAvailable}
                  >
                    Available
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    try {
                      postBookMutate({
                        title,
                        author,
                        publishedDate,
                        rating,
                        available,
                        categoryId,
                        img,
                        price,
                      });
                      onClose();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
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
