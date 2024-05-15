// page.tsx
'use client';
import QuillEditor from '@/app/components/BlogEditor/QuillEditor';
import TagsSelector from '@/app/components/BlogEditor/TagsSelector';
import { BlogType, TagType } from '@/lib';
import React, { FormEvent, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import JoditEditor from 'jodit-react';
import { showError, showSuccess } from '@/lib/toastNotifications';
import { createBlog } from '@/services/blogService';
import { useRouter } from 'next/navigation';

const CreateBlogPage = () => {
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [clearTagsSignal, setClearTagsSignal] = useState(false);
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const router = useRouter();

  const config = {
    placeholder: 'Start typing',
    readonly: false,
  };

  const initialBlogForm: BlogType = {
    title: '',
    content: '',
    tags: [],
  };
  const [blogForm, setBlogForm] = useState(initialBlogForm);
  const [formErrors, setFormErrors] = useState<z.ZodError | null>(null);

  const handleTagsChange = (tags: TagType[]) => {
    setSelectedTags(tags);
    console.log('Selected Tags:', tags);
    setBlogForm({ ...blogForm, tags });
  };

  const onFormInputChange = (fieldName: string, fieldValue: string) => {
    setBlogForm({ ...blogForm, [fieldName]: fieldValue });
    if (formErrors) {
      const updatedErrors = formErrors.errors.filter(
        (error) => error.path[0] !== fieldName
      );
      const newFormErrors = new z.ZodError(updatedErrors);
      setFormErrors(updatedErrors.length > 0 ? newFormErrors : null);
    }
  };

  const handleTextEditorChange = () => {
    console.log('TOM');
    console.log(content);

    setBlogForm({ ...blogForm, content });
  };

  // Function to check if a specific field has an error
  const hasError = (fieldName: string): any => {
    return formErrors?.errors.some((error) => error.path[0] === fieldName);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const blogData = { ...blogForm, content: content };
      setBlogForm(blogData);

      const result = await createBlog(blogData);
      console.log(result);
      if (result) {
        showSuccess('Blog created !!!');
        resetForm();
        router.push('/dashboard');
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.log(error.errors[0].message);
        setFormErrors(error);
        showError(error.errors[0].message);
      } else {
        console.error('Unexpected error:', error);
        if (error?.response?.data?.message)
          showError(error?.response?.data?.message);
        else showError(error.message);
      }
    }
  };

  const resetForm = () => {
    setClearTagsSignal(true);
    setSelectedTags([]);
    setBlogForm(initialBlogForm);
    setContent('');
  };

  return (
    <div className='p-10'>
      <h1 className='text-center py-4 font-semibold text-2xl'>
        Whats on your mind ?
      </h1>

      <div className='h-screen w-full'>
        {/* <QuillEditor value={content} onChange={handleContentChange} /> */}

        <div className='mx-auto w-2/4'>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <input
                type='text'
                id='title'
                className={`${
                  hasError('title') ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder='Title....'
                name='title'
                required
                onChange={(e) => onFormInputChange('title', e.target.value)}
                value={blogForm.title}
              />
            </div>
            <div className='mb-6'>
              <JoditEditor
                ref={editor}
                value={content}
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {
                  setContent(newContent);
                }}
                className={`w-full h-72`}
              />
            </div>

            {/* Start of tags section */}
            <div className=' mb-12'>
              <TagsSelector
                onTagsChange={handleTagsChange}
                clearTagsSignal={clearTagsSignal}
                setClearTagsSignal={setClearTagsSignal}
                tagsInitialValue={[]}
              />
            </div>
            {/* End of tags section */}
            {/* <button type='submit'>Submit</button> */}

            <div className='flex flex-row justify-center'>
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
    </div>
  );
};

export default CreateBlogPage;
