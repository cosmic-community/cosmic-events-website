import { createBucketClient } from '@cosmicjs/sdk';
import { Event, Post, Author } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
});

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all events with related objects
export async function getEvents(): Promise<Event[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Event[];
  } catch (error) {
    // Handle 404 (no objects found) gracefully
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    // For build-time, log the error but don't throw to prevent build failure
    console.warn('Warning: Failed to fetch events during build:', error);
    return [];
  }
}

// Fetch single event by slug
export async function getEvent(slug: string): Promise<Event | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'events',
        slug 
      })
      .depth(1);
    
    const event = response.object as Event;
    
    if (!event || !event.metadata) {
      return null;
    }
    
    return event;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.warn(`Warning: Failed to fetch event ${slug}:`, error);
    return null;
  }
}

// Fetch events by status
export async function getEventsByStatus(status: string): Promise<Event[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'events',
        'metadata.event_status.key': status
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Event[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.warn(`Warning: Failed to fetch events by status ${status}:`, error);
    return [];
  }
}

// Fetch all posts with authors
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.warn('Warning: Failed to fetch posts during build:', error);
    return [];
  }
}

// Fetch single post by slug
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'posts',
        slug 
      })
      .depth(1);
    
    const post = response.object as Post;
    
    if (!post || !post.metadata) {
      return null;
    }
    
    return post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.warn(`Warning: Failed to fetch post ${slug}:`, error);
    return null;
  }
}

// Fetch all authors
export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Author[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.warn('Warning: Failed to fetch authors during build:', error);
    return [];
  }
}

// Fetch single author by slug
export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'authors',
        slug 
      });
    
    const author = response.object as Author;
    
    if (!author || !author.metadata) {
      return null;
    }
    
    return author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.warn(`Warning: Failed to fetch author ${slug}:`, error);
    return null;
  }
}
