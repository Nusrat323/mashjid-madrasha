import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import { Field, inputClass } from "../components/Field.jsx";
import { api } from "../lib/api.js";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);

  const set = (name, value) =>
    setForm((current) => ({
      ...current,
      [name]: value,
    }));

  const contactItems = [
    {
      icon: FaMapMarkerAlt,
      label: "ঠিকানা",
      value: "শরীয়তপুর, নড়িয়া, পাইকপাড়া",
    },
    {
      icon: FaPhoneAlt,
      label: "ফোন",
      value: "+880 1700-000000",
      href: "tel:+8801700000000",
    },
    {
      icon: FaEnvelope,
      label: "ইমেইল",
      value: "info@paikparakazialfazuddinmosjid.com",
      href: "mailto:info@paikparakazialfazuddinmosjid.com",
    },
  ];

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);

    try {
      const data = await api.post("/messages", form);
      toast.success(data.message);
      setForm(emptyForm);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHeader
        title="যোগাযোগ"
        text="যেকোনো প্রশ্ন, পরামর্শ বা ভর্তির তথ্যের জন্য আমাদের জানান।"
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="space-y-8 lg:col-span-2">
          {contactItems.map(
            ({ icon: Icon, label, value, href }, index) => (
              <Reveal
                key={label}
                from="left"
                delay={index * 0.1}
              >
                <div className="flex items-center gap-5 border-b border-slate-200 pb-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-indigo-900 text-lg text-amber-300">
                    <Icon />
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      {label}
                    </p>

                    {href ? (
                      <a
                        href={href}
                        className="break-words font-semibold text-indigo-950 transition hover:text-indigo-700"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="break-words font-semibold text-indigo-950">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          )}
        </div>

        <Reveal from="right" className="lg:col-span-3">
          <form
            onSubmit={submit}
            className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-900/5 sm:p-10"
          >
            <h2 className="font-display text-2xl font-bold text-indigo-950">
              আমাদের বার্তা পাঠান
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="আপনার নাম">
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    set("name", e.target.value)
                  }
                  className={inputClass}
                  placeholder="পূর্ণ নাম"
                />
              </Field>

              <Field label="মোবাইল নম্বর">
                <input
                  value={form.phone}
                  onChange={(e) =>
                    set("phone", e.target.value)
                  }
                  className={inputClass}
                  placeholder="01XXXXXXXXX"
                />
              </Field>
            </div>

            <Field label="ইমেইল (ঐচ্ছিক)">
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  set("email", e.target.value)
                }
                className={inputClass}
                placeholder="example@email.com"
              />
            </Field>

            <Field label="আপনার বার্তা">
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  set("message", e.target.value)
                }
                className={inputClass}
                placeholder="এখানে লিখুন..."
              />
            </Field>

            <button
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-900 px-8 py-3.5 font-semibold text-white transition hover:bg-indigo-800 disabled:opacity-60"
            >
              <FaPaperPlane />
              {sending ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
            </button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
