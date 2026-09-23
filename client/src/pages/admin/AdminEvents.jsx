import CrudManager from "../../components/admin/CrudManager.jsx";
import { formatDate } from "../../lib/format.js";

const fields = [
  { name: "title", label: "অনুষ্ঠানের নাম", required: true },
  { name: "date", label: "তারিখ", type: "date", required: true },
  { name: "time", label: "সময় (যেমন: বাদ এশা)" },
  { name: "place", label: "স্থান" },
  { name: "description", label: "বিবরণ", type: "textarea" },
];

export default function AdminEvents() {
  return (
    <CrudManager
      title="অনুষ্ঠান"
      subtitle="মাহফিল, দারস ও অন্যান্য আয়োজন"
      endpoint="/events"
      fields={fields}
      emptyForm={{ title: "", date: "", time: "", place: "", description: "" }}
      renderItem={(item) => (
        <>
          <h3 className="font-display text-lg font-bold text-indigo-950">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {formatDate(item.date)}
            {item.time && ` • ${item.time}`}
            {item.place && ` • ${item.place}`}
          </p>
          {item.description && <p className="mt-1 line-clamp-2 text-slate-600">{item.description}</p>}
        </>
      )}
    />
  );
}
