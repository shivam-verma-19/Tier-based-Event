export default function TierBadge({ tier }: { tier: string }) {
  const colors: Record<string, string> = {
    free: "bg-gray-300 text-gray-800",
    silver: "bg-slate-400 text-white",
    gold: "bg-yellow-400 text-black",
    platinum: "bg-purple-500 text-white",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold ${colors[tier] || "bg-gray-200"}`}>
      {tier.toUpperCase()}
    </span>
  );
}