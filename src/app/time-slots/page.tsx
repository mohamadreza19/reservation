"use client";
import DefaultLayout from "@/libs/shared-components/layouts/DeafultLayout";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import {
  useGetAvailableDateRange,
  useGetTimeslotsByDate,
} from "@/libs/api/generated/timeslots/timeslots";

import Timeslot from "./components/Timeslot";
import { toPersianDigits } from "@/libs/utils/toPersianDigits";

import { useRouter } from "next/navigation";
import { TimeslotByDateDto } from "@/libs/api/generated/models";
import bookServiceRepository from "@/libs/stores/book-service/store";

import DateList from "../appointment/components/DateList";
import { IDateSlot } from "../appointment/components/model";

import { toDateSlotFromAvailableDate } from "@/libs/utils/data-transformer";

interface TimeSlotsProps {}

const TimeSlots: FunctionComponent<TimeSlotsProps> = () => {
  const businessId = localStorage.getItem("businessId");

  const [selectedDay, setSelectedDay] = useState<IDateSlot | null>(null);
  const [selectedTimeslot, setSelectedTimeslot] =
    useState<TimeslotByDateDto | null>(null);

  const [dateSlots, setDateSlots] = useState<IDateSlot[]>([]);
  const router = useRouter();
  const { data } = useGetAvailableDateRange(
    {
      businessId: businessId as string,
    },
    {
      query: {
        enabled: !!businessId,
      },
    }
  );

  const { data: timeSlotD } = useGetTimeslotsByDate(
    {
      businessId: businessId as any,
      date: selectedDay?.formatted as any,
    },
    {
      query: {
        enabled: businessId && selectedDay ? true : false,
      },
    }
  );

  useEffect(() => {
    if (timeSlotD) {
      setSelectedTimeslot(timeSlotD[0]);
    }
  }, [timeSlotD]);
  useEffect(() => {
    if (data?.length) {
      const slots = data
        .map(toDateSlotFromAvailableDate)
        .filter((slot): slot is IDateSlot => slot !== null);
      setDateSlots(slots);
      setSelectedDay(slots[0]);
    }
  }, [data]);

  const handleChangeTimeslot = (slot: TimeslotByDateDto) => {
    setSelectedTimeslot(slot);
  };
  const handleClickNext = () => {
    bookServiceRepository.setTimeslot(selectedTimeslot!);
    router.push(`/checkout`);
  };

  const handleCLickBack = () => {
    router.push("/");
  };
  return (
    <DefaultLayout
      AppBarProps={{
        label: "انتخاب زمان",

        startCLick: handleCLickBack,
      }}
    >
      <div className="rounded-2xl border border-outline-variant p-4  w-full items-center justify-center">
        <DateList
          dateSlots={dateSlots}
          selectedSlot={selectedDay}
          setSelectedSlot={setSelectedDay}
        />
      </div>

      <Divider flexItem></Divider>

      <Stack
        flexDirection="row"
        flexWrap="wrap"
        gap="12px"
        justifyContent="center"
      >
        {timeSlotD &&
          timeSlotD.map((ts, index) => (
            <Timeslot
              label={toPersianDigits(ts.startTime, false)}
              key={index}
              isSelected={ts.startTime == selectedTimeslot?.startTime}
              onClick={() => handleChangeTimeslot(ts)}
            />
          ))}
      </Stack>
      <Button
        onClick={handleClickNext}
        variant="contained"
        className="!mt-auto"
      >
        بعدی
      </Button>
    </DefaultLayout>
  );
};

export default TimeSlots;
