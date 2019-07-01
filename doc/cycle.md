## Cycle Screen

Cycles are a central concept for aligning block creation and verification rights in Tezos. A cycle is 4096 blocks long. All rights to bake and endorse blocks in cycle N are determined at the end of cycle N-5 based on staking balances at a randomly selected snapshot block in cycle N-7. There are 16 snapshot blocks per cycle, each 256 blocks apart. Snapshot blocks are known beforehand, the first snapshot is block number 256 in a cycle the last is the last block in a cycle. What's unknown until the end of cycle N-5 is which snapshot will be selected to draw rights for cycle N. Cycle N-6 is used to exchange nonces for seeding the random selection process.

Staking balances are counted in rolls (currently 1 roll == 8,000 XTZ). The more supply is staking the more rolls exist. Rights for baking the 4096 blocks and endorsing them in 32 * 4096 endorsing slots are randomly distributed among all active bakers proportional to the number of rolls each baker owns.

There are always two cycles related to a current cycle N, which are

- cycle N-7 which determines rights for the current cycle and
- cycle N+7 who's rights are determined by the current cycle

For simplicity we ignore the cycle where seed nonce revelations are published.

Related concepts

```
cycle N-7 -> snapshot block -> staking balance -> rolls -> baking/endorsing rights for cycle N
```

### Cycle History

- time-line of 3 related cycle clocks left-to-right with non-relevant intermediate cycles displayed as dots, all separated by dashes to depict a sequence
- center is current cycle N, left end is past cycle N-7, right end is future cycle N+7
- maybe display a single dash + dot at both ends to suggest infinite continuation of this pattern
- current cycle is still filling up and incomplete (some snapshots missing, no golden snapshot selected)
- past cycle is complete and may have snapshot selected, future cycle is always empty

### Cycle Card Datafields


| #  | Name                          | Type     | Example | Display as |
|----|-------------------------------|----------|---------|------------|
| 1  | Cycle Number                  | int64 ||
| 2  | Start Block                   | int64 ||
| 3  | End Block                     | int64 ||
| 4  | Start Time (estimate)         | datetime ||
| 5  | End Time (estimate)           | datetime ||
| 6  | Total Unique Baking Rights    | int64 ||
| 7  | Actual Unique Bakers          | int64 ||
| 8  | Total Unique Endorsing Rights | int64 ||
| 9  | Actual Unique Endorsers       | int64 ||
| 10 | Mean Priority Baked           | int64 ||
| 11 | Median Priority Baked         | int64 ||
| 12 | Max Priority Baked            | int64 ||
| 13 | Num Double Bakings            | int64 ||
| 14 | Num Double Endorsements       | int64 ||
| 15 | Num Uncle Blocks              | int64 ||
| 16 | Total Endorse Slots Missed    | int64 ||


Graphs related to the current cycle

- Top-N bakers by Balance/Rolls List
  - Name/Address
  - #Delegators (coming from N-7),
  - Staking Balance (coming from N-7)
  - Rolls (coming from N-7)
  - Rewards (collected in current cyle N)
  - Deposits (payed in current cycle N)
- max block priorities graph
- max block times graph
- endorse slots missed graph

Graphs related to the future cycle N+7 (with snapshot points overlay)

- current active delegate count graph
- current active delegators count graph
- current active staking balance graph
- current rolls count graph
- current re-delegation traffic by volume
