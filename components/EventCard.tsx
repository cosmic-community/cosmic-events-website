// components/EventCard.tsx
import Link from 'next/link';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {event.metadata.featured_image?.imgix_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${event.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {event.metadata.event_type?.value || 'Event'}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            event.metadata.event_status?.key === 'upcoming' 
              ? 'bg-green-100 text-green-800'
              : event.metadata.event_status?.key === 'live'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {event.metadata.event_status?.value || 'TBD'}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <Link 
            href={`/events/${event.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {event.title}
          </Link>
        </h3>

        {event.metadata.description && (
          <div 
            className="text-gray-600 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ 
              __html: event.metadata.description.substring(0, 150) + '...' 
            }}
          />
        )}

        <div className="space-y-2 text-sm text-gray-500">
          {event.metadata.start_datetime && (
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{formatDate(event.metadata.start_datetime)}</span>
            </div>
          )}
          
          {event.metadata.location && (
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{event.metadata.location}</span>
            </div>
          )}

          {event.metadata.organizer && (
            <div className="flex items-center gap-2">
              <span>👤</span>
              <span>Organized by {event.metadata.organizer.title}</span>
            </div>
          )}
        </div>

        {event.metadata.registration_required && event.metadata.registration_url && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a
              href={event.metadata.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Register Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}