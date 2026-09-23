export default function Pattern({ className = "" }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 size-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id="islamic-star" width="64" height="64" patternUnits="userSpaceOnUse">
          <path
            d="M32 4 L38 20 L54 14 L46 30 L60 32 L46 34 L54 50 L38 44 L32 60 L26 44 L10 50 L18 34 L4 32 L18 30 L10 14 L26 20 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-star)" />
    </svg>
  );
}
