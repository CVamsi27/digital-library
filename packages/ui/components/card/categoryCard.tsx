"use client";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/react";

export function CategoryCard() {
  const categoryList = [
    {
      name: "Mystery",
      color: "bg-blue-500/40"
    },
    {
      name: "Poetry",
      color: "bg-lime-500/40"
    },
    {
      name: "Fiction",
      color: "bg-sky-500/40"
    },
    {
      name: "Biography",
      color: "bg-teal-500/40"
    },
    {
      name: "Romance",
      color: "bg-yellow-500/40"
    },
    {
      name: "Adventure",
      color: "bg-rose-500/40"
    },
    {
      name: "Historical",
      color: "bg-indigo-500/40"
    },
    {
      name: "Thriller",
      color: "bg-fuchsia-500/40"
    },
    {
      name: "Horror",
      color: "bg-green-500/40"
    },
    {
      name: "All",
      color: "bg-orange-500/40"
    }
  ];
  let navigation = "/collection/";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 m-10">
      {categoryList.map((item) => (
        <Link href={navigation + item.name.toLowerCase()} key="{item}">
          <Card className="my-4 mx-10" key="{item}">
            <CardBody className={"text-center p-20 text-3xl "+item.color} key="{item}">
              {item.name}
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
