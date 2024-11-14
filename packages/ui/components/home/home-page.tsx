import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function HomePage() {
  const router = useRouter();
  return (
    <div className="relative isolate px-0 pt-0 lg:px-8 mt-20">
      <div className="mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-wide">
            Digital Library
          </h1>
          <div className="mt-8 items-center justify-center">
            <Button
              color="primary"
              onPress={() => {
                router.push("/categories");
              }}
            >
              Start Bookmarking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
