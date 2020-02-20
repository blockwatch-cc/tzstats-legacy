import React from 'react';
import { useGlobal } from 'reactn';
import { TZSTATS_API_URL } from '../config';
import _ from 'lodash';

// works with /explorer/config and /explorer/chain objects
export function isMainnet(o) {
  return (o && o.chain_id === 'NetXdQprcVkpaWU') || TZSTATS_API_URL === "https://api.tzstats.com" || TZSTATS_API_URL === "https://api.staging.tzstats.com";
}

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

