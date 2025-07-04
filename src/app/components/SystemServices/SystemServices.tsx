import { PaginatedServiceDto, ServiceDto } from "@/libs/api/generated/models";
import React from "react";

import SystemService from "../SystemService/SystemService";

export interface SystemServicesProps {
  services?: PaginatedServiceDto | undefined;
  selected?: ServiceDto | undefined;
  handleSelectService?: (ser: ServiceDto) => void;
}

export function SystemServices({
  services,
  selected,
  handleSelectService,
}: SystemServicesProps) {
  return (
    <div className="my-center-hor gap-3">
      {services &&
        services.data.map((service, i) => (
          <SystemService
            service={service}
            key={i}
            isSelected={service.id === selected?.id}
            onClick={() => handleSelectService!(service)}
          />
        ))}
    </div>
  );
}
