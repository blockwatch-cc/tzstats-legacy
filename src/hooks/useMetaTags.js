import React from 'react';
import { useGlobal } from 'reactn';
import _ from 'lodash';


export function buildTitle(config, page, name, by) {
  let title = [];
  page && title.push(page);
  name && title.push(name);
  if (typeof by !== 'undefined') {
    title.push(by);
  } else {
    title.push('on');
    title.push(document.location.host);
  }
  return title.join(' ');
}

export function useMetaTags(page, name, by) {
  const [config] = useGlobal('config');

  React.useEffect(() => {
    const title = buildTitle(config, page, name, by);
    document.title = title;
    let meta = document.getElementsByTagName("META");
    _.find(meta, ['name', 'og:title']).content = title;
    _.find(meta, ['name', 'twitter:title']).content = title;
    _.find(meta, ['name', 'og:url']).content = document.location.href;
    let link = document.getElementsByTagName("LINK");
    _.find(link, ['rel', 'canonical']).href = document.location.href;
  }, [config, page, name, by]);
};

