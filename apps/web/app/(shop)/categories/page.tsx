"use client";
import { CategoryCard } from "ui";
import { trpc } from "@/app/_trpc/client";
import { CategoryProps } from "types";
import { serverClient } from "@/app/_trpc/serverClient";

export default function Categories() {
  const { data: categories, isLoading } = trpc.getCategories.useQuery();
  return (
    <>
      {isLoading ? <div>Loading</div>
        : <CategoryCard categories={categories} />
      }
    </>
  );
}
