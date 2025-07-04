import { useFilesGet } from "@/libs/api/generated/file/file";
import { ServiceDto } from "@/libs/api/generated/models";
import { mergeClasses } from "@/libs/utils/mergeClasses";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface SystemServiceProps {
  service: ServiceDto;
  isSelected: boolean;
  onClick?: () => void;
}

const SystemService: FunctionComponent<SystemServiceProps> = ({
  service,
  isSelected,
  onClick,
}) => {
  const file = useFilesGet("service", service.id, {
    query: {
      enabled: !!service.id,
      select(data) {
        return URL.createObjectURL(data);
      },
    },
  });
  return (
    <div>
      <section
        onClick={onClick}
        className={mergeClasses(
          " min-w-20 p-4 rounded-[10px] cursor-pointer flex flex-col gap-2 items-center ",
          isSelected
            ? "bg-tertiary-container text-on-tertiary-container"
            : "bg-inverse-on-surface"
        )}
      >
        <img className="size-6 " src={file.data} />
        <Typography variant="button">{service.name}</Typography>
      </section>
    </div>
  );
};

export default SystemService;
