## Account Screen

- account types: basic (tz1,2,3), contract (KT1) without code, contract with code
- basic account states
  - unclaimed
  - simple
  - delegate
  - baker
- contract states
  - not delegated
  - delegated


### General Account Metadata

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
| 2  | Address                | string   |
| 2  | Name                   | string   |
| 9  | First Seen             | int64    |
| 12 | Last Seen              | int64    |
| 24 | Spendable Balance      | float64  |
| 46 | Num Tx                 | int64    |
| 51 | Min Token Generation   | int64    |
| 52 | Max Token Generation   | int64    |


### Basic/Unclaimed Account Card Datafields

An inactive account belonging to a fundraiser investor with unspendable/unclaimed funds. It's unclear if this type is relevant for us to display and search because such accounts are obfuscated.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
| 23 | Unclaimed Balance      | float64  |

#### Example

```json
```

### Basic/Simple Account Card Datafields

A basic account that has never been registered as delegate.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
| 7  | First In               | int64    |
| 8  | First Out              | int64    |
| 9  | First Seen             | int64    |
| 10 | Last In                | int64    |
| 11 | Last Out               | int64    |
| 12 | Last Seen              | int64    |
| 13 | Total Received         | float64  |
| 14 | Total Sent             | float64  |
| 15 | Total Burned           | float64  |
| 16 | Total Fees Payed       | float64  |
| 34 | Is Revealed            | boolean  |
| 6  | Pubkey                 | string   |

- balance history flow graph (in/out)
- tx history table (when/age/block, sender/receiver, amount, fee, block, op)

#### Example

```json
```

### Basic/Delegate Account Card Datafields

A registered delegate (or deactivated delegate: getting no future rights).

Display all info from basic/simple.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
| 25 | Delegated Balance      | float64  |
| 26 | Total Delegations      | int64    |
| 27 | Active Delegations     | int64    |
| 35 | Is Delegate            | boolean  |
| 36 | Is Active Delegate     | boolean  |
| 49 | Num Proposals          | int64    |
| 50 | Num Ballots            | int64    |

- delegation balance history

#### Example

```json
```

### Basic/Baker Account Card Datafields

An active delegate that has rights for baking/endorsing in the current or a future cycle.

Display all info from basic/simple and basic/delegate.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
| 17 | Total Rewards Earned   | float64  |
| 18 | Total Fees Earned      | float64  |
| 19 | Total Lost             | float64  |
| 20 | Frozen Deposits        | float64  |
| 21 | Frozen Rewards         | float64  |
| 22 | Frozen Fees            | float64  |
| 38 | Blocks Baked           | int64    |
| 39 | Blocks Missed          | int64    |
| 40 | Blocks Stolen          | int64    |
| 41 | Blocks Endorsed        | int64    |
| 42 | Slots Endorsed         | int64    |
| 43 | Slots Missed           | int64    |

- rolls history
- current cycle rights
- current cycle steal/miss history


#### Example

```json
```

### Contract/Not-Delegated Account Card Datafields

Display all info from basic/simple.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
| 30 | Is Vesting             | boolean  |
| 32 | Is Delegatable         | boolean  |
| 33 | Is Delegated           | boolean  |
| 31 | Is Spendable           | boolean  |
| 37 | Is Contract            | boolean  |

- show delegation hint if delegatable

#### Example

```json
```

### Contract/Delegated Account Card Datafields

Display all info from basic/simple and contract/Not-Delegated.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
| 4  | Delegate/Baker         | string   |
| 5  | Manager                | string   |

- display manager account as card
- display baker account as card
- total earned from delegation
- next payout time + amount
- current baker fee
- delegation history (table: when, where, op)

#### Example

```json
```

### Smart Contract with Code

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
|    | Code                   | JSON     |
| 44 | Num Ops                | int64    |
| 45 | Num Ops Failed         | int64    |
| 46 | Num Tx                 | int64    |

- tx activity