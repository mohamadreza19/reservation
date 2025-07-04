"use client";
import AppBar from "@/libs/shared-components/layouts/AppBar";
import DefaultLayout from "@/libs/shared-components/layouts/DeafultLayout";
import { FunctionComponent, useState } from "react";

import { Appointments } from "./components";
import DatePickerContainer from "./components/date-picker-container/DatePickerContainer";

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  // const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [date, setDate] = useState<string | undefined>();

  const handleChangeDate = (iso: string | undefined) => {
    setDate(iso);
  };

  return (
    <DefaultLayout AppBar={<AppBar label="مدیریت نوبت‌ها" />}>
      <DatePickerContainer onSelectDate={handleChangeDate} />
      <Appointments date={date} />
    </DefaultLayout>
  );
};

export default Page;
