<!-- README_START -->
# Cosmic Events Website

A modern Next.js website showcasing events, blog posts, and authors from your Cosmic CMS bucket. This responsive web application features a clean design with event listings, detailed event pages, blog functionality, and author profiles.

![Cosmic Events Website](https://imgix.cosmicjs.com/8c8a5be0-55d8-11f0-a051-23c10f41277a-photo-1540575467063-178a50c2df87-1751304899246.jpg?w=1200&h=400&fit=crop&auto=format,compress)

## Features

- 🎉 **Event Management System** - Display upcoming conferences, meetups, workshops, and webinars
- 📝 **Blog Integration** - Showcase blog posts with full content and author information
- 👥 **Author Profiles** - Display author information and related content
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🎨 **Modern UI** - Clean, professional interface with smooth interactions
- 🏷️ **Event Filtering** - Filter events by type, status, and tags
- 📅 **Event Details** - Complete event information including registration links
- 🔍 **Content Search** - Easy navigation and content discovery
- ⚡ **Performance Optimized** - Built with Next.js 15 and Server Components

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=website-production)

## Original Prompt

This application was built based on the following request:

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Content Management**: Cosmic CMS
- **Language**: TypeScript
- **Image Optimization**: Imgix
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the content bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

This application demonstrates various Cosmic SDK patterns:

### Fetching Events with Related Objects
```typescript
const response = await cosmic.objects
  .find({ type: 'events' })
  .depth(1) // Include related objects
  .props(['id', 'title', 'slug', 'metadata']);
```

### Filtering Events by Status
```typescript
const upcomingEvents = await cosmic.objects
  .find({ 
    type: 'events',
    'metadata.event_status.key': 'upcoming'
  })
  .depth(1);
```

### Error Handling for Empty Results
```typescript
try {
  const response = await cosmic.objects.find({ type: 'events' });
  return response.objects;
} catch (error) {
  if (error.status === 404) {
    return []; // Handle empty results
  }
  throw error;
}
```

## Cosmic CMS Integration

This website integrates with your existing Cosmic bucket structure:

- **Events**: Conference, workshop, webinar, and meetup listings
- **Posts**: Blog articles with authors and cover images
- **Authors**: Speaker and organizer profiles
- **Object Relationships**: Events connected to organizers and related posts

The application uses the Cosmic SDK to fetch content with proper error handling and TypeScript type safety.

## Deployment Options

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy automatically

For production, set these environment variables in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->