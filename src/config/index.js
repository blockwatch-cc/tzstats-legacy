import { bakerAccounts } from './baker-accounts';
import { proposals } from './proposals';
export const fiatCurrencies = [{ name: 'USD', symbol: '$' }, { name: 'EUR', symbol: '€' }];
export const networks = [{ name: 'MAINNET' }, { name: 'ZERONET' }, { name: 'ALPHANET' }];
export const graphColors = ['#18ecf2', '#29bcfa', '#3e85f1', '#858999', '#858999', '#858999'];
export const DAY_INTERVALS = [30, 7, 1];
export const TZSTATS_URL = 'https://api.tzstats.com';
export const GOOGLE_ANALYTICS_API_KEY = process.env.GOOGLE_ANALYTICS_API_KEY || '<[GOOGLE_ANALYTICS_API_KEY]>';
export const ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
export const opNames = {
  "activate_account": "Activation",
  "double_baking_evidence": "Double Baking",
  "double_endorsement_evidence": "Double Endorsement",
  "seed_nonce_revelation": "Seed Nonce",
  "transaction": "Transaction",
  "origination": "Origination",
  "delegation": "Delegation",
  "reveal": "Reveal",
  "endorsement": "Endorsement",
  "proposals": "Proposal",
  "ballot" : "Ballot",
};
export const govNames = {
  "1": "Proposal",
  "proposal": "Proposal",
  "2": "Exploration Vote",
  "testing_vote": "Exploration Vote",
  "3": "Testing",
  "testing": "Testing",
  "4": "Promotion Vote",
  "promotion_vote": "Promotion Vote"
};
export {
  bakerAccounts,
  proposals
}