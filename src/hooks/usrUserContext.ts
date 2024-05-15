import { UserContext } from '@/contexts/user/UserContext';
import { useContext } from 'react';

const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export default useUserContext;
