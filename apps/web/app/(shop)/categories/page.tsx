"use client";
import { CategoryCard, Loading } from "ui";
import { t } from "trpc/client/client";

export default function Categories() {
  const { data: categories, isLoading } = t.getCategories.useQuery();
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
