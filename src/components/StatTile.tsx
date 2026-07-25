interface StatTileProps {
  value: string;
  label: string;
}

export default function StatTile({ value, label }: StatTileProps) {
  return (
    <div className="flex-1 rounded-2xl bg-white/10 px-2 py-5 text-center">
      <div className="hd text-3xl text-sun-base">{value}</div>
      <div className="text-[13px] text-brand-lighter">{label}</div>
    </div>
  );
}
