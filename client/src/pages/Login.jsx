
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaGoogle,
  FaMosque,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import Pattern from "../components/Pattern.jsx";
import { Field, inputClass } from "../components/Field.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { authErrorMessage } from "../lib/authErrors.js";

export default function Login() {
  const {
    user,
    login,
    register,
    loginWithGoogle,
    resetPassword,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/dashboard";

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [user, redirectTo, navigate]);

  const set = (name, value) =>
    setForm((current) => ({
      ...current,
      [name]: value,
    }));

  const run = async (action) => {
    setBusy(true);

    try {
      await action();
    } catch (err) {
      toast.error(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const submit = (event) => {
    event.preventDefault();

    run(() =>
      mode === "login"
        ? login(form.email, form.password)
        : register(
            form.name,
            form.email,
            form.password
          )
    );
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    if (!form.email.trim()) {
      return toast.error(
        "পাসওয়ার্ড রিসেট করতে আপনার ইমেইল লিখুন"
      );
    }

    setBusy(true);

    try {
      await resetPassword(form.email.trim());

      toast.success(
        "পাসওয়ার্ড রিসেট করার লিংক আপনার ইমেইলে পাঠানো হয়েছে"
      );

      setForgotPassword(false);
    } catch (err) {
      toast.error(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-linear-to-br from-indigo-900 to-indigo-950 lg:block">
        <Pattern className="text-white/10" />

        <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-amber-400/20 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex h-full flex-col justify-center px-16 text-white"
        >
          <FaMosque className="text-6xl text-amber-300" />

          <h2 className="mt-8 font-display text-4xl font-bold leading-snug">
            আপনার দান, আপনার নামে সংরক্ষিত
          </h2>

          <p className="mt-4 max-w-md text-lg text-indigo-100">
            লগইন করে নিরাপদে দান করুন এবং আপনার সব দানের
            তালিকা যেকোনো সময় দেখে নিন।
          </p>
        </motion.div>
      </div>

      <div className="flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {forgotPassword ? (
            <>
              <button
                type="button"
                onClick={() => setForgotPassword(false)}
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-700 transition hover:text-indigo-900"
              >
                <FaArrowLeft className="text-xs" />
                লগইনে ফিরে যান
              </button>

              <h1 className="font-display text-3xl font-bold text-indigo-950">
                পাসওয়ার্ড ভুলে গেছেন?
              </h1>

              <p className="mt-2 text-slate-600">
                আপনার অ্যাকাউন্টের ইমেইল দিন। আমরা আপনাকে
                পাসওয়ার্ড পরিবর্তন করার জন্য একটি লিংক পাঠাব।
              </p>

              <form
                onSubmit={handleForgotPassword}
                className="mt-8 space-y-5"
              >
                <Field label="ইমেইল">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      set("email", e.target.value)
                    }
                    className={inputClass}
                    placeholder="example@email.com"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-xl bg-indigo-900 py-3.5 font-semibold text-white transition hover:bg-indigo-800 disabled:opacity-60"
                >
                  {busy
                    ? "পাঠানো হচ্ছে..."
                    : "রিসেট লিংক পাঠান"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl font-bold text-indigo-950">
                {mode === "login"
                  ? "আবার স্বাগতম"
                  : "নতুন অ্যাকাউন্ট খুলুন"}
              </h1>

              <p className="mt-2 text-slate-600">
                {mode === "login"
                  ? "আপনার অ্যাকাউন্টে লগইন করুন।"
                  : "কয়েক সেকেন্ডেই অ্যাকাউন্ট তৈরি হয়ে যাবে।"}
              </p>

              <div className="mt-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                {[
                  ["login", "লগইন"],
                  ["register", "নতুন অ্যাকাউন্ট"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setMode(value)}
                    className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                      mode === value
                        ? "bg-white text-indigo-900 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => run(loginWithGoogle)}
                disabled={busy}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                <FaGoogle className="text-rose-500" />
                গুগল দিয়ে চালিয়ে যান
              </button>

              <div className="my-6 flex items-center gap-4 text-sm text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                অথবা
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <form
                onSubmit={submit}
                className="space-y-4"
              >
                {mode === "register" && (
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
                )}

                <Field label="ইমেইল">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      set("email", e.target.value)
                    }
                    className={inputClass}
                    placeholder="example@email.com"
                  />
                </Field>

                <Field label="পাসওয়ার্ড">
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      minLength={6}
                      value={form.password}
                      onChange={(e) =>
                        set("password", e.target.value)
                      }
                      className={`${inputClass} pr-12`}
                      placeholder="কমপক্ষে ৬ অক্ষর"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      aria-label={
                        showPassword
                          ? "পাসওয়ার্ড লুকান"
                          : "পাসওয়ার্ড দেখুন"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-700"
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                </Field>

                {mode === "login" && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setForgotPassword(true)}
                      className="text-sm font-medium text-indigo-700 transition hover:text-indigo-900 hover:underline"
                    >
                      পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                  </div>
                )}

                <button
                  disabled={busy}
                  className="w-full rounded-xl bg-indigo-900 py-3.5 font-semibold text-white transition hover:bg-indigo-800 disabled:opacity-60"
                >
                  {busy
                    ? "অপেক্ষা করুন..."
                    : mode === "login"
                    ? "লগইন করুন"
                    : "অ্যাকাউন্ট খুলুন"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                <Link
                  to="/"
                  className="text-indigo-700 hover:underline"
                >
                  হোম পেজে ফিরে যান
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
