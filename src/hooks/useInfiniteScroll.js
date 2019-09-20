import React, { useEffect, useRef } from 'react';

const useInfiniteScroll = (callback, id) => {
  const isFetching = useRef(false);

  const handleScroll = React.useCallback(async ev => {
      if (isFetching.current) { return; }
      const e = ev.target;
      const containerHeight = id==='body'?e.scrollingElement.clientHeight:e.clientHeight;
      const contentHeight = id==='body'?e.scrollingElement.scrollHeight:e.scrollHeight;
      const scrollPos = id==='body'?e.scrollingElement.scrollTop:e.scrollTop;
      if (scrollPos < (contentHeight - 2 * containerHeight)) { return; }
      isFetching.current = true;
      await callback();
      setTimeout(()=>{ isFetching.current=false },500);
  },[callback,id]);

  useEffect(() => {
    let e = id ==='body'?window:document.getElementById(id);
    if (e) { e.addEventListener('scroll', handleScroll); }
    return () => {
      let e = id ==='body'?window:document.getElementById(id);
      if (e) { e.removeEventListener('scroll', handleScroll); }
    };
  },[callback, id, handleScroll]);

};

export default useInfiniteScroll;
