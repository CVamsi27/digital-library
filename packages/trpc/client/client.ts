import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "../server/routers";
import { httpBatchLink } from "../client";

export const t = createTRPCReact<AppRouter>({});

function absoluteUrl(path: string) {
    return process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}${path}`
        : `http://localhost:${process.env.PORT ?? 3000
        }${path}`
        ;
};

export const tClient = t.createClient({
    links: [
        httpBatchLink({
            url: absoluteUrl("/api/trpc"),
        }),
    ],
});