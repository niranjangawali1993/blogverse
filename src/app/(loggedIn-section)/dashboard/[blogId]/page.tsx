'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBlogById } from '@/services/blogService';
import { TagType } from '@/lib';
import BlogView from '@/app/components/BlogView';
import BlogViewSkeleton from '@/app/components/Skeletons/BlogViewSkeleton';

const BlogDetails = () => {
  const params = useParams();
  const { blogId } = params;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const validatedBlogId = Array.isArray(blogId) ? blogId[0] : blogId;

  return (
    <div>
      {isLoading ? (
        <BlogViewSkeleton />
      ) : typeof validatedBlogId === 'string' ? (
        <BlogView blogId={validatedBlogId} />
      ) : (
        <p>Blog ID is not specified or is not valid.</p>
      )}
    </div>
  );
};

export default BlogDetails;
