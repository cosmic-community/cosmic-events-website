// components/EventFilter.tsx
'use client';

interface EventFilterProps {
  selectedType: string;
  selectedStatus: string;
  onTypeChange: (type: string) => void;
  onStatusChange: (status: string) => void;
}

const eventTypes = [
  { key: '', value: 'All Types' },
  { key: 'conference', value: 'Conference' },
  { key: 'workshop', value: 'Workshop' },
  { key: 'webinar', value: 'Webinar' },
  { key: 'meetup', value: 'Meetup' },
  { key: 'other', value: 'Other' }
];

const eventStatuses = [
  { key: '', value: 'All Status' },
  { key: 'upcoming', value: 'Upcoming' },
  { key: 'live', value: 'Live Now' },
  { key: 'completed', value: 'Completed' },
  { key: 'cancelled', value: 'Cancelled' }
];

export default function EventFilter({ 
  selectedType, 
  selectedStatus, 
  onTypeChange, 
  onStatusChange 
}: EventFilterProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Events</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <select
            id="event-type"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {eventTypes.map((type) => (
              <option key={type.key} value={type.key}>
                {type.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="event-status" className="block text-sm font-medium text-gray-700 mb-2">
            Event Status
          </label>
          <select
            id="event-status"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {eventStatuses.map((status) => (
              <option key={status.key} value={status.key}>
                {status.value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}