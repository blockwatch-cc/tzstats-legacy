export const fiatCurrencies = [{ name: 'USD', symbol: '$' }, { name: 'EUR', symbol: '€' }];
export const networks = [{ name: 'MAINNET' }, { name: 'ZERONET' }, { name: 'ALPHANET' }];
export const BLOCKWATCH_URL = process.env.BLOCKWATCH_URL || 'https://cors-anywhere.herokuapp.com/https://data.blockwatch.cc/v1/';
export const BLOCKWATCH_API_KEY = process.env.REACT_APP_API_KEY || '[[BLOCKWATCH_API_KEY]]';
export const GOOGLE_ANALYTICS_API_KEY = process.env.GOOGLE_ANALYTICS_API_KEY || '[[GOOGLE_ANALYTICS_API_KEY]]';
export const DAY_INTERVALS = [30, 7, 1];
export const TZSTATS_URL = process.env.TZSTATS_URL;
