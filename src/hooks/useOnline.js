import React, { useEffect, useState } from 'react';
import { TZSTATS_API_URL } from '../config';

const useOnline = () => {
  const isLocal = React.useRef(TZSTATS_API_URL.indexOf('localhost')>-1);
  const [isOnline, setIsOnline] = useState(isLocal.current||navigator.onLine);

  const handleEvent = React.useCallback(async ev => {
    setIsOnline(isLocal.current||navigator.onLine);
  },[setIsOnline]);

  useEffect(() => {
    window.addEventListener('online', handleEvent);
    window.addEventListener('offline', handleEvent);
    return () => {
		window.removeEventListener('online', handleEvent);
		window.removeEventListener('offline', handleEvent);
    };
  },[handleEvent]);

  return isOnline;
};

export default useOnline;
