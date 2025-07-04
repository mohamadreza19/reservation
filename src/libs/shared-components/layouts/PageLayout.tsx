import { Stack } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: FunctionComponent<PageLayoutProps> = ({ children }) => {
  return (
    <Stack
      spacing={"12px"}
      justifyContent="center"
      className="h-full"
      py="16px"
    >
      {children}
    </Stack>
  );
};

export default PageLayout;
