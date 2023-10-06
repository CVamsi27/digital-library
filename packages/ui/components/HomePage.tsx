import { Button } from "@nextui-org/react";
import { GitHubIcon } from "./icons/GitHubIcon";
import { GmailIcon } from "./icons/GmailIcon";

export function HomePage() {
  return (
    <div className="no-scrollbar">
      <div className="relative isolate px-0 pt-0 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Digital Library
            </h1>
            <p className="mt-6 text-lg leading-8">
              - Made by Chandaluri Vamsi Krishna
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                isIconOnly
                onPress={() =>
                  window.open(
                    "https://github.com/CVamsi27/digital-library",
                    "_blank",
                  )
                }
              >
                <GitHubIcon />
              </Button>
              <Button
                isIconOnly
                onPress={() =>
                  window.open("mailto:cvamsik99@gmail.com", "_blank")
                }
              >
                <GmailIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
