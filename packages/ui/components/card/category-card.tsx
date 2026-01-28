"use client";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { CategoryProps } from "../../../types";

export function CategoryCard({ categories }: { categories: CategoryProps }) {
  const navigation = "/collection/";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-6 m-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          <Link href={navigation + item.name.toLowerCase().replace(/\s+/g, '-')}>
            <Card className="hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardBody
                className={
                  "text-center text-lg sm:p-20 sm:text-3xl transition-colors duration-300 hover:bg-gradient-to-br " + item.color
                }
              >
                {item.name}
              </CardBody>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
