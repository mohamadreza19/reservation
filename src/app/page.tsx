"use client";

import { useGetPublicProfile } from "@/libs/api/generated/business/business";
import { useFindProfile } from "@/libs/api/generated/customer/customer";

import DefaultLayout from "@/libs/shared-components/layouts/DeafultLayout";
import { Box, Button, Stack, Typography } from "@mui/material";
import _ from "lodash";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import bookServiceRepository from "@/libs/stores/book-service/store";
import { ServiceDto } from "@/libs/api/generated/models";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AppBar from "@/libs/shared-components/layouts/AppBar";
import { SystemServices } from "./components/SystemServices";
import { useSystemServices } from "./hooks/useSystemServices";
import { useServices } from "./hooks/useServices";
import Services from "./components/Services";

export default function Home() {
  const { data } = useFindProfile();
  const router = useRouter();
  const businessId = localStorage.getItem("businessId") as any;
  const [selected, setSelected] = useState<ServiceDto>();

  const { data: businessD } = useGetPublicProfile(businessId, {
    query: {
      enabled: !!businessId,
    },
  });

  const systemServiceByBusiness = useSystemServices({ businessId });

  const services = useServices({ businessId, systemService: selected });

  const handleSelectService = (ser: ServiceDto) => {
    setSelected(ser);
  };
  const handleNavigate = (service: ServiceDto) => {
    if (businessD) {
      bookServiceRepository.setBusiness(businessD);
      bookServiceRepository.setService(service);
      router.push("/time-slots");
    }
  };

  const navigateToAppointment = () => {
    router.push("/appointment");
  };

  useEffect(() => {
    if (systemServiceByBusiness?.data && !selected) {
      setSelected(systemServiceByBusiness.data[0]);
    }
  }, [systemServiceByBusiness?.data]);
  return (
    <DefaultLayout
      AppBarProps={{
        StartIcon: <img className="size-8" src="/icons/logo.svg" />,
        label: businessD?.name,
      }}
    >
      <div className="flex flex-col gap-3">
        <section>
          <Box>
            <Typography sx={{ fontSize: "22px" }}>خدمات</Typography>
          </Box>
        </section>

        <section>
          <SystemServices
            selected={selected}
            handleSelectService={handleSelectService}
            services={systemServiceByBusiness}
          />
        </section>
      </div>

      <div>
        <Services services={services} onClickService={handleNavigate} />
      </div>
      <div>
        <Button
          onClick={navigateToAppointment}
          variant="contained"
          className="!text-[16px] text-nowrap !h-fit !fixed top-4/5"
          startIcon={<CalendarTodayIcon />}
        >
          مدیریت نوبت‌ها
        </Button>
      </div>
    </DefaultLayout>
  );
}
