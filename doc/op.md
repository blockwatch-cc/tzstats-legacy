## Operation Screen

### Operation Card Datafields

Operation types

- `activate_account`
- `double_baking_evidence`
- `double_endorsement_evidence`
- `seed_nonce_revelation`
- `transaction`
- `origination`
- `delegation`
- `reveal`
- `endorsement`
- `proposals`
- `ballot`

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
| 1  | Height (Block)         | int64    | 490290  | 490,290    |
| 2  | Block Hash             | string   | BLL7rrbvctDwoRCwi2BQx17eJWFm2NybtF8K6wmgiNtGHAXQSyX | shortened `BLL7rr...QSyX` |
| 3  | Cycle                  | int64    | 119     | 119 |
| 4  | Timestamp              | datetime | 2019-06-21T22:39:26Z | as locale, Jun 21, 2019 22:39:26 |
| 5  | Op Hash                | string   | onrhJ63qD5ADyW21huJQYpeeSoE9uD6vSHvPNpLuV7j8tJSzEfk | shortened `onrhJ...zEfk` |
| 6  | Type                   | string   | transaction | Transaction |
| 7  | Gas Limit              | int64    | 10300 | 10,300 |
| 8  | Gas Used               | int64    | 10200 | 10,200 |
| 9  | Gas Price              | float64  | 0.13922 | 0.14µꜩ |
| 10 | Storage Limit          | int64    | 65 | 65 bytes |
| 11 | Storage Size           | int64    | 4358 | 4,358 bytes |
| 12 | Storage Paid           | int64    | 45 | 45 bytes |
| 13 | Volume                 | float64  | 317612 | 0.32ꜩ |
| 14 | Fee                    | float64  | 1420 | 1.42mꜩ |
| 15 | Burned                 | float64  | 0 | 0ꜩ |
| 16 | Sender                 | string   | tz1SYq214SCBy9naR6cvycQsYcUGpBqQAE8d | shortened `tz1SYq2...AE8d` or name |
| 17 | Receiver               | string   | tz1TtWTrNfGUnAZedng8KPwhRhTW5i9ELbjy | shortened `tz1TtWT...Lbjy` or name; may be zero |
| 18 | Is Success             | boolean  | true | as tag in card header `Success` or `Failed` |
| 19 | Is Contract            | boolean  | false | as tag next to receiver `Contract` |
| 20 | Is Internal            | boolean  | false | as tag in card header `Internal` |
| 22 | Data                   | string   | null | operation-type specific data, decode and display |
| 23 | Call Parameters        | JSON     | null | contract only, type specific decode and display |
| 24 | Storage Update         | JSON     | null | contract only, type specific decode and display |
| 25 | Days Destroyed         | float64  | 0.000882 | 1.3 min |

### Example

```json
{
    "block": "BLL7rrbvctDwoRCwi2BQx17eJWFm2NybtF8K6wmgiNtGHAXQSyX",
    "burned": 0,
    "counter": 85471,
    "cycle": 119,
    "days_destroyed": 0.000882,
    "deposit": 0,
    "fee": 1420,
    "gas_limit": 10300,
    "gas_price": 0.13922,
    "gas_used": 10200,
    "hash": "onrhJ63qD5ADyW21huJQYpeeSoE9uD6vSHvPNpLuV7j8tJSzEfk",
    "height": 490290,
    "is_contract": false,
    "is_success": true,
    "reward": 0,
    "receiver": "tz1TtWTrNfGUnAZedng8KPwhRhTW5i9ELbjy",
    "sender": "tz1SYq214SCBy9naR6cvycQsYcUGpBqQAE8d",
    "storage_limit": 300,
    "storage_paid": 0,
    "storage_size": 0,
    "time": "2019-06-21T22:39:26Z",
    "type": "transaction",
    "volume": 317612
}
```

```json
{
    "block": "BLcQHM4CJZ86NBqN7S9y1TcUdKwmiox7SU1iBaq1CbvBySYzGvU",
    "burned": 45000,
    "counter": 12018,
    "cycle": 1,
    "days_destroyed": 0,
    "deposit": 0,
    "fee": 0,
    "gas_limit": 102498,
    "gas_price": 0,
    "gas_used": 102398,
    "hash": "ony2WradGMprXgtx75cWHLQKx8nnP2g3Aiu9v11caxfi4WzXnwQ",
    "height": 5978,
    "is_contract": true,
    "is_success": true,
    "reward": 0,
    "sender": "KT1R3uoZ6W1ZxEwzqtv75Ro7DhVY6UAcxuK2",
    "storage_limit": 65,
    "storage_paid": 45,
    "storage_size": 4358,
    "time": "2018-07-04T21:39:27Z",
    "type": "transaction",
    "volume": 0
}
```