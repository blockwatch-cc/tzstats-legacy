import { bakerAccounts } from './baker-accounts';
import { proposals } from './proposals';
export const fiatCurrencies = [
  { name: 'USD', symbol: '$' },
  { name: 'EUR', symbol: '€' },
  { name: 'CAD', symbol: 'CAD' },
  { name: 'JPY', symbol: '¥' },
];
export const graphColors = ['#18ecf2', '#29bcfa', '#3e85f1', '#858999', '#858999', '#858999'];
export const TZSTATS_API_URL = process.env.REACT_APP_TZSTATS_API_URL || '<[TZSTATS_API_URL]>';
export const GOOGLE_ANALYTICS_API_KEY =
  process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY || '<[GOOGLE_ANALYTICS_API_KEY]>';
export const defaultFont = "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif";
export const opNames = {
  activate_account: 'Activation',
  double_baking_evidence: 'Double Baking',
  double_endorsement_evidence: 'Double Endorsement',
  seed_nonce_revelation: 'Seed Nonce',
  transaction: 'Transaction',
  origination: 'Origination',
  delegation: 'Delegation',
  reveal: 'Reveal',
  endorsement: 'Endorsement',
  proposals: 'Proposal',
  ballot: 'Ballot',
  call: 'Contract Call'
};
export const govNames = {
  '1': 'Proposal',
  proposal: 'Proposal',
  '2': 'Exploration Vote',
  testing_vote: 'Exploration Vote',
  '3': 'Testing',
  testing: 'Testing',
  '4': 'Promotion Vote',
  promotion_vote: 'Promotion Vote',
};
export { bakerAccounts, proposals };
