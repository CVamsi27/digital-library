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
import { OrderPlacedModal } from "../modal/orderPlacedModal";
import { Star } from "../../icons/star";
import { QuantityCounter } from "../counter/quantityCounter";

const rows = [
  {
    key: "1",
    bookTitle: "Tony Reichert",
    author: "ABC",
    quantity: "1",
    price: "$5.50",
  },
  {
    key: "2",
    bookTitle: "Zoey Lang",
    author: "ABC",
    quantity: "1",
    price: "$5.50",
  },
  {
    key: "3",
    bookTitle: "Jane Fisher",
    author: "ABC",
    quantity: "1",
    price: "$5.50",
  },
  {
    key: "4",
    bookTitle: "William Howard",
    author: "ABC",
    quantity: "1",
    price: "$5.50",
  },
];

const columns = [
  {
    key: "bookTitle",
    label: "Book Title",
  },
  {
    key: "author",
    label: "Author",
  },
  {
    key: "quantity",
    label: "Quantity",
  },
  {
    key: "price",
    label: "Price",
  },
];

export function CartTable() {
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
    <>
      <div className="no-scrollbar m-6 grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 mx-10">
            {list.map((item, index) => (
              <Card shadow="sm" key={index} className="mx-6 mb-6 p-2">
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
                <CardFooter className="justify-between">
                  <QuantityCounter />
                  <Button color="danger" className="ml-2">
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
                <TableCell>Price (4 items)</TableCell>
                <TableCell className="text-right">$12</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Delivery Charges</TableCell>
                <TableCell className="text-right">Free</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Discount</TableCell>
                <TableCell className="text-right">$0</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>Secured Packaging Fee</TableCell>
                <TableCell className="text-right">$0.5</TableCell>
              </TableRow>
              <TableRow key="5">
                <TableCell className="text-lg font-bold">Total Price</TableCell>
                <TableCell className="text-lg text-right font-bold">
                  $12.5
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-center">
            <OrderPlacedModal />
          </div>
        </div>
      </div>
    </>
  );
}
