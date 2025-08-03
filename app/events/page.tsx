"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "../../lib/supabase"; 
import EventCard from "../../components/EventCard";

const tierOrder = ["free", "silver", "gold", "platinum"];

export default function EventsPage() {
  const { user, isLoaded } = useUser();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userTier, setUserTier] = useState<string>("free");

  useEffect(() => {
    if (!isLoaded || !user) return;

    const tier = (user.publicMetadata?.tier as string) || "free";
    setUserTier(tier);

    const supabase = createClient();
    supabase
      .from("events")
      .select("*")
      .in("tier", tierOrder.slice(0, tierOrder.indexOf(tier) + 1))
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
        } else {
          setEvents(data || []);
        }
        setLoading(false);
      });
  }, [isLoaded, user]);

  const handleUpgrade = async () => {
    const nextTierIndex = tierOrder.indexOf(userTier) + 1;
    if (nextTierIndex >= tierOrder.length) return;

    const newTier = tierOrder[nextTierIndex];
    await user?.update({
      unsafeMetadata: { tier: newTier },
    });
    setUserTier(newTier);
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .in("tier", tierOrder.slice(0, tierOrder.indexOf(newTier) + 1));

    if (error) {
      setError(error.message);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events for {userTier.toUpperCase()} Tier</h1>

      {tierOrder.indexOf(userTier) < tierOrder.length - 1 && (
        <button
          onClick={handleUpgrade}
          className="mb-6 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Upgrade to {tierOrder[tierOrder.indexOf(userTier) + 1].toUpperCase()}
        </button>
      )}

      {loading && <p className="text-center">Loading events...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}