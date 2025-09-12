"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { fdb } from '../../../lib/firebase';

type Event = {
  id: string;
  name: string;
  description: string;
  buildAddress: string;
  buildingName: string;
  buildingRoom: string;
  foods: string;
  hasAccommodation: boolean;
  speakerName: string;
  semester: string;
  tags: string;
  startAt?: {
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
  const q = query(collection(fdb, 'events'), orderBy('startAt', 'asc'));
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
        <h1 className="text-5xl font-bold">
          🎉 <span className="text-bright-yellow">Club</span> Events
        </h1>
      </div>

      {/* Auth Controls removed: events page is public */}

      {/* Type of Events */}
      <div>
        <h2 className="text-3xl font-bold mb-2">📌 What We Do</h2>
        <p className="text-lg">
          Bi-weekly meetings with workshops, guest speakers, hackathons, competitions, and company tours.
        </p>
      </div>

      {/* Upcoming Events */}
      <div>
  <h2 className="text-3xl font-bold mb-6">📅 Upcoming Events</h2>

  <div className="space-y-6">
          {loading && <p className="text-gray-400">Loading events...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && !error && events.length === 0 && (
            <p className="text-gray-400">No upcoming events available.</p>
          )}

          {!loading && !error && events.map((event) => (
            <div
              key={event.id}
              className="bg-gradient-to-br from-blue-900 to-gray-900 rounded-2xl border border-blue-500 p-6 space-y-3 shadow-md"
            >
              <h3 className="text-2xl font-bold mb-2 text-blue-300">🎓 {event.name}</h3>

              <p className="text-yellow-300 font-medium">
                🏛️ {event.buildingName} — Room {event.buildingRoom}
              </p>
              <p className="text-sm text-gray-400">{event.buildAddress}</p>

              {event.startAt && (
                <p className="text-sm text-gray-400">
                  ⏰ {new Date(event.startAt.seconds * 1000).toLocaleString()}
                </p>
              )}

              <p className="text-gray-300">{event.description}</p>

              <div className="text-sm text-gray-300 mt-3 space-y-1">
                <p>🎤 <span className="font-semibold">Speaker:</span> {event.speakerName}</p>
                <p>📚 <span className="font-semibold">Semester:</span> {event.semester}</p>
                <p>🏷️ <span className="font-semibold">Tags:</span> {event.tags}</p>
                <p>🍕 <span className="font-semibold">Foods:</span> {event.foods}</p>
                <p>🛏️ <span className="font-semibold">Accommodation:</span> {event.hasAccommodation ? 'Yes' : 'No'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
