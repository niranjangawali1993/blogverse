'use client';
import React, { Suspense, useEffect, useState } from 'react';
import blogSVG from './../../assets/blog-svg.svg';

import Image from 'next/image';
import { getBlogs } from '@/services/blogService';
import { getTags } from '@/services/tagsService';
import { useThrottle } from '@/hooks';
import useCommonContext from '@/hooks/useCommonContext';
import BlogInterface from '@/interfaces/Blog.interface';
import TagInterface from '@/interfaces/Tag.interface';
import Tag from '../LandingPageSection/Tag';
// import { SingleBlogHorizontalViewLazy } from './SingleBlogHorizontalView';
const SingleBlogHorizontalViewLazy = React.lazy(
  () => import('./SingleBlogHorizontalView')
);

import FooterLinks from '../FooterLinks';
import { showSuccess } from '@/lib/toastNotifications';
import SingleBlogSkeleton from '../Skeletons/SingleBlogSkeleton';

const LandingPage = () => {
  // stages
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const [tags, setTags] = useState<TagInterface[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Common context
  const { setHeaderBg, managePopup } = useCommonContext();

  const getBlogsData = async (pageNo: number) => {
    console.log('METHOD IS CALLED............. ', pageNo);
    const output = await getBlogs(pageNo);
    const blogOutput = output.data;
    return blogOutput;
  };

  const getTagsData = async () => {
    const output = await getTags();
    const tagOutput = output.data;
    setTags(tagOutput);
  };

  const listenScrollEvent = () => {
    const mainDiv = document.getElementById('main-banner');
    if (mainDiv) {
      let mainDivTop = mainDiv.getBoundingClientRect().top;
      mainDivTop = mainDivTop * -1;
      const triggerHeight = window.innerHeight / 2;
      const shouldSetHeaderBg = mainDivTop > triggerHeight;

      if (shouldSetHeaderBg) setHeaderBg(true);
      else setHeaderBg(false);
    }
  };

  const changeHeaderColor = useThrottle(listenScrollEvent, 100);

  useEffect(() => {
    window.addEventListener('scroll', changeHeaderColor);
    return () => {
      window.removeEventListener('scroll', changeHeaderColor);
    };
  }, []);

  const fetchBlogsInitialCall = async () => {
    setIsLoading(true);
    const result = await getBlogsData(pageNo);
    if (result && result.length > 0) {
      setTimeout(() => {
        setBlogs([...result]);
        setPageNo(pageNo + 1);
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    getTagsData();
    fetchBlogsInitialCall();
  }, []);

  const openSignupPopup = () => {
    managePopup(true);
  };

  const loadMoreBlogs = async (e: any) => {
    e.preventDefault();
    const result = await getBlogsData(pageNo);
    if (result && result.length > 0) {
      setBlogs((prev) => [...prev, ...result]);
      setPageNo(pageNo + 1);
    } else {
      showSuccess('You have reached the end !');
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex-grow'>
        {/* Start of banner  */}
        <div
          className='flex flex-row bg-yellow-400 p-20 overflow-y-auto scroll border-b border-black'
          id='main-banner'
        >
          <div className='flex-1'>
            <div className='flex flex-col mx-8 px-4 text-black'>
              <h1 className='text-8xl'>Stay curious.</h1>
              <div className='mt-10'>
                <p className='text-2xl'>
                  Discover stories, thinking, and expertise from writers on any
                  topic.
                </p>
              </div>
              <div className='mt-10 bg-black text-white py-3 px-5 rounded-3xl w-60 text-center'>
                <button className='px-1 text-xl' onClick={openSignupPopup}>
                  Start reading
                </button>
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='mt-20'>
              <Image
                src={blogSVG}
                alt='Blog page'
                style={{
                  width: '80%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Showing blogs  */}
        <div className='flex px-40 bg-white'>
          <div className='w-2/3 text-black mt-20 float-right'>
            {isLoading ? (
              Array.from({ length: 5 }, (_, idx) => (
                <SingleBlogSkeleton key={idx} />
              ))
            ) : (
              // <Suspense fallback={<SingleBlogSkeleton />}>
              <div>
                {blogs.map((singleBlog) => (
                  <div key={singleBlog._id}>
                    <SingleBlogHorizontalViewLazy
                      singleBlog={singleBlog}
                      handleDelete={undefined}
                    />
                  </div>
                ))}
              </div>
              // </Suspense>
            )}

            <div className='text-center'>
              <button
                className='bg-green-300 p-2 border rounded-lg'
                onClick={(e) => loadMoreBlogs(e)}
              >
                Load more
              </button>
            </div>
          </div>

          {/* Show the tags */}

          <div className={`w-1/3 text-black mt-20 ml-8 float-left`}>
            <div className='sticky top-32 z-0'>
              <h1 className='text text-start font-semibold'>
                Discover more of what matters to you
              </h1>

              <div className='mt-5 flex flex-wrap justify-start items-center'>
                {tags.slice(0, 5).map((singleTag) => {
                  return (
                    <Tag key={singleTag._id.toString()} singleTag={singleTag} />
                  );
                })}
              </div>
              <FooterLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
