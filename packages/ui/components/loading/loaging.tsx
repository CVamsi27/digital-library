import { CircularProgress } from "@nextui-org/react";

export function Loading() {
  return (
    <div className="flex justify-center items-center mt-80">
      <CircularProgress aria-label="Loading..." size="lg" />
    </div>
  );
}
