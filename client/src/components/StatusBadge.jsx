import { statusMap } from "../data/site.js";

export default function StatusBadge({ status }) {
  const item = statusMap[status] || statusMap.pending;

  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${item.className}`}>
      {item.label}
    </span>
  );
}
