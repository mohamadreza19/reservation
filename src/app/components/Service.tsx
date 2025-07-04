import { Price, ServiceDto } from "@/libs/api/generated/models";
import { mergeClasses } from "@/libs/utils/mergeClasses";
import { Box, Stack, Typography } from "@mui/material";
import { FunctionComponent, useMemo, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import _ from "lodash";
import { toPersianDigits } from "@/libs/utils/toPersianDigits";

interface ServiceProps {
  label?: string;
  price?: Price;
  service: ServiceDto;
  onClick?: () => void;
}

export const Service: FunctionComponent<ServiceProps> = ({
  service,
  onClick,
}) => {
  return (
    <Box
      display="flex"
      flexDirection={"row"}
      justifyContent="space-between"
      alignItems="center"
      onClick={onClick}
      className="px-4 py-5 cursor-pointer bg-inverse-on-surface rounded-2xl"
    >
      <Typography variant="subtitle1">{service.name}</Typography>
      <Stack
        flexDirection={"row"}
        gap="8px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1">
          {service.price && toPersianDigits(Number(service.price.amount), true)}
        </Typography>
        <ArrowBackIosIcon
          sx={{
            fontSize: "16px",
          }}
        />
      </Stack>
    </Box>
  );
};
