// app/events/[slug]/page.tsx
import { getEvent, getEvents } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((event) => ({
    slug: event.slug,
  }))
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    notFound()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBD'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Event Header */}
        <div className="mb-8">
          <Link href="/events" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Events
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {event.metadata?.event_type && (
              <span className={`event-badge event-badge-${event.metadata.event_type.key}`}>
                {event.metadata.event_type.value}
              </span>
            )}
            {event.metadata?.event_status && (
              <span className={`status-badge status-badge-${event.metadata.event_status.key}`}>
                {event.metadata.event_status.value}
              </span>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {event.metadata?.featured_image && (
          <div className="mb-8">
            <img
              src={`${event.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={event.title}
              className="w-full h-96 object-cover rounded-xl"
              width={1200}
              height={600}
            />
          </div>
        )}

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {event.metadata?.description && (
              <div className="prose prose-lg max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: event.metadata.description }} />
              </div>
            )}
          </div>

          {/* Event Info Sidebar */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Event Details</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Start Date</h4>
                <p>{formatDate(event.metadata?.start_datetime)}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">End Date</h4>
                <p>{formatDate(event.metadata?.end_datetime)}</p>
              </div>
              
              {event.metadata?.location && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Location</h4>
                  <p>{event.metadata.location}</p>
                </div>
              )}
              
              {event.metadata?.organizer && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Organizer</h4>
                  <p>{event.metadata.organizer.title}</p>
                </div>
              )}
              
              {event.metadata?.max_capacity && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Capacity</h4>
                  <p>{event.metadata.max_capacity} attendees</p>
                </div>
              )}
              
              {event.metadata?.is_recurring && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Recurring</h4>
                  <p>{event.metadata.repeat_pattern?.value || 'Yes'}</p>
                </div>
              )}
              
              {event.metadata?.tags && event.metadata.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.metadata.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-sm rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {event.metadata?.registration_required && event.metadata?.registration_url && (
              <div className="mt-6">
                <a
                  href={event.metadata.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block"
                >
                  Register Now
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Related Posts */}
        {event.metadata?.related_posts && event.metadata.related_posts.length > 0 && (
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.metadata.related_posts.map((post) => (
                <PostCard key={post.id} post={post} showAuthor={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}