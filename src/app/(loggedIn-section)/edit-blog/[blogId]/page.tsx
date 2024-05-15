'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBlogById, updateBlog } from '@/services/blogService';
import { BlogType, TagType } from '@/lib';
import JoditEditor from 'jodit-react';
import TagsSelector from '@/app/components/BlogEditor/TagsSelector';
import { showError } from '@/lib/toastNotifications';

const EditBlog = () => {
  const params = useParams();
  const { blogId } = params;
  console.log('id -> ', blogId);
  const [blog, setBlog] = useState<any | null>(null);
  const [clearTagsSignal, setClearTagsSignal] = useState(false);
  const router = useRouter();

  const initialBlogForm: BlogType = {
    title: '',
    content: '',
    tags: [],
  };
  const [blogForm, setBlogForm] = useState(initialBlogForm);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  const handleTagsChange = (tags: TagType[]) => {
    setSelectedTags(tags);
    console.log('Selected Tags:', tags);
    setBlogForm({ ...blogForm, tags });
  };

  const getBlogData = async (blogId: string) => {
    const result = await getBlogById(blogId);
    setBlog(result.data);
  };

  useEffect(() => {
    if (typeof blogId === 'string') {
      getBlogData(blogId);
    }
  }, [blogId]);

  // Function to save the changes when the user exits the editable title
  const handleTitleBlur = (event: any) => {
    const newTitle = event.target.innerText;
    setBlogForm({ ...blogForm, title: newTitle });
  };

  const handleContentBlur = (newContent: any) => {
    setBlogForm({ ...blogForm, content: newContent });
  };

  useEffect(() => {
    if (blog) {
      // When the blog data is fetched, set it in the blogForm state
      setBlogForm({
        ...blogForm,
        title: blog.title,
        content: blog.content,
        tags: blog.tags,
      });
    }
  }, [blog]);

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validatedBlogId = Array.isArray(blogId) ? blogId[0] : blogId;

    if (
      !blogForm.title ||
      blogForm.title.length == 0 ||
      !blogForm.content ||
      blogForm.content.length == 0 ||
      !blogForm.tags ||
      blogForm.tags.length == 0
    ) {
      showError('Please make sure all fields filled correctly !!!');
    }
    console.log(blogForm);
    await updateBlog(validatedBlogId, blogForm);
    router.push('/dashboard');
  };

  const resetForm = () => {
    console.log('Reset the form');
    setBlogForm(initialBlogForm);
    setClearTagsSignal(true);
  };

  return (
    <div className='flex flex-col justify-left px-4 sm:px-6 md:px-12 lg:px-24 xl:px-96 2xl:px-96'>
      <div>
        <form onSubmit={handleEdit}>
          <div
            contentEditable
            suppressContentEditableWarning={true}
            className='content-editable-title font-semi-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-4 sm:my-6 md:my-8 outline-none cursor-text'
            role='textbox'
            aria-multiline={false}
            onBlur={handleTitleBlur}
          >
            {blog?.title || ''}
          </div>
          <div className='mb-12'>
            <TagsSelector
              onTagsChange={handleTagsChange}
              clearTagsSignal={clearTagsSignal}
              setClearTagsSignal={setClearTagsSignal}
              tagsInitialValue={blog?.tags}
            />
          </div>

          <JoditEditor
            value={blogForm.content}
            onBlur={handleContentBlur}
            className='font-light text-base sm:text-lg md:text-xl'
          />
          <div className='flex flex-row justify-center mt-10'>
            <button
              type='button'
              onClick={resetForm}
              className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            >
              Reset
            </button>
            <button
              type='submit'
              className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
