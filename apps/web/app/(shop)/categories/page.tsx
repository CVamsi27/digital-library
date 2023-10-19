import { CategoryCard } from "ui";
import axios from "axios";
import { CategoryProps } from "types";

export default async function Categories() {
  const categories: CategoryProps = (
    await axios.get((process.env.API_URL ?? "") + "/api/category")
  ).data;
  return (
    <>
      <CategoryCard {...categories} />
    </>
  );
}
