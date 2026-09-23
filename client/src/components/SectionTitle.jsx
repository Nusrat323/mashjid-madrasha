import Reveal from "./Reveal.jsx";

export default function SectionTitle({ badge, title, text, align = "center" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <Reveal className={`mb-12 max-w-2xl ${alignment}`}>
      {badge && (
        <span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800">
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold leading-snug text-indigo-950 sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-slate-600">{text}</p>}
    </Reveal>
  );
}
