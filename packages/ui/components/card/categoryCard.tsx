"use client";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/react";
import { CategoryProps } from "../../../types";

export function CategoryCard(categories: CategoryProps) {
  const navigation = "/collection/";
  console.log(categories[0].name);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 m-10">
      {categories.map((item) => (
        <Link href={navigation + item.name.toLowerCase()} key="{item}">
          <Card className="my-4 mx-10" key="{item}">
            <CardBody
              className={"text-center p-20 text-3xl " + item.color}
              key="{item}"
            >
              {item.name}
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
