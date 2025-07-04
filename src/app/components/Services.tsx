import { PaginatedServiceDto, ServiceDto } from "@/libs/api/generated/models";
import { FunctionComponent } from "react";
import { Service } from "./Service";

interface ServicesProps {
  services: PaginatedServiceDto | undefined;
  onClickService: (service: ServiceDto) => void;
}

const Services: FunctionComponent<ServicesProps> = ({
  services,
  onClickService,
}) => {
  return (
    <div>
      {services &&
        services.data.map((ser, index) => (
          <Service
            key={index}
            service={ser}
            onClick={() => onClickService(ser)}
          />
        ))}
    </div>
  );
};

export default Services;
