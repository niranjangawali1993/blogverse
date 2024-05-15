import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SingleBlogSkeleton = () => {
  return (
    <div className='py-4'>
      <div className='flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-4 h-full'>
        {/* Image Skeleton */}
        <Skeleton
          variant='rectangular'
          width={192}
          height={170}
          className='!rounded-t-lg md:!h-auto md:!w-48 md:!rounded-none md:!rounded-l-lg'
        />

        {/* Content Skeleton */}
        <div className='flex flex-col justify-between flex-grow px-4 leading-normal'>
          <Skeleton variant='text' width='80%' className='!h-10 !mb-2' />
          <Skeleton variant='text' width='100%' className='!h-6 !mb-3' />
          <Skeleton variant='text' width='100%' className='!h-6 !mb-3' />

          {/* Footer Skeleton */}
          <div className='flex flex-col justify-between flex-grow'>
            <Skeleton
              variant='text'
              width='30%'
              className='!h-4 !text-sm !mb-4'
            />
            <div className='flex flex-row justify-between items-end pt-4'>
              <Skeleton variant='text' width='20%' className='!h-4 !text-xs' />
              <div className='flex items-center'>
                <Skeleton variant='circular' width={20} height={20} />
                <Skeleton
                  variant='circular'
                  width={20}
                  height={20}
                  className='ml-2'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogSkeleton;
