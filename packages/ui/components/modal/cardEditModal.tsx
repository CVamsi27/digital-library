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
import { CardEditProps } from "../../../types";
import { t } from "../../../trpc/client/client";
import { useState } from "react";

export function CardEditModal({
  categoryList,
  collectionData,
  refetchCollection,
}: CardEditProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const categoriesArray = Object.values(categoryList);
  const {
    mutateAsync: editCollectionMutation,
    isLoading: isLoadingEditCollection,
  } = t.editCollection.useMutation();

  const [title, setTitle] = useState(collectionData.title);
  const [author, setAuthor] = useState(collectionData.author);
  const [publishedDate, setPublishedDate] = useState(
    collectionData.publishedDate,
  );
  const [rating, setRating] = useState(collectionData.rating);
  const [available, setAvailable] = useState(collectionData.available);
  const [categoryId, setCategoryId] = useState(collectionData.categoryId);
  const [img, setImg] = useState(collectionData.img);
  const [price, setPrice] = useState(collectionData.price);
  const [category, setCategory] = useState(collectionData.category.name);
  return (
    <>
      <Button
        onPress={async () => {
          onOpen();
        }}
      >
        Edit
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
                Update Details
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent
                  label="Title"
                  placeholder="Enter title"
                  value={title}
                  onValueChange={setTitle}
                />
                <Input
                  endContent
                  label="Author"
                  placeholder="Enter Author name"
                  value={author}
                  onValueChange={setAuthor}
                />
                <Input
                  endContent
                  label="Image"
                  placeholder="Enter Image URL"
                  value={img ?? ""}
                  onValueChange={setImg}
                />
                <Input
                  endContent
                  label="Published Date"
                  placeholder="Format - yyyy-mm-dd"
                  value={new Date(publishedDate).toISOString().split("T")[0]}
                  onChange={(e) => {
                    const pd = new Date(
                      e.target.value + "T00:00:00",
                    ).toISOString();
                    setPublishedDate(pd);
                  }}
                />
                <Select
                  label="Category"
                  placeholder="Select Category"
                  selectedKeys={[category]}
                  defaultSelectedKeys={[category]}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    const category = categoriesArray.find(
                      (c) => c.name === e.target.value,
                    );
                    setCategoryId(category?.id ?? 1);
                  }}
                >
                  {categoriesArray.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  endContent
                  type="number"
                  label="Rating"
                  placeholder="Enter rating"
                  value={String(rating)}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <Input
                  endContent
                  type="number"
                  label="Price"
                  placeholder="Enter price"
                  value={String(price)}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    defaultSelected={available}
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
                  isLoading={isLoadingEditCollection}
                  onPress={async () => {
                    const message = await editCollectionMutation({
                      itemId: collectionData.id,
                      data: {
                        title: title,
                        author: author,
                        publishedDate: publishedDate,
                        rating: rating,
                        available: available,
                        categoryId: categoryId,
                        img: img,
                        price: price,
                      },
                    });
                    alert(message);
                    await refetchCollection();
                  }}
                >
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
