import { purposes, methods } from "../data/site.js";

const locale = "bn-BD";

export const formatNumber = (value) => Number(value || 0).toLocaleString(locale);

export const formatTaka = (amount) => `৳ ${formatNumber(amount)}`;

export const formatDate = (date) =>
  new Date(date).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });

export const formatTime = (date) =>
  new Date(date).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });

export const monthName = (month, year) =>
  new Date(year, month - 1, 1).toLocaleDateString(locale, { month: "short" });

export const purposeLabel = (value) => purposes.find((item) => item.value === value)?.label || value;

export const methodLabel = (value) => methods.find((item) => item.value === value)?.label || value;

export const currentYear = () =>
  new Intl.NumberFormat(locale, { useGrouping: false }).format(new Date().getFullYear());
