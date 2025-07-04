import { mergeClasses } from "@/libs/utils/mergeClasses";
import { toPersianDigits } from "@/libs/utils/toPersianDigits";
import { Stack, Typography } from "@mui/material";
import moment from "moment-jalaali";
import { FunctionComponent } from "react";
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
const dayNameMap: Record<string, string> = {
  شنبه: "شنب",
  یک‌شنبه: "یکش",
  دوشنبه: "دوش",
  سه‌شنبه: "سه‌", // Optionally: "سه‌ش"
  چهارشنبه: "چهـ",
  پنج‌شنبه: "پنج",
  جمعه: "جمـ",
};


interface DayProps {
  isSelected?: boolean;
  date: string;
  onClick?:()=>void
}

const Day: FunctionComponent<DayProps> = ({
  isSelected = false,
  date,
  onClick
}) => {
  const m = moment(date);
  const dayName = m.format("dddd"); // e.g. "شنبه"
  const shortDayName = dayNameMap[dayName] || dayName;
  const dayNumber = m.format("jD"); // e.g. "۱"
  return (
    <Stack
    
      className={mergeClasses(
        `rounded-[4px] w-[66px] cursor-pointer gap-2 flex justify-center items-center`,
        isSelected ? "bg-secondary-container" : "bg-tertiary-container"
      )}
      sx={{
        padding: "16px 10px",
      }}
      onClick={onClick}
    >
      <Typography variant="body1">{shortDayName}</Typography>

      <div
        className={mergeClasses(
          `h-5 w-[1px]  bg-gradient-to-b`,
          isSelected
            ? `from-on-secondary-container to-secondary-container`
            : `from-on-tertiary-container to-tertiary-container`
        )}
      ></div>
      <Typography variant="h5">{toPersianDigits(dayNumber)}</Typography>
    </Stack>
  );
};

export default Day
