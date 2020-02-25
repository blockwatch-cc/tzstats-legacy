#### Delegation Services

for up-to-date lists of bakers check
- https://github.com/baking-bad/better-call-dev/blob/master/src/app/bakersAliases.js
- https://www.tezbaker.io/health/bakeoff
- https://kukai.app/bakers-list
- https://bakendorse.com
- https://baking-bad.com
- https://mytezosbaker.com


### Staking Capacity

We use a conservative global estimator based on current delegate balance and network wide rolls

```
                                                        chain.rolls * 8000
(account.spendable_balance + account.frozen_deposits) * -------------------
                                                          2560 * 4096 * 5
```


- it looks at how much share of the network-wide 5-cycle bond a delegate owns right now and projects this ratio onto the current network stake
- constants are derived from protocol paramaters (2560 is upper bound on deposits per block)
- the formula is conservative when network stake remains stable or grows, on sharp drops it overestimates


Formula Explanation

We took a long time to design the most accurate formula to estimate capacity. See https://github.com/blockwatch-cc/tzstats/issues/46 and the formula is implemented here https://github.com/blockwatch-cc/tzstats/blob/master/src/components/Accounts/AccountInfo/AccountInfo.js#L128.

I call it most accurate because: it uses protocol constants, current network-wide rolls and a bakers current balance. Updates are live each block.


Research our formula is based on is available at https://economy.p2p.org/confusion-with-calculation-of-available-staking-capacity-in-tezos-who-is-right/ and https://medium.com/cryptium/over-delegation-and-self-bond-requirements-for-bakers-and-delegators-in-tezos-17ac49230d3a.
Others use either slightly or vastly different formulas that add inaccuracies or use stale data for their calculations.
