export const fiatCurrencies = [{ name: 'USD', symbol: '$' }, { name: 'EUR', symbol: '€' }];
export const networks = [{ name: 'MAINNET' }, { name: 'ZERONET' }, { name: 'ALPHANET' }];
export const DAY_INTERVALS = [30, 7, 1];
export const TZSTATS_URL = 'http://localhost:8002';
//export const TZSTATS_URL = 'https://api.tzstats.com';
export const BLOCKWATCH_URL = 'https://data.blockwatch.cc/v1/';
export const BLOCKWATCH_API_KEY = process.env.REACT_APP_API_KEY || '<[BLOCKWATCH_API_KEY]>';
export const GOOGLE_ANALYTICS_API_KEY = process.env.GOOGLE_ANALYTICS_API_KEY || '<[GOOGLE_ANALYTICS_API_KEY]>';
