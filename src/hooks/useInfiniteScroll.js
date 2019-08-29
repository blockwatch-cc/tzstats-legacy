import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback, targetId) => {
  const [isFetching, setIsFetching] = useState(false);
  let debounce = false;

  useEffect(() => {
    function handleScroll(ev) {
      const e = ev.target;
      const containerHeight = e.clientHeight||e.scrollingElement.clientHeight;
      const contentHeight = e.scrollHeight||e.scrollingElement.scrollHeight;
      const scrollPos = typeof(e.scrollTop!=='undefined')?e.scrollTop:e.scrollingElement.scrollTop;
      if (debounce || isFetching || scrollPos < (contentHeight - 3 * containerHeight)) {
        debounce = false;
        return;
      }
      debounce = true;
      setIsFetching(true);
    }

    let targetElem = targetId==='body'?window:document.getElementById(targetId);
    if (targetElem) {
      targetElem.addEventListener('scroll', handleScroll);
      return () => {
        let elem = targetId==='body'?window:document.getElementById(targetId);
        if (elem) {
          elem.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [targetId]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [callback, isFetching]);


  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
