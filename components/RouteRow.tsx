interface RouteRowProps {
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
}

export function RouteRow({
  originCode,
  originCity,
  destinationCode,
  destinationCity,
}: RouteRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-[0.15em] text-white/60">
          출발
        </p>
        <p className="mt-1 text-4xl font-semibold leading-none tracking-tight tabular">
          {originCode}
        </p>
        <p className="mt-2 text-sm text-white/80">{originCity}</p>
      </div>

      <div
        aria-hidden
        className="mx-1 flex flex-1 items-center justify-center text-white/70"
      >
        <PlaneArc />
      </div>

      <div className="flex-1 text-right">
        <p className="text-[11px] uppercase tracking-[0.15em] text-white/60">
          도착
        </p>
        <p className="mt-1 text-4xl font-semibold leading-none tracking-tight tabular">
          {destinationCode}
        </p>
        <p className="mt-2 text-sm text-white/80">{destinationCity}</p>
      </div>
    </div>
  );
}

function PlaneArc() {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      className="h-6 w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 24 Q60 -4 118 24"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="3 4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <g transform="translate(60 8) rotate(90)">
        <path
          d="M0 -7 L2 0 L7 2 L2 3 L0 7 L-2 3 L-7 2 L-2 0 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
