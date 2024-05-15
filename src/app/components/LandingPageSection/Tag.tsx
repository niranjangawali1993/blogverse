import TagInterface from '@/interfaces/Tag.interface';
import React from 'react';

type TagProps = {
  singleTag: TagInterface;
};

const Tag: React.FC<TagProps> = ({ singleTag }) => {
  return (
    <>
      <span
        className='bg-white text-gray-800 text-sm font-medium me-2 px-4 py-3 rounded-full dark:bg-black-900 dark:text-white-300 mb-2 cursor-pointer border hover:bg-gray-100 shadow'
        key={singleTag._id.toString()}
      >
        {singleTag.name}
      </span>
    </>
  );
};

export default Tag;
