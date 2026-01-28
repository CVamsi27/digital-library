"use client";

import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { GoogleBooksVolume } from "../../../types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../../hooks";
import { useCart } from "../../context";

export function CollectionCard({ books }: { books: GoogleBooksVolume[] }): JSX.Element {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const { addToCart } = useCart();

  const options = { year: "numeric", month: "short", day: "2-digit" };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {books.map((item) => {
        const isItemLoading = loadingState[item.id] || false;
        const isbn10 = item.volumeInfo.industryIdentifiers?.find(
          (id) => id.type === "ISBN_10"
        )?.identifier;
        const authors = item.volumeInfo.authors?.join(", ") || "Unknown";
        const image = item.volumeInfo.imageLinks?.thumbnail || "";
        const publishedDate = item.volumeInfo.publishedDate || "";
        const price = 10; // default price
        return (
          <motion.div key={item.id} variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card shadow="lg" className="m-6 p-2 hover:shadow-2xl transition-shadow duration-300">
              <CardBody className="overflow-visible p-0 flex items-center justify-center">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.volumeInfo.title}
                  className="object-cover h-[240px] w-[140px] transition-transform duration-300 hover:scale-110"
                  src={image}
                />
                <div className="w-full mt-4 ml-4 text-left">
                  <p className="p-1 font-extrabold text-lg line-clamp-2">{item.volumeInfo.title}</p>
                  <p className="p-1 text-xs text-gray-600">
                    by {authors} |{" "}
                    {publishedDate
                      ? new Date(publishedDate).toLocaleDateString(
                          "en-US",
                          options as Intl.DateTimeFormatOptions,
                        )
                      : "Unknown"
                    }
                  </p>
                  <p className="p-1 text-xl font-semibold text-green-600">${price}</p>
                </div>
              </CardBody>
              <CardFooter className="justify-end" key={item.id}>
                <Button
                  isDisabled={isItemLoading}
                  color="primary"
                  className="ml-2 shadow-md hover:shadow-lg transition-shadow duration-200"
                  isLoading={isItemLoading}
                  onPress={() => {
                    setLoadingState((prevLoadingState) => ({
                      ...prevLoadingState,
                      [item.id]: true,
                    }));

                    addToCart({
                      id: item.id,
                      title: item.volumeInfo.title,
                      authors: item.volumeInfo.authors || [],
                      image,
                      price,
                      isbn10,
                    });

                    setLoadingState((prevLoadingState) => ({
                      ...prevLoadingState,
                      [item.id]: false,
                    }));

                    toast({ message: "Added to cart" });
                    router.push("/cart");
                  }}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
