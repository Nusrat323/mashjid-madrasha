export default function EmptyState({ icon: Icon, title, text }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
      {Icon && (
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-white text-2xl text-indigo-500 shadow-sm">
          <Icon />
        </span>
      )}
      <h3 className="font-display text-lg font-bold text-indigo-950">{title}</h3>
      {text && <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{text}</p>}
    </div>
  );
}
