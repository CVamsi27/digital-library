import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { OrderPlacedModal } from "../modal/OrderPlacedModal";

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
    label: "Author"
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
  return (
    <>
      <div className="no-scrollbar m-6 grid grid-cols-4 gap-4">
        <Table aria-label="Cart Details" className="col-span-3">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows} emptyContent={"Cart is Empty"}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Table aria-label="Price Details" className="col-span-1">
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
              <TableCell className="text-primary-500 font-bold">Total Price</TableCell>
              <TableCell className="text-primary-500 text-right font-bold">$12.5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end mr-6">
        <OrderPlacedModal />
      </div>
    </>
  );
}
