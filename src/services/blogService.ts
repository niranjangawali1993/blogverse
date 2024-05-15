import { httpAxios } from '@/helpers/httpHelper';

export const getBlogs = (pageNo: Number) => {
  const result = httpAxios
    .get(`/api/blogs?page=${pageNo}`)
    .then((response) => response.data);
  return result;
};

export const getBlogById = (id: string) => {
  const result = httpAxios
    .get(`/api/blogs/${id}`)
    .then((response) => response.data);
  return result;
};

export const createBlog = (blogData: any) => {
  const result = httpAxios
    .post('/api/blogs', blogData)
    .then((response) => response.data);
  return result;
};

export const updateBlog = (id: string, blogData: any) => {
  const result = httpAxios
    .patch(`/api/blogs/${id}`, blogData)
    .then((response) => response.data);
  return result;
};

export const deleteBlogById = (id: string) => {
  const result = httpAxios
    .delete(`/api/blogs/${id}`)
    .then((response) => response.data);
  return result;
};

export const searchBlogByTitle = async (searchText: string) => {
  const result = await httpAxios
    .get(`/api/blogs/search?q=${searchText}`)
    .then((response) => response.data);
  return result;
};
