import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const BlogViewSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col justify-left px-4 sm:px-6 md:px-12 lg:px-24 xl:px-96 2xl:px-96'>
      <div>
        {/* Simulate Title */}
        <Skeleton variant='text' height={40} width='80%' />

        {/* Simulate Tags */}
        <div className='my-10 flex flex-row justify-start items-center'>
          {[1, 2, 3].map(
            (
              tag // Assuming 3 tags as an example
            ) => (
              <Skeleton
                key={tag}
                variant='rectangular'
                width={80}
                height={24}
                className='mx-2 rounded-full'
              />
            )
          )}
        </div>

        {/* Simulate Content Lines */}
        <div className='space-y-4'>
          <Skeleton variant='text' height={20} width='100%' />
          <Skeleton variant='text' height={20} width='90%' />
          <Skeleton variant='text' height={20} width='80%' />
          <Skeleton variant='text' height={20} width='80%' />
          <Skeleton variant='text' height={20} width='80%' />
          <Skeleton variant='text' height={20} width='80%' />
          <Skeleton variant='text' height={20} width='80%' />
          {/* Add as many lines as needed to represent the content */}
        </div>
      </div>
    </div>
  );
};

export default BlogViewSkeleton;
