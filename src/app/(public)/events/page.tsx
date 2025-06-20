"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../lib/firebase";

type Event = {
  id: string;
  title: string;
  location: string;
  description: string;
  date?: {
    seconds: number;
    nanoseconds: number;
  };
};

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, "events"), orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);

        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];

        setEvents(eventsData);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error("Error fetching events:", errorMessage);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents().catch((err) => {
      console.error("Unexpected error in fetchEvents:", err);
    });
  }, []);

  return (
    <div className="info-page text-text dark:text-text-inverted flex flex-col gap-8">
      {/* Page Title */}
      <div>
        <h1 className="title">
          <span className="text-bright-yellow">CLUB</span> EVENTS
        </h1>
      </div>

      {/* Type of Events */}
      <div>
        <h2 className="mb-2 text-3xl font-bold">TYPE OF EVENTS</h2>
        <p className="text-text dark:text-text-inverted text-lg">
          Bi-weekly meetings with workshops, guest speakers, hackathons,
          competitions, and company tours.
        </p>
      </div>

      {/* Upcoming Events */}
      <div>
        <h2 className="mb-6 text-3xl font-bold">UPCOMING EVENTS</h2>

        <div className="space-y-6">
          {loading && <p className="text-gray-400">Loading events...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && !error && events.length === 0 && (
            <p className="text-gray-400">No upcoming events available.</p>
          )}

          {!loading &&
            !error &&
            events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border border-blue-500 bg-gray-900 p-6"
              >
                <h3 className="mb-2 text-2xl font-bold text-blue-400">
                  {event.title}
                </h3>
                <p className="mb-1 text-yellow-300">{event.location}</p>
                {event.date && (
                  <p className="mb-2 text-sm text-gray-400">
                    {new Date(event.date.seconds * 1000).toLocaleString()}
                  </p>
                )}
                <p className="text-gray-300">{event.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
