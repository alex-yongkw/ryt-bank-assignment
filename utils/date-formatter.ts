import { format, formatRelative } from "date-fns";

export const formatCustomRelativeDate = (
  unixTimestampinSeconds: number
): string => {
  const now = new Date();

  // Get relative formatting like "today at 10:00 AM"
  const dateTobeFormatted = new Date(unixTimestampinSeconds * 1000);
  const relativeDate = formatRelative(dateTobeFormatted, now);
  const capitalizedRelativeDate = capitalizeFirstLetter(relativeDate);

  // return normal date format if more than 2 days ago
  if (!relativeDate.includes("today") && !relativeDate.includes("yesterday")) {
    const usualDateFormat = format(dateTobeFormatted, "MMM d, hh:mm a");

    return usualDateFormat;
  }

  return capitalizedRelativeDate;
};

const capitalizeFirstLetter = (date: string): string => {
  const [firstLetter, ...rest] = date;

  return [firstLetter.toUpperCase(), ...rest].join("");
};
