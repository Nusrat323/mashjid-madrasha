import CrudManager from "../../components/admin/CrudManager.jsx";
import { noticeCategories } from "../../data/site.js";
import { formatDate } from "../../lib/format.js";

const fields = [
  { name: "title", label: "শিরোনাম", required: true },
  { name: "category", label: "ধরন", type: "select", options: noticeCategories },
  { name: "body", label: "বিস্তারিত", type: "textarea", required: true },
];

export default function AdminNotices() {
  return (
    <CrudManager
      title="নোটিশ"
      subtitle="ওয়েবসাইটের নোটিশ বোর্ডে যা দেখানো হবে"
      endpoint="/notices"
      fields={fields}
      emptyForm={{ title: "", category: "general", body: "" }}
      renderItem={(item) => {
        const category = noticeCategories.find((entry) => entry.value === item.category) || noticeCategories[0];
        return (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${category.className}`}>{category.label}</span>
              <span className="text-xs text-slate-500">{formatDate(item.createdAt)}</span>
            </div>
            <h3 className="mt-2 font-display text-lg font-bold text-indigo-950">{item.title}</h3>
            <p className="mt-1 line-clamp-2 text-slate-600">{item.body}</p>
          </>
        );
      }}
    />
  );
}
