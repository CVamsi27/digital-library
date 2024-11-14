import { Input } from "@nextui-org/react";
import { Search } from "../../icons/search";

export const NavSearch = () => {
  return (
    <Input
      className="max-w-xs"
      label="Search"
      isClearable
      radius="lg"
      size="sm"
      classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
      }}
      placeholder="Type to search..."
      startContent={
        <Search className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      }
    />
  );
};
