import { CircularProgress } from "@nextui-org/react";

export function Loading(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <CircularProgress aria-label="Loading..." size="lg" />
    </div>
  );
}
