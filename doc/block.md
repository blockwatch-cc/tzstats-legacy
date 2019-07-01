## Block Screen

### Block/Chain History

- Option 1: 24h tx volume bar chart (1440 blocks)
- Option 2: line/branch of blocks (like Git history)
  - display last 6-10 blocks and orphan branches only
  - x axis is real-time
  - distance is block time
  - information: tx count, tx volume, priority, block number, block time
  - blocks may be visualized by circles
  - 3 sizes (diameters): empty, low, high tx volume
  - 4 different fill levels inside the circle for empty, low, medium, high tx count
  - a missed block time slot may be visualized with a small dot instead of a circle
    (the number of dots would then also signify the priority visually)

### Block Card Datafields

A simple block card displaying label/value pairs. Should give overview about main block properties, but avoid too much detail.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
| 1  | Block Hash             | string   | BLL7rrbvctDwoRCwi2BQx17eJWFm2NybtF8K6wmgiNtGHAXQSyX | shortened `BLL7rr...QSyX` |
| 2  | Block Time             | datetime | 2019-06-21T22:39:26Z | as locale, Jun 21, 2019 22:39:26 |
| 3  | Height                 | int64    | 490290  | 490,290 |
| 4  | Cycle                  | int64    | 119     | 119 |
| 5  | Solvetime              | int64    | 60      | 1 min |
| 6  | Priority               | int64    | 0       | 0 |
| 7  | Baker                  | string   | tz1R6Ej25VSerE3MkSoEEeBjKHCDTFbpKuSX | `tz1R6Ej...KuSX` or `TezosSEAsia` |
| 8  | Slots Endorsed         | uint64   | 4294967295 | 32/32 |
| 9  | Num Ops                | int64    | 31      | 31 |
| 10 | Num Tx                 | int64    | 5       | 5 |
| 11 | Transaction Volume     | float64  | 8726849 | 8.73ꜩ |
| 12 | Block Fees             | float64  | 35541   | 0.36ꜩ |
| 13 | Block Rewards          | float64  | 78000000| 78ꜩ |
| 14 | Gas Used               | int64    | 259943  | 259,943 |
| 15 | Gas Price              | float64  | 0.13673 | 0.14µꜩ |
| 16 | Days destroyed         | float64  | 53.533006 | 53.53 days |

### Example

```json
{
    "activated_supply": 0,
    "baker": "tz1R6Ej25VSerE3MkSoEEeBjKHCDTFbpKuSX",
    "baker_id": 58986,
    "burned_supply": 0,
    "cycle": 119,
    "days_destroyed": 53.533006,
    "deposits": 2496000000,
    "endorsed_slots": 4294967295,
    "fees": 35541,
    "fitness": 15399744,
    "gas_limit": 261000,
    "gas_price": 0.13673,
    "gas_used": 259943,
    "hash": "BLL7rrbvctDwoRCwi2BQx17eJWFm2NybtF8K6wmgiNtGHAXQSyX",
    "height": 490290,
    "n_accounts": 33,
    "n_activation": 0,
    "n_ballot": 0,
    "n_cleared_accounts": 0,
    "n_delegation": 0,
    "n_double_baking": 0,
    "n_double_endorsement": 0,
    "n_endorsement": 25,
    "n_funded_accounts": 0,
    "n_new_accounts": 0,
    "n_new_contracts": 0,
    "n_new_implicit": 0,
    "n_new_managed": 0,
    "n_ops": 31,
    "n_ops_contract": 2,
    "n_ops_failed": 0,
    "n_origination": 0,
    "n_proposal": 0,
    "n_reveal": 1,
    "n_seed_nonce": 0,
    "n_tx": 5,
    "nonce": 15111069733,
    "parent_id": 490291,
    "predecessor": "BM8PBBzUx7XVKgeJvZCyW3q6ktWJwGvE3zvH3dGFh98W5pHbU19",
    "priority": 0,
    "rewards": 78000000,
    "row_id": 490292,
    "solvetime": 60,
    "storage_size": 8869,
    "time": "2019-06-21T22:39:26Z",
    "unfrozen_deposits": 0,
    "unfrozen_fees": 0,
    "unfrozen_rewards": 0,
    "validation_pass": 4,
    "version": 4,
    "volume": 8726849,
    "voting_period_kind": "proposal"
}
```