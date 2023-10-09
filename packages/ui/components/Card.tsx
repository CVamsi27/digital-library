"use client";

import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { CartIcon } from "./icons/CartIcon";
import { CardEditModal } from "./modal/CardEditModal";
import { AvailableIcon } from "./icons/AvailableIcon";
import { NotAvailableIcon } from "./icons/NotAvailableIcon";

export function CardCustom() {
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
        <Card
          shadow="sm"
          key={index}
          className="m-10 p-2"
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="object-cover h-[240px] w-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <div className="w-full mt-2 text-center">
              <p>Title: {item.title}</p>
              <p>Author: {item.author}</p>
              <p>Publisehed Date: {item.publishedDate}</p>
              <p>Category: {item.category}</p>
              <p>Rating: {item.rating}</p>
              <div className="flex justify-center">
                <p>Availibility: </p>
                <div className="ml-1 mt-0.5">
                  {item.available ? <AvailableIcon /> : <NotAvailableIcon />}
                </div>
              </div>
              <p>Price: {item.price}</p>
              <div className="flex mt-2 justify-end">
                <CardEditModal />
                <Button isIconOnly className="ml-2">
                  <CartIcon />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
