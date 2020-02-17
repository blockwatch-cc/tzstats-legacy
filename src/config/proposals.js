export const proposals = {
  empty: {
    id: -1,
    name: '–',
    by: '',
    link: '',
    docu: '',
    archive: '',
    height: -1
  },
  Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd: {
    id: 11,
    name: 'Athens A',
    by: 'Nomadic Labs',
    link: 'https://blog.nomadic-labs.com/athens-proposals-injected.html',
    docu: 'http://tezos.gitlab.io/master/protocols/004_Pt24m4xi.html',
    archive: 'https://blog.nomadic-labs.com/files/Athens_proposal_A.tar',
    height: 458753
  },
  Psd1ynUBhMZAeajwcZJAeq5NrxorM6UCU4GJqxZ7Bx2e9vUWB6z: {
    name: 'Athens B',
    id: 11,
    by: 'Nomadic Labs',
    link: 'https://blog.nomadic-labs.com/athens-proposals-injected.html',
    docu: 'http://tezos.gitlab.io/master/protocols/004_Pt24m4xi.html',
    archive: 'https://blog.nomadic-labs.com/files/Athens_proposal_B.tar',
    height: -1
  },
  PtdRxBHvc91c2ea2evV6wkoqnzW7TadTg9aqS9jAn2GbcPGtumD: {
    id: 12,
    name: 'Brest A',
    by: 'OCamlPro',
    link: 'https://www.reddit.com/r/tezos/comments/by5xy8/proposal_for_amendment_brest_a/',
    archive: 'https://gitlab.com/tzscan/brest-amendment',
    height: -1
  },
  PsBABY5nk4JhdEv1N1pZbt6m6ccB9BfNqa23iKZcHBh23jmRS9f: {
    id: 13,
    name: 'Babylon 1.0',
    by: 'Nomadic Labs',
    link: 'https://blog.nomadic-labs.com/babylon-proposal-injected.html',
    docu: 'tezos.gitlab.io/master/protocols/005_babylon.html',
    archive: 'https://blog.nomadic-labs.com/files/babylon_005_PsBABY5n.tar',
    height: -1
  },
  PsBABY5HQTSkA4297zNHfsZNKtxULfL18y95qb3m53QJiXGmrbU: {
    id: 13,
    name: 'Babylon 2.0',
    by: 'Nomadic Labs',
    link: 'https://blog.nomadic-labs.com/babylon-proposal-injected.html',
    docu: 'tezos.gitlab.io/master/protocols/005_babylon.html',
    archive: 'https://blog.nomadic-labs.com/files/babylon_005_PsBABY5H.tar',
    height: -1
  },
  PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS: {
    id: 13,
    name: 'Babylon 2.0.1',
    by: 'Nomadic Labs',
    link: 'https://blog.nomadic-labs.com/mainnet-release-to-patch-babylon.html',
    docu: 'http://tezos.gitlab.io/master/protocols/005_babylon.html#bug-affecting-bigmaps-in-005-psbaby5h',
    archive: 'https://blog.nomadic-labs.com/files/babylon_005_PsBabyM1.tar',
    height: 655361
  },
  PtCarthavAMoXqbjBPVgDCRd5LgT7qqKWUPXnYii3xCaHRBMfHH: {
    id: 15,
    name: 'Carthage 1.0',
    by: 'Nomadic Labs',
    link: 'https://blog.nomadic-labs.com/carthage-changelog-and-testnet.html',
    docu: 'http://tezos.gitlab.io/protocols/006_carthage.html',
    archive: 'https://blog.nomadic-labs.com/files/carthage_006_PtCartha.tar',
    height: -1
  },
  PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb: {
    id: 16,
    name: 'Carthage 2.0',
    by: 'Nomadic Labs',
    link: 'https://medium.com/cryptium/on-the-carthage-proposal-and-the-carthagenet-test-network-de876930445e',
    docu: 'https://tezos.gitlab.io/protocols/006_carthage.html',
    archive: 'https://gitlab.com/nomadic-labs/tezos/tree/proto-006',
    height: 851969
  },
};

export function getProposalIdByName(value) {
  if (!value) {
    return null; // for search
  }
  const hashes = Object.keys(proposals).filter(key => {
    return proposals[key].name.includes(value);
  });
  return hashes[0] ? proposals[hashes[0]].id : null;
}

export function getProposalById(value) {
  if (!value) {
      return proposals.empty;
  }
  const hashes = Object.keys(proposals).filter(k => proposals[k].id === value);
  return hashes[0] ? proposals[hashes[0]] : {
    id: value,
    by: '',
    name: hashes[0] ? hashes[0].slice(0, 7) + '...' : '-',
    link: 'https://www.tezosagora.org/',
    docu: '',
    archive:'',
    height: -1
  };
}

export function getProposalByHash(value) {
  if (!value) {
      return proposals.empty;
  }
  const hashes = Object.keys(proposals).filter(key => {
    return key.includes(value);
  });
  return hashes[0] ? proposals[hashes[0]] : {
    id: 0,
    by: '',
    name: value.slice(0, 7) + '...',
    link: 'https://www.tezosagora.org/',
    docu: '',
    archive:'',
    height: -1
  };
}

export function getProposalByHeight(value) {
  if (!value) {
      return proposals.empty;
  }
  const hashes = Object.keys(proposals).filter(k => proposals[k].height === value);
  return hashes[0] ? proposals[hashes[0]] : {
    id: value,
    by: '',
    name: hashes[0] ? hashes[0].slice(0, 7) + '...' : '-',
    link: 'https://www.tezosagora.org/',
    docu: '',
    archive:'',
    height: -1
  };
}
