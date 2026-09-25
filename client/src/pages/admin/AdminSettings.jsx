
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Field, inputClass } from "../../components/Field.jsx";
import { useSettings } from "../../context/SettingsContext.jsx";
import { api } from "../../lib/api.js";

const prayerFields = [
  ["fajr", "ফজর"],
  ["dhuhr", "যোহর"],
  ["asr", "আসর"],
  ["maghrib", "মাগরিব"],
  ["isha", "এশা"],
  ["jummah", "জুমুআ"],
];

function Card({ title, children }) {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="font-display text-lg font-bold text-indigo-950">
        {title}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const { settings, loadSettings } = useSettings();
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const set = (name, value) =>
    setForm((current) => ({
      ...current,
      [name]: value,
    }));

  const setPrayer = (name, value) =>
    setForm((current) => ({
      ...current,
      prayerTimes: {
        ...current.prayerTimes,
        [name]: value,
      },
    }));

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await api.put("/settings", form, true);
      await loadSettings();
      toast.success("সেটিংস সংরক্ষণ করা হয়েছে");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const textField = (name, label, placeholder = "") => (
    <Field label={label}>
      <input
        value={form[name] || ""}
        onChange={(e) => set(name, e.target.value)}
        className={inputClass}
        placeholder={placeholder}
      />
    </Field>
  );

  return (
    <form onSubmit={save} className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-indigo-950">
          সাইট সেটিংস
        </h1>

        <p className="text-sm text-slate-500">
          এখানে দেওয়া তথ্য পুরো ওয়েবসাইটে দেখানো হবে
        </p>
      </div>

      <Card title="যোগাযোগের তথ্য">
        {textField("phone", "ফোন নম্বর", "01XXXXXXXXX")}
        {textField("email", "ইমেইল")}
      </Card>

      <Card title="জামাতের সময়সূচি">
        {prayerFields.map(([key, label]) => (
          <Field key={key} label={label}>
            <input
              value={form.prayerTimes?.[key] || ""}
              onChange={(e) => setPrayer(key, e.target.value)}
              className={inputClass}
            />
          </Field>
        ))}
      </Card>

      <Card title="মোবাইল ব্যাংকিং">
        {textField("bkashNumber", "বিকাশ নম্বর", "01XXXXXXXXX")}
        {textField("nagadNumber", "নগদ নম্বর", "01XXXXXXXXX")}
      </Card>

      <Card title="ব্যাংক অ্যাকাউন্ট">
        {textField("bankName", "ব্যাংকের নাম")}
        {textField("bankBranch", "শাখা")}
        {textField("bankAccountName", "অ্যাকাউন্টের নাম")}
        {textField("bankAccountNumber", "অ্যাকাউন্ট নম্বর")}
      </Card>

      <button
        disabled={saving}
        className="rounded-xl bg-indigo-900 px-8 py-3.5 font-semibold text-white transition hover:bg-indigo-800 disabled:opacity-60"
      >
        {saving ? "সংরক্ষণ হচ্ছে..." : "সেটিংস সংরক্ষণ করুন"}
      </button>
    </form>
  );
}

