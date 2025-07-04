import { mergeClasses } from "@/libs/utils/mergeClasses";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface TimeslotProps {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const Timeslot: FunctionComponent<TimeslotProps> = ({
  onClick,
  label,
  isSelected = false,
}) => {
  return (
    <div
      onClick={onClick}
      style={{ direction: "ltr" }}
      className={mergeClasses(
        "w-[104px] cursor-pointer flex items-center justify-center h-[32px] rounded-[4px] border border-outline-variant",
        isSelected && "border-transparent bg-secondary-container"
      )}
    >
      <Typography variant="caption">{label}</Typography>
    </div>
  );
};

export default Timeslot;
