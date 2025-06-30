// components/PostCard.tsx
import Link from 'next/link';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.metadata.cover_image?.imgix_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${post.metadata.cover_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {post.metadata.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          {post.metadata.date && (
            <time dateTime={post.metadata.date}>
              {formatDate(post.metadata.date)}
            </time>
          )}
          
          <div className="flex items-center gap-2">
            <span>📖</span>
            <span>Read more</span>
          </div>
        </div>
      </div>
    </article>
  );
}