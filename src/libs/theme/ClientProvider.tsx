"use client";

import { Box, ThemeProvider } from "@mui/material";
import { FunctionComponent, ReactNode, Suspense, useEffect } from "react";
import lightTheme from "./lightTheme";
import { Rtl } from "./rtlCache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ACCESS_TOKEN_KEY } from "../constants/keys.constants";
import { useRouter, useSearchParams } from "next/navigation";

interface ClientProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();
const ClientProvider: FunctionComponent<ClientProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessId = searchParams.get("businessId");
  const storageBusinessId = localStorage.getItem("businessId");

  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
      router.push(
        `/login/send-otp?businessId=${businessId || storageBusinessId}`
      );
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Rtl>
        <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
      </Rtl>
    </QueryClientProvider>
  );
};

export default ClientProvider;
