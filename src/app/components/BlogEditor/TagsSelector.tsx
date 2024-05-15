import React, { useEffect, useState } from 'react';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import { getTags } from '@/services/tagsService';
import { TagType, TagsSelectorProps } from '@/lib';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagsSelector = ({
  onTagsChange,
  clearTagsSignal,
  setClearTagsSignal,
  tagsInitialValue,
}: TagsSelectorProps) => {
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const getBlogsData = async () => {
    try {
      const response = await getTags();
      const apiTags = response.data;
      const formattedTags: Tag[] = apiTags.map((tag: TagType) => ({
        id: tag._id,
        text: tag.name,
      }));
      setSuggestions(formattedTags);
    } catch (error) {
      console.error('An error occurred while fetching tags:', error);
    }
  };

  // Setting tags value in case of update
  const setTagsValue = (tags: TagType[]) => {
    let userTags: Tag[] = [];
    if (tags?.length > 0) {
      console.log('NI => ', tags);
      tags.map((singleTag) => {
        userTags.push({ id: singleTag._id, text: singleTag.name });
      });
      setTags(userTags);
    }
  };

  useEffect(() => {
    if (tagsInitialValue) {
      setTagsValue(tagsInitialValue);
    }
  }, [tagsInitialValue]);

  useEffect(() => {
    getBlogsData();
  }, []);

  useEffect(() => {
    setTags([]);
    setClearTagsSignal(false);
  }, [clearTagsSignal, setClearTagsSignal]);

  const updateTagsAndNotify = (newTags: Tag[]) => {
    setTags(newTags);
    onTagsChange(newTags.map((tag) => ({ _id: tag.id, name: tag.text })));
  };

  const handleDelete = (i: number) => {
    setTags((prevTags) => prevTags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    const objectIdRegExp = /^[0-9a-fA-F]{24}$/;
    if (objectIdRegExp.test(tag.id)) {
      const newTags = [...tags, tag];
      updateTagsAndNotify(newTags);
    }
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    updateTagsAndNotify(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        delimiters={delimiters}
        inputFieldPosition='bottom'
        allowUnique={true}
        autocomplete
        minQueryLength={1}
        classNames={{
          tags: 'flex flex-wrap cursor-pointer',
          tagInput: 'w-full',
          tagInputField:
            'border border-gray-300 rounded-md p-2 w-full mt-5 bg-gray-50 text-gray-900 text-sm rounded-lg focus:border-blue-500',
          selected: 'bg-gray-100 rounded p-1',
          tag: 'bg-blue-500 hover:bg-blue-600 text-white font-medium text-xs rounded py-1 px-2 mr-1',
          remove: 'inline-block ml-1 cursor-pointer',
        }}
      />
    </div>
  );
};

export default TagsSelector;
