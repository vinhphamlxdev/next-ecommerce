import { parseISO, format } from "date-fns";

export default function getCreateDate(dateString = "") {
  const date = parseISO(dateString);
  const year = format(date, "yyyy");
  const month = format(date, "MM");
  const day = format(date, "dd");
  const newDate = `${day}/${month}/${year}`;
  return newDate;
}
