// @flow
import { BLOCKWATCH_URL, BLOCKWATCH_API_KEY } from '../../config';

import fetch from 'isomorphic-fetch';
console.log(process.env);
export const API_KEY = process.env.API_KEY;
const request = (endpoint, options) => {
  return fetch(`${BLOCKWATCH_URL}${endpoint}?api_key=${BLOCKWATCH_API_KEY}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    ...options,
  });
};

const createUrl = options => {
  let query = '?';
  if (options.datasetCode) {
    query += options.datasetCode;
  }
  if (options.collapse) {
    query += `&collapse=${options.collapse}`;
  }
  if (options.columns) {
    query += `&columns=${options.columns}`;
  }
  if (options.limit) {
    query += `&limit=${options.limit}`;
  }
  if (options.filter) {
    query += `&${options.filter}`;
  }
  if (options.endDate) {
    query += `&end_date=${options.endDate}`;
  }
  if (options.order) {
    query += `&order=${options.order}`;
  }
  if (options.startDate) {
    query += `&start_date=${options.startDate}`;
  }
};

export const test = async options => {
  const urlOptions = {};
  const response = await request(createUrl(urlOptions), {
    method: 'GET',
  });

  if (response.status === 400) {
    const { error } = await response.json();
    throw new Error(error);
  }

  const { data } = await response.json();
  return data;
};
