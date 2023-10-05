'use client'

import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export function CardCustom() {
  const list = [
    {
      title: "The Psychology of Money",
      img: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww&w=1000&q=80",
      price: "$5.50",
    },
    {
      title: "A Million to One",
      img: "https://designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
      price: "$3.00",
    },
    {
      title: "Memory",
      img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564",
      price: "$10.00",
    },
    {
      title: "Last Hope",
      img: "https://imgv3.fotor.com/images/gallery/Fiction-Book-Covers.jpg",
      price: "$5.30",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 m-10">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable className="m-10 p-2" onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="object-cover h-[240px] w-[140px] justify-center"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
