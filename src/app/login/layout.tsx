"use client";
import { useGetPublicProfile } from "@/libs/api/generated/business/business";
import SplashScreen from "@/libs/shared-components/splash-screen/SplashScreen";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FunctionComponent, ReactNode, useMemo } from "react";
import { ReactSVG } from "react-svg";
import { useBusinessIdStore } from "./store";
import DefaultLayout from "@/libs/shared-components/layouts/DeafultLayout";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const businessId = searchParams.get("businessId");
  const { businessId: storedBusinessId, setBusinessId } = useBusinessIdStore();

  const { data, isLoading, isError } = useGetPublicProfile(
    storedBusinessId as any,
    {
      query: {
        enabled: !!storedBusinessId,
      },
    }
  );

  useMemo(() => {
    if (businessId) {
      setBusinessId(businessId);
    }
  }, [businessId]);

  return (
    <DefaultLayout AppBar={<></>}>
      <Stack
        sx={{ minHeight: "100vh" }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        display="flex"
        gap="16px"
      >
        {!storedBusinessId || isError ? (
          <Typography>
            لینک وارد شده معتبر نمیباشد <ErrorTwoToneIcon />
          </Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <ReactSVG
                className="hover:cursor-pointer"
                src="/icons/main-icon-wth-label.svg"
              />
              {isLoading && <CircularProgress size={"24px"} />}
              {data && (
                <Typography variant="subtitle2">
                  خوش آمدید به {data.name}
                </Typography>
              )}
            </Box>
            {children}
          </>
        )}
      </Stack>
    </DefaultLayout>
  );
};

export default Layout;
