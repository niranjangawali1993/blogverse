import { CommonContext } from '@/contexts/common/CommonContext';
import { useContext } from 'react';

const useCommonContext = () => {
  const context = useContext(CommonContext);
  return context;
};

export default useCommonContext;
