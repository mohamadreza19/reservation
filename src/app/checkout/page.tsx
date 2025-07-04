"use client";
import AppBar from "@/libs/shared-components/layouts/AppBar";
import DefaultLayout from "@/libs/shared-components/layouts/DeafultLayout";
import PageLayout from "@/libs/shared-components/layouts/PageLayout";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useMemo } from "react";

import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import bookServiceRepository from "@/libs/stores/book-service/store";
import { mapIsoToJalali } from "@/libs/utils/data-transformer";
import { toPersianDigits } from "@/libs/utils/toPersianDigits";
import { useAppointmentsCreate } from "@/libs/api/generated/appointment/appointment";
import { useRouter } from "next/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
interface CheckoutProps {}

const Checkout: FunctionComponent<CheckoutProps> = () => {
  const router = useRouter();
  const appointmentCreation = useAppointmentsCreate({
    mutation: {
      onSuccess(data, variables, context) {
        router.push(`/`);
      },
    },
  });
  const bookService = useMemo(() => {
    return bookServiceRepository.getStore();
  }, []);

  const handleCreateAppointment = async () => {
    appointmentCreation.mutate({
      data: {
        serviceId: bookService.service.id,
        timeslotId: bookService.timeslot.id,
      },
    });
  };
  const handleCLickBack = () => {
    router.push("/time-slots");
  };
  return (
    <>
      <DefaultLayout
        AppBarProps={{
          label: "پرداخت",
          startCLick: handleCLickBack,
          // StartIcon: <ArrowForwardIosIcon />,
        }}
      >
        <Stack
          flexDirection="column"
          alignItems="center"
          display="flex"
          py="60px"
          justifyContent="center"
          gap="8px"
        >
          <div className="bg-tertiary-container p-8 rounded-full">
            <AccessAlarmIcon className="size-6" />
          </div>
          <Typography variant="body1">تایید نهایی</Typography>
        </Stack>
        <Stack spacing={"12px"}>
          <CheckoutItem
            start="نام سرویس دهنده"
            end={bookService.business.name}
          />
          <CheckoutItem start="خدمات" end={bookService.service.name} />
          <CheckoutItem
            start="تاریخ نوبت نوبت"
            end={toPersianDigits(
              mapIsoToJalali(bookService.timeslot.date),
              false
            )}
          />
          <CheckoutItem
            start="ساعت نوبت"
            end={toPersianDigits(bookService.timeslot.startTime, false)}
          />
        </Stack>
        <Divider className="!my-3" />
        <CheckoutItem
          start="مبلغ کل"
          end={toPersianDigits(bookService.service.price?.amount as any)}
        />
        <Button
          onClick={handleCreateAppointment}
          loading={appointmentCreation.isPending}
          variant="contained"
          className="!mt-auto"
        >
          رزرو نوبت
        </Button>
      </DefaultLayout>
    </>
  );
};

export default Checkout;

interface CheckoutItemProps {
  start?: string;
  end?: string;
}

const CheckoutItem: FunctionComponent<CheckoutItemProps> = ({ start, end }) => {
  return (
    <div className="flex justify-between items-center">
      <Typography variant="body2">{start}</Typography>
      <Typography variant="body2" fontWeight="700">
        {end}
      </Typography>
    </div>
  );
};
