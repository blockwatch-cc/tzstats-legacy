import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback, targetId) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let targetElem = document.getElementById(targetId);
    if (targetElem) {
      document.getElementById(targetId).addEventListener('scroll', handleScroll);
      return () => {
        let elem = document.getElementById(targetId);
        if (elem) {
          elem.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [handleScroll, targetId]);

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
