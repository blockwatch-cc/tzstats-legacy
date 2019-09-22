import React, { useEffect, useState } from 'react';

const useOnline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleEvent = React.useCallback(async ev => {
  	setIsOnline(navigator.onLine);
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
