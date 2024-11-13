import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function HomePage() {
  const router = useRouter();
  return (
    <div className="relative isolate px-0 pt-0 lg:px-8 md:mt-20">
      <div className="mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-wide sm:text-8xl font-sans">
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
