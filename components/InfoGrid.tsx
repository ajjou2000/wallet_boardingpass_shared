export interface InfoItem {
  label: string;
  value: string;
  hint?: string;
  emphasize?: boolean;
}

export function InfoGrid({ items }: { items: InfoItem[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-5">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-[11px] uppercase tracking-[0.15em] text-white/60">
            {item.label}
          </dt>
          <dd
            className={`mt-1 truncate font-medium tabular ${
              item.emphasize ? "text-xl" : "text-base"
            }`}
          >
            {item.value}
          </dd>
          {item.hint ? (
            <p className="mt-0.5 text-[11px] text-white/50">{item.hint}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
