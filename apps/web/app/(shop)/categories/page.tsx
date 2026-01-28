"use client";
import { CategoryCard } from "ui";

const categories = [
  { id: 0, name: "All", color: "gray" },
  { id: 1, name: "Fiction", color: "blue" },
  { id: 2, name: "Non-Fiction", color: "green" },
  { id: 3, name: "Science", color: "red" },
  { id: 4, name: "History", color: "yellow" },
  { id: 5, name: "Biography", color: "purple" },
];

export default function Categories() {
  return <CategoryCard categories={categories} />;
}
