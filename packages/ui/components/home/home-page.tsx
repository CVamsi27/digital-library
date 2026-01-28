import { Button, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSource } from "../../context";

export function HomePage() {
  const router = useRouter();
  const { selectedSource, setSelectedSource } = useSource();
  return (
    <div className="relative isolate px-0 pt-0 lg:px-8 mt-20">
      <div className="mx-auto">
        <div className="text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-wide bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Digital Library
          </motion.h1>
          <motion.div
            className="mt-8 items-center justify-center space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium">Choose Book Source</label>
              <Select
                placeholder="Select a source"
                selectedKeys={[selectedSource]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as "google" | "openlibrary";
                  setSelectedSource(selected);
                }}
                className="w-48"
              >
                <SelectItem key="google" value="google">
                  Google Books
                </SelectItem>
                <SelectItem key="openlibrary" value="openlibrary">
                  Open Library
                </SelectItem>
              </Select>
            </div>
            <Button
              color="primary"
              size="lg"
              className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
              onPress={() => {
                router.push("/categories");
              }}
            >
              Browse Categories
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
