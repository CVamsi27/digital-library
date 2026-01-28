import { httpBatchLink } from "@trpc/client";
import { t } from "./index";

export const client = t.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});