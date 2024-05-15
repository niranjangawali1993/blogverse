import { httpAxios } from '@/helpers/httpHelper';

export const getTags = () => {
  const result = httpAxios.get('/api/tags').then((response) => response.data);
  return result;
};
