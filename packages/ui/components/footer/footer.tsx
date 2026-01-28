import { Copyright, Heart } from "lucide-react";
import { Connections } from "./connections";
import { motion } from "framer-motion";

export const Footer = (): JSX.Element => {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <motion.footer
      className="bottom-0 w-full flex flex-col md:flex-row justify-center gap-2 md:justify-between border-t-1 p-2 backdrop-blur-sm bg-background/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="flex flex-row gap-2 items-center justify-center h-full">
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Copyright className="hover:text-primary-500 cursor-pointer" />
          </motion.div>
          <span className="text-sm sm:text-base">{year}, Built with</span>
        </div>
        <div className="flex gap-2 items-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="text-red-500 hover:text-pink-500 cursor-pointer" />
          </motion.div>
          <span className="text-sm sm:text-base">by Vamsi Krishna</span>
        </div>
      </div>
      <Connections />
    </motion.footer>
  );
};
