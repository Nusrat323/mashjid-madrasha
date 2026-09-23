import toast from "react-hot-toast";
import Loader from "../../components/Loader.jsx";
import useFetch from "../../hooks/useFetch.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../lib/api.js";
import { formatDate, formatNumber } from "../../lib/format.js";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const { data, loading, reload } = useFetch("/users", true);

  const changeRole = async (id, role) => {
    try {
      await api.patch(`/users/${id}/role`, { role }, true);
      toast.success("ভূমিকা পরিবর্তন হয়েছে");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading || !data) return <Loader />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-indigo-950">ব্যবহারকারী</h1>
        <p className="text-sm text-slate-500">মোট {formatNumber(data.length)} জন নিবন্ধিত। এখান থেকে অ্যাডমিন নির্ধারণ করা যায়।</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium">ব্যবহারকারী</th>
                <th className="px-5 py-4 font-medium">মোবাইল</th>
                <th className="px-5 py-4 font-medium">যোগদান</th>
                <th className="px-5 py-4 font-medium">ভূমিকা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {item.photo ? (
                        <img src={item.photo} alt="" referrerPolicy="no-referrer" className="size-10 rounded-full object-cover" />
                      ) : (
                        <span className="grid size-10 place-items-center rounded-full bg-indigo-900 font-semibold text-white">
                          {(item.name || item.email).charAt(0).toUpperCase()}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-indigo-950">{item.name || "নামহীন"}</p>
                        <p className="truncate text-xs text-slate-500">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm">{item.phone || "—"}</td>
                  <td className="px-5 py-4 text-sm">{formatDate(item.createdAt)}</td>
                  <td className="px-5 py-4">
                    <select
                      value={item.role}
                      disabled={item._id === currentUser._id}
                      onChange={(e) => changeRole(item._id, e.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm disabled:bg-slate-50"
                    >
                      <option value="user">সাধারণ ব্যবহারকারী</option>
                      <option value="admin">অ্যাডমিন</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
