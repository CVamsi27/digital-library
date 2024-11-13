"use client";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/react";
import { CategoryProps } from "../../../types";

export function CategoryCard(categories: CategoryProps) {
  const navigation = "/collection/";
  const categoriesArray = Object.values(categories);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-6 m-6">
      {categoriesArray.map((item) => (
        <Link href={navigation + item.id} key="{item}">
          <Card key="{item}" className="hover:bg-primary-500 hover:text-white">
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
