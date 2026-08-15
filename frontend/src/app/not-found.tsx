import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-obsidian min-h-[75vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <h1 className="text-7xl sm:text-9xl font-bold font-display text-champagne tracking-widest animate-pulse">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold font-display text-ivory tracking-wide">
        Page Not Found
      </h2>
      <p className="text-sm text-ivory/60 max-w-sm leading-relaxed">
        The page you are looking for does not exist or has been moved. Use the button below to return home safely.
      </p>
      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-champagne text-xs font-semibold uppercase tracking-wider text-obsidian bg-champagne rounded-sm hover:bg-mutedgold hover:border-mutedgold transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
