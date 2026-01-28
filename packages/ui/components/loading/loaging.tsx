import { CircularProgress } from "@nextui-org/react";
import { motion } from "framer-motion";

export function Loading(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          classNames={{
            svg: "w-16 h-16",
            indicator: "stroke-gradient-to-r from-blue-500 to-purple-500",
          }}
        />
      </motion.div>
    </div>
  );
}
