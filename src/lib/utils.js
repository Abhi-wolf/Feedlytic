import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function transformTimestamp(timestamp) {
  return moment(timestamp).format("DD/MM/YYYY");
}
export function transformDateWithTime(timestamp) {
  return moment(timestamp).format("DD/MM/YYYY   HH:mm");
}
