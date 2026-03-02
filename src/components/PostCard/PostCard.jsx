import React from 'react';
import bucketService from '../../appwrite/bucketService';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredimage, $createdAt, content = '', index = 0 }) {
  const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
  const rotation = rotations[index % rotations.length];

  // Helper to strip HTML tags from content
  const stripHtml = (html) => {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const excerpt = stripHtml(content);

  return (
    <Link
      to={`/post/${$id}`}
      className={`block group ${rotation} opacity-100 transition-all duration-700`}
    >
      <div className="flex flex-col h-full border-brutal bg-card shadow-brutal hover:shadow-brutal-lg hover:-translate-y-2 transition-all duration-300">
        <div className="aspect-video overflow-hidden border-b-brutal border-b-4">
          <img
            src={bucketService.getFilePreview(featuredimage)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
              {$createdAt ? new Date($createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
            </span>
          </div>
          <h2 className="font-anton text-3xl md:text-4xl mb-4 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h2>
          {excerpt && (
            <div className="mb-4 flex-grow border-l-brutal border-l-4 border-primary pl-4 py-1">
              <p className="text-foreground font-medium text-base leading-relaxed line-clamp-3">
                {excerpt}
              </p>
            </div>
          )}
          <div className="mt-auto inline-flex items-center gap-2 font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
            Read More
            <span className="text-primary text-xl">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard;