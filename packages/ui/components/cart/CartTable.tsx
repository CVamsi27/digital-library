import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button } from "@nextui-org/react";

const rows = [
    {
        key: "1",
        bookTitle: "Tony Reichert",
        quantity: "1",
        price: "$5.50",
    },
    {
        key: "2",
        bookTitle: "Zoey Lang",
        quantity: "1",
        price: "$5.50",
    },
    {
        key: "3",
        bookTitle: "Jane Fisher",
        quantity: "1",
        price: "$5.50",
    },
    {
        key: "4",
        bookTitle: "William Howard",
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
        <div className="no-scrollbar m-6">
            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        <div className="flex justify-center m-10">
            <div>Total Price: $12</div>
        </div>
        <div className="flex justify-center">
            <Button>Place Order</Button>
        </div>
        </>
    );
}
