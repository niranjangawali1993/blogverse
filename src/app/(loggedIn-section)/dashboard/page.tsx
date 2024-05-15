'use client';
import SingleBlogHorizontalView from '@/app/components/LandingPageSection/SingleBlogHorizontalView';
import Tag from '@/app/components/LandingPageSection/Tag';
import SingleBlogSkeleton from '@/app/components/Skeletons/SingleBlogSkeleton';
import BlogInterface from '@/interfaces/Blog.interface';
import TagInterface from '@/interfaces/Tag.interface';
import { showSuccess } from '@/lib/toastNotifications';
import { deleteBlogById, getBlogs } from '@/services/blogService';
import { getTags } from '@/services/tagsService';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const DashboardPage = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('forYou');
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Handler to update the active tab
  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const [tags, setTags] = useState<TagInterface[]>([]);

  const getBlogsData = async (page: number) => {
    const output = await getBlogs(page);
    const blogOutput = output.data;
    return blogOutput;
  };

  const getTagsData = async () => {
    const output = await getTags();
    const tagOutput = output.data;
    setTags(tagOutput);
  };

  const fetchBlogsInitialCall = async () => {
    setIsLoading(true);
    const result = await getBlogsData(pageNo);
    if (result && result.length > 0) {
      setTimeout(() => {
        setBlogs([...result]);
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchBlogsInitialCall();
    getTagsData();
  }, []);

  const loadMoreBlogs = async (e: any) => {
    e.preventDefault();
    console.log('loading more => ', pageNo);

    const result = await getBlogsData(pageNo + 1);
    if (result && result.length > 0) {
      setBlogs((prev) => [...prev, ...result]);
      setPageNo((prevPageNo) => prevPageNo + 1);
    } else {
      showSuccess('You have reached the end !');
    }
  };

  const handleDelete = (blogId: string) => {
    console.log('handle delete => ', blogId);
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const output = await deleteBlogById(blogId);
        if (output.data) {
          const updatedBlogList = blogs.filter((b) => b._id != blogId);
          setBlogs(updatedBlogList);
        }
      }
    });
  };

  return (
    <div className='flex flex-row mt-10'>
      <div className='flex-grow'>
        <div className='w-2/3 float-left border-r'>
          <div className='px-40'>
            <div className='flex flex-row justify-left items-center p-4 text-gray-500 border-b text-sm sticky top-0 z-40 bg-white'>
              <span className='px-2 text-3xl cursor-pointer hover:text-black'>
                +
              </span>
              {/* For you tab */}
              <span
                className={`px-2 cursor-pointer border-b-2 ${
                  activeTab === 'forYou'
                    ? 'border-black text-black'
                    : 'hover:text-black border-transparent'
                }`}
                onClick={() => handleTabClick('forYou')}
              >
                For you
              </span>
              {/* Following tab */}
              <span
                className={`px-2 cursor-pointer border-b-2 ${
                  activeTab === 'following'
                    ? 'border-black text-black'
                    : 'hover:text-black border-transparent'
                }`}
                onClick={() => handleTabClick('following')}
              >
                Following
              </span>
            </div>

            <div className='mt-20'>
              {isLoading ? (
                Array.from({ length: 5 }, (_, idx) => (
                  <SingleBlogSkeleton key={idx} />
                ))
              ) : (
                <div>
                  {blogs.map((singleBlog) => {
                    return (
                      <div key={singleBlog._id}>
                        <SingleBlogHorizontalView
                          singleBlog={singleBlog}
                          handleDelete={handleDelete}
                        />
                      </div>
                    );
                  })}
                </div>
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
          </div>
        </div>
        <div className='w-1/3 float-right sticky top-0 px-6'>
          <div className='my-10 '>
            <h1 className='font-bold text-base'>Staff Picks</h1>
            {blogs.slice(0, 3).map((singleBlog, index) => {
              return (
                <div key={index} className='mt-4'>
                  <p className='text-sm'>Liza Donnelly</p>
                  <p className='font-semibold text-pretty mt-1'>
                    {singleBlog.title}
                  </p>
                </div>
              );
            })}
          </div>
          <div className='mt-5'>
            <h1 className='font-semibold'>Recommended topics</h1>
            <div className='mt-5 flex flex-wrap justify-start items-center'>
              {tags.map((singleTag) => {
                return (
                  <Tag key={singleTag._id.toString()} singleTag={singleTag} />
                );
              })}
            </div>
          </div>

          {/* Below is dummy data start */}
          <div className='my-10 '>
            <h1 className='font-bold text-base'>Staff Picks</h1>
            {blogs.slice(0, 3).map((singleBlog, index) => {
              return (
                <div key={index} className='mt-4'>
                  <p className='text-sm'>Liza Donnelly</p>
                  <p className='font-semibold text-pretty mt-1'>
                    {singleBlog.title}
                  </p>
                </div>
              );
            })}
          </div>

          <div className='my-10 '>
            <h1 className='font-bold text-base'>Staff Picks</h1>
            {blogs.slice(0, 3).map((singleBlog, index) => {
              return (
                <div key={index} className='mt-4'>
                  <p className='text-sm'>Liza Donnelly</p>
                  <p className='font-semibold text-pretty mt-1'>
                    {singleBlog.title}
                  </p>
                </div>
              );
            })}
          </div>
          {/* Below is dummy data end */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
