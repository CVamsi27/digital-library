"use client";

import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { CardEditModal } from "../modal/cardEditModal";
import { Star } from "../../icons/star";

export function CollectionCard() {
  const list = [
    {
      title: "The Psychology of Money",
      author: "Vamsi Krishna",
      publishedDate: "27/10/1999",
      rating: "4.5",
      available: true,
      category: "Fiction",
      img: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww&w=1000&q=80",
      price: "$5.50",
    },
    {
      title: "A Million to One",
      author: "Vamsi Krishna",
      publishedDate: "27/10/1999",
      rating: "4.5",
      available: true,
      category: "Fiction",
      img: "https://designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
      price: "$3.00",
    },
    {
      title: "Memory",
      author: "Vamsi Krishna",
      publishedDate: "27/10/1999",
      rating: "4.5",
      available: true,
      category: "Fiction",
      img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564",
      price: "$10.00",
    },
    {
      title: "Last Hope",
      author: "Vamsi Krishna",
      publishedDate: "27/10/1999",
      rating: "4.5",
      available: false,
      category: "Fiction",
      img: "https://imgv3.fotor.com/images/gallery/Fiction-Book-Covers.jpg",
      price: "$5.30",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 mx-10">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} className="m-6 p-2">
          <CardBody className="overflow-visible p-0 flex items-center justify-center">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="object-cover h-[240px] w-[140px]"
              src={item.img}
            />
            <div className="w-full mt-4 ml-4 text-left">
              <div className="flex mr-4 justify-end">
                <p className="mr-1">{item.rating}</p>
                <Star />
              </div>
              <p className="p-1 font-extrabold text-lg">{item.title}</p>
              <p className="p-1 text-xs">
                by {item.author} | {item.publishedDate} | {item.category}
              </p>
              <p className="p-1 text-xl">{item.price}</p>
            </div>
          </CardBody>
          <CardFooter className="justify-end">
            <div className="flex">
              <CardEditModal />
              <Button
                isDisabled={!item.available}
                color="primary"
                className="ml-2"
              >
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
