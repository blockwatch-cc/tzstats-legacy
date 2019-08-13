import { useContext } from 'react';
import RouterContext from './context';

export default function useRouter() {
  return useContext(RouterContext);
}
