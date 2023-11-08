import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function HomePage() {
  const router = useRouter();
  return (
    <div className="no-scrollbar">
      <div className="relative isolate px-0 pt-0 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-wide sm:text-8xl font-sans">
              Digital Library
            </h1>
            <p className="mt-6 text-lg tracking-wide leading-8">
              - Made by Chandaluri Vamsi Krishna
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                onPress={() =>
                  window.open("https://github.com/CVamsi27", "_blank")
                }
              >
                My Github Profile
              </Button>
              <Button
                onPress={() =>
                  window.open("mailto:cvamsik99@gmail.com", "_blank")
                }
              >
                Contact Me
              </Button>
            </div>
            <div className="mt-8 items-center justify-center">
              <Button
                color="primary"
                onPress={() => {
                  router.push("/categories")
                }}
              >
                View Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
