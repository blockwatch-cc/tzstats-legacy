import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback, targetId) => {
  const [isFetching, setIsFetching] = useState(false);
  let debounce = false;

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

  function handleScroll(ev) {
    const e = ev.target;
    const containerHeight = e.clientHeight;
    const contentHeight = e.scrollHeight
    const scrollPos = e.scrollTop;
    if (debounce || isFetching || scrollPos < (contentHeight - 3 * containerHeight)) {
      debounce = false;
      return;
    }
    debounce = true;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
