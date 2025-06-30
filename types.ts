// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug?: string;
  created_at: string;
  modified_at: string;
}

// Event type with comprehensive metadata
export interface Event extends CosmicObject {
  type_slug?: 'events';
  metadata: {
    description?: string;
    start_datetime?: string;
    end_datetime?: string;
    location?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    event_type?: {
      key: EventType;
      value: string;
    };
    event_status?: {
      key: EventStatus;
      value: string;
    };
    organizer?: Author;
    related_posts?: Post[];
    max_capacity?: number;
    registration_required?: boolean;
    registration_url?: string;
    is_recurring?: boolean;
    repeat_pattern?: {
      key: RepeatPattern;
      value: string;
    };
    tags?: string[];
  };
}

// Post type with author and content
export interface Post extends CosmicObject {
  type_slug?: 'posts';
  metadata: {
    content?: string;
    excerpt?: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    author?: string | Author;
    date?: string;
  };
}

// Author type with picture
export interface Author extends CosmicObject {
  type_slug?: 'authors';
  metadata: {
    picture?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Home content type
export interface Home extends CosmicObject {
  type_slug?: 'homes';
  metadata: {
    subtitle?: string;
    date?: string;
  };
}

// Hello content type
export interface Hello extends CosmicObject {
  type_slug?: 'hellos';
  metadata: {
    text?: string;
    number?: number;
  };
}

// Type literals for select-dropdown values
export type EventType = 'conference' | 'workshop' | 'webinar' | 'meetup' | 'other';
export type EventStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';
export type RepeatPattern = 'daily' | 'weekly' | 'monthly' | 'yearly';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isEvent(obj: CosmicObject): obj is Event {
  return obj.type_slug === 'events' || 'event_type' in (obj.metadata || {});
}

export function isPost(obj: CosmicObject): obj is Post {
  return obj.type_slug === 'posts' || 'content' in (obj.metadata || {});
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type_slug === 'authors' || 'picture' in (obj.metadata || {});
}

// Utility types
export type EventCardProps = {
  event: Event;
  className?: string;
};

export type PostCardProps = {
  post: Post;
  showAuthor?: boolean;
  className?: string;
};

export type AuthorCardProps = {
  author: Author;
  className?: string;
};