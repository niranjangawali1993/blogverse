import { httpAxios } from '@/helpers/httpHelper';
import { LoginModelType, SignUpModelType } from '@/lib';

export const signUpUser = (body: SignUpModelType) => {
  const result = httpAxios
    .post('/api/signup', body)
    .then((response) => response.data);
  return result;
};

export const loginUser = (body: LoginModelType) => {
  const result = httpAxios
    .post('/api/login', body)
    .then((response) => response.data);
  return result;
};

export const getCurrentUser = async () => {
  const result = await httpAxios
    .get('/api/current')
    .then((response) => response.data);
  return result;
};

export const logoutUser = async () => {
  const result = await httpAxios
    .get('/api/logout')
    .then((response) => response.data);
  return result;
};
