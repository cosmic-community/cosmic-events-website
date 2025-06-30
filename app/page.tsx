import { getEvents, getPosts } from '@/lib/cosmic'
import EventCard from '@/components/EventCard'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export default async function HomePage() {
  const [events, posts] = await Promise.all([
    getEvents(),
    getPosts()
  ])

  const upcomingEvents = events.filter(event => 
    event.metadata?.event_status?.key === 'upcoming'
  ).slice(0, 3)

  const featuredPosts = posts.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Welcome to Cosmic Events
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Discover amazing events, read insightful blog posts, and connect with industry experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events" className="btn-primary bg-white text-primary hover:bg-white/90">
              Explore Events
            </Link>
            <Link href="/posts" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
              Read Blog Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't miss out on these exciting upcoming events and opportunities to learn and network
            </p>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No upcoming events at the moment.</p>
            </div>
          )}
          
          <div className="text-center">
            <Link href="/events" className="btn-primary">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Latest Blog Posts</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay updated with the latest insights, tutorials, and industry news
            </p>
          </div>
          
          {featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} showAuthor={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No blog posts available at the moment.</p>
            </div>
          )}
          
          <div className="text-center">
            <Link href="/posts" className="btn-primary">
              Read All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}