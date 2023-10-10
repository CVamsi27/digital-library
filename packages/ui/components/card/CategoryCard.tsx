"use client";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/react";

export function CategoryCard() {
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
  let navigation = "/collection/";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 m-10">
      {categoryList.map((item) => (
        <Link href={navigation + item.toLowerCase()} key="{item}">
          <Card className="my-4 mx-10" key="{item}">
            <CardBody className="text-center" key="{item}">
              {item}
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
