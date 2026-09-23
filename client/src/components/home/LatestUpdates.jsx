import { Link } from "react-router-dom";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import SectionTitle from "../SectionTitle.jsx";
import Reveal from "../Reveal.jsx";
import useFetch from "../../hooks/useFetch.js";
import { formatDate } from "../../lib/format.js";
import { noticeCategories } from "../../data/site.js";

const categoryOf = (value) => noticeCategories.find((item) => item.value === value) || noticeCategories[0];

export default function LatestUpdates() {
  const { data: notices } = useFetch("/notices");
  const { data: events } = useFetch("/events");

  const latestNotices = (notices || []).slice(0, 3);
  const today = new Date().setHours(0, 0, 0, 0);
  const upcomingEvents = (events || []).filter((event) => new Date(event.date) >= today).slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <SectionTitle
        badge="সর্বশেষ"
        title="নোটিশ ও আসন্ন অনুষ্ঠান"
        text="মসজিদ ও মাদ্রাসার গুরুত্বপূর্ণ ঘোষণা ও পরবর্তী আয়োজনগুলো এখানে দেখুন।"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal from="left">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-indigo-950">নোটিশ বোর্ড</h3>
            <Link to="/notices" className="flex items-center gap-2 text-sm font-medium text-indigo-700">
              সব দেখুন <FaArrowRight className="text-xs" />
            </Link>
          </div>
          <div className="space-y-4">
            {latestNotices.length === 0 && <p className="rounded-2xl bg-slate-50 p-6 text-slate-500">এখনো কোনো নোটিশ দেওয়া হয়নি।</p>}
            {latestNotices.map((notice) => {
              const category = categoryOf(notice.category);
              return (
                <div key={notice._id} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${category.className}`}>{category.label}</span>
                    <span className="text-xs text-slate-500">{formatDate(notice.createdAt)}</span>
                  </div>
                  <h4 className="mt-3 font-display text-lg font-bold text-indigo-950">{notice.title}</h4>
                  <p className="mt-1 line-clamp-2 text-slate-600">{notice.body}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal from="right">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-indigo-950">আসন্ন অনুষ্ঠান</h3>
            <Link to="/events" className="flex items-center gap-2 text-sm font-medium text-indigo-700">
              সব দেখুন <FaArrowRight className="text-xs" />
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.length === 0 && <p className="rounded-2xl bg-slate-50 p-6 text-slate-500">আপাতত কোনো অনুষ্ঠান নির্ধারিত নেই।</p>}
            {upcomingEvents.map((event) => (
              <div key={event._id} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300">
                <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-indigo-900 text-center text-white">
                  <div>
                    <p className="font-display text-xl font-bold leading-none">
                      {new Date(event.date).toLocaleDateString("bn-BD", { day: "numeric" })}
                    </p>
                    <p className="mt-1 text-xs text-indigo-200">
                      {new Date(event.date).toLocaleDateString("bn-BD", { month: "short" })}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-indigo-950">{event.title}</h4>
                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <FaRegCalendarAlt /> {event.time || formatDate(event.date)}
                    {event.place && <span>• {event.place}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
