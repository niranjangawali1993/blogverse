// QuillEditor.tsx
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
// import ReactQuill from 'react-quill';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  // This line is important to prevent Next.js from trying to render the component on the server
  loading: () => <p>Loading editor...</p>,
});

// You might want to use props to make the component more flexible
interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, false] }],
  //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //     [
  //       { list: 'ordered' },
  //       { list: 'bullet' },
  //       { indent: '-1' },
  //       { indent: '+1' },
  //     ],
  //     ['link', 'image'],
  //     ['clean'],
  //   ],
  // };

  // const formats = [
  //   'header',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'blockquote',
  //   'list',
  //   'bullet',
  //   'indent',
  //   'link',
  //   'image',
  // ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'], // remove formatting button
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'color',
    'background',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'align',
  ];

  return (
    <ReactQuill
      className='h-full'
      theme='snow'
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default QuillEditor;
