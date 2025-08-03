import TierBadge from "./TierBadge";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  tier: string;
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <TierBadge tier={event.tier} />
      </div>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-sm text-gray-500">📅 {new Date(event.date).toDateString()}</p>
    </div>
  );
}