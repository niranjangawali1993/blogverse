import React from 'react';
import Logo from './Logo';
import FooterLinks from './FooterLinks';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='border border-t'>
      <div className='flex flex-row justify-between p-4'>
        <div>
          <Logo />
        </div>
        <div>
          <span className='text-xs text-gray-500 mx-4 my-2 cursor-pointer underline'>
            Help
          </span>
          <span className='text-xs text-gray-500 mx-4 my-2 cursor-pointer underline'>
            Status
          </span>
          <Link
            href={'/about'}
            className='text-xs text-gray-500 mx-4 my-2 cursor-pointer underline'
          >
            About
          </Link>
          <span className='text-xs text-gray-500 mx-4 my-2 cursor-pointer underline'>
            Careers
          </span>
          <span className='text-xs text-gray-500 mx-4 my-2 cursor-pointer underline'>
            Blog
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
