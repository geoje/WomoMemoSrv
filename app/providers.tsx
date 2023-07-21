"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Roboto } from "next/font/google";
import { mode } from "@chakra-ui/theme-tools";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr/_internal";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
export const theme = extendTheme({
  fonts: {
    heading: roboto.style.fontFamily,
    body: roboto.style.fontFamily,
  },
  global: {
    body: {
      bg: mode("gray.50", "gray.800"),
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <CacheProvider>
          <SWRConfig>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </SWRConfig>
        </CacheProvider>
      </SessionProvider>
    </>
  );
}
