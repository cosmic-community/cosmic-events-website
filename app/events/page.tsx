import { getEvents } from '@/lib/cosmic'
import EventCard from '@/components/EventCard'
import EventFilter from '@/components/EventFilter'

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Events</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover conferences, workshops, meetups, and webinars from industry experts
        </p>
      </div>

      <EventFilter events={events} />
    </div>
  )
}