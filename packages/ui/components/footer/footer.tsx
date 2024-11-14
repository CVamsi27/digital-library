import { Copyright, Heart } from "lucide-react";
import { Connections } from "./connections";

export const Footer = (): JSX.Element => {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <footer className="bottom-0 w-full flex flex-col md:flex-row justify-center gap-2 md:justify-between border-t-1 p-2">
      <div className="flex flex-row gap-2 items-center justify-center h-full">
        <div className="flex items-center gap-2">
          <Copyright className="hover:text-primary-500" />
          <span className="text-sm sm:text-base">{year}, Built with</span>
        </div>
        <div className="flex gap-2 items-center">
          <Heart className="text-red-500 hover:text-black" />
          <span className="text-sm sm:text-base">by Vamsi Krishna</span>
        </div>
      </div>
      <Connections />
    </footer>
  );
};
