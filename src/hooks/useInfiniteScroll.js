import { useState, useEffect } from 'react';

const useInfiniteScroll = callback => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    document.getElementById('main-panel').addEventListener('scroll', handleScroll);
    return () => document.getElementById('main-panel').removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [callback, isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching)
      return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
