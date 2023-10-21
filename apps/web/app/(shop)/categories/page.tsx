"use client";
import { CategoryCard, Loading } from "ui";
import { trpc } from "@/app/_trpc/client";

export default function Categories() {
  const { data: categories, isLoading } = trpc.getCategories.useQuery();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !categories ? (
        <div></div>
      ) : (
        <CategoryCard {...categories} />
      )}
    </>
  );
}
