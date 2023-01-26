export const days = Array.from(Array(32).keys()).slice(1);

export const WeekDays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

export const PaymentCycle = ["D", "W", "M", "Y", "Q", "H"] as const;
