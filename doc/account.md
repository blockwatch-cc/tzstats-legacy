## Account Screen

- account types:
  - basic accounts (tz1,2,3) that may or may not delegate (in v5)
  - baker accounts (tz1,2,3) no matter if active or inactive
  - smart contracts without and with code, including vesting smart contracts
- account states
  - unclaimed (address hashes are blinded so there's no way to explore them)
  - simple (no delegation, no registration as baker)
  - active delegate
  - inactive delegate
  - delegated
  - not delegated

### Examples

```
### Basic Account
https://api.tzstats.com/explorer/account/tz1QKC2cuerZE5kGCtkcobUw2ZpfQwtekn6p

### Delegator Account
https://api.tzstats.com/explorer/account/KT1SAX5vr9RBtpETgmpdFdgR4kq3iB9w1saT

### Baker Account
https://api.tzstats.com/explorer/account/tz1VmiY38m3y95HqQLjMwqnMS7sdMfGomzKi

### Smart Contract
https://api.tzstats.com/explorer/account/KT1SAX5vr9RBtpETgmpdFdgR4kq3iB9w1saT
```

### Account Tags

**Name tags** to display as visual markers in the account header/title

- **[Basic]** for regular accounts
- **[Baker]** for active or inactive registered delegates
- **[Smart Contract]** contract with code (only for KT1)

**State tags** to display as visual markers in the account header/title

- **[Fundraiser]** for activated fundraiser accounts
- **[Revealed]** when pubkey is publicly announced
- **[Delegated]** when the account (or contract) is delegating
- **[Inactive]** for inactive delegates (as warning to delegators) (only for bakers)
- **[Overdelegated]** for overdelegated delegates (as warning to delegators) (only for bakers)
- **[Vesting]** for vesting contracts (only for KT1)
- **[Spendable]** account can spend funds (only for KT1) [deprecated in v5]
- **[Delegatable]** account can delegate (only for KT1) [deprecated in v5]

### Baker Lifecycle

```
- basic account (funded)
> register
- delegate account (funded, active, no rights, no delegations)
> delegate
- delegate account (funded, active, no rights, delegations)
> cycle end + rights distribution
- baker account (funded, active, rights, delegations)
> baking/endorsement activity
- baker account (funded, active, rights, delegations, pending rewards)
> inactivity
- baker account (funded, inactive, no rights, delegations, no pending rewards)
```

### General Account Metadata

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
| 1  | Address                | string   | tz1TmJGQoK1H3ArPtKu4dVzEMJRungBs29Fo | `tz1TmJG...29Fo` |
| 2  | Name                   | string   | Flippin Tacos | Flippin Tacos |
| 3  | First Seen             | int64    | 1      | 1 |
| 4  | Last Seen              | int64    | 326947 | 326,947 |
| 5  | Spendable Balance      | float64  | 16000.1037 | 16,000.10ꜩ |
| 6  | Num Tx                 | int64    | 0       | 0 Transactions |
| 7  | Is Activated           | boolean  | true    | tag `Activated` |
| 8  | Wealth Rank            | int64    | 5       | Top 5 |

Note: Wealth rank is limited to top 1..500, thereafter use 500+

### Basic/Unclaimed Account Card Datafields

An inactive account belonging to a fundraiser investor with unspendable/unclaimed funds. It's unclear if this type is relevant for us to display and search because such accounts are obfuscated.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
|    | **all general fields** ||||
| 9  | Unclaimed Balance      | float64  | 12000   | 12,000ꜩ    |

#### Example

```json
{
    "account": "btz1LKmBsCgNKpkWq3hBBqrPPyEmE1XegouD8",
    "account_type": "blinded",
    "first_seen": 1,
    "is_activated": false,
    "is_revealed": false,
    "is_spendable": false,
    "last_seen": 1,
    "unclaimed_balance": 12000
}
```

### Basic/Simple Account Card Datafields

A basic account that has never been registered as delegate.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
|    | **all general fields** ||||
| 9  | First In               | int64    |||
| 10 | First Out              | int64    |||
| 11 | First Seen             | int64    |||
| 12 | Last In                | int64    |||
| 13 | Last Out               | int64    |||
| 14 | Last Seen              | int64    |||
| 15 | Total Received         | float64  |||
| 16 | Total Sent             | float64  |||
| 17 | Total Burned           | float64  |||
| 18 | Total Fees Payed       | float64  |||
| 19 | Is Revealed            | boolean  | true | tag `Revealed` |
| 20 | Pubkey                 | string   | edpkufHry7MA8oeZs9qEdkRjAzQWSjf8MY3Gpg8o8n9q39n5irLZsD | `edpkufHr...LZsD` |
| 21 | Num Ops                | int64    |||
| 22 | Num Ops Failed         | int64    |||
| 23 | Num Tx                 | int64    |||
| 24 | Num Origination        | int64    |||

- balance
- address
- lifetime totals: #transactions, #originations, tz fees payed, tz received, tz sent, tz burned
- first & last active time/block
- balance history graph
- tx history table (when/age/block, sender/receiver, amount, fee, block, op)
- list of originated and managed KT1 accounts, if any (address, age, balance, delegate)


#### Example

```json
{
    "account": "tz1TmJGQoK1H3ArPtKu4dVzEMJRungBs29Fo",
    "account_type": "ed25519",
    "first_in": 0,
    "first_out": 0,
    "first_seen": 1,
    "is_activated": true,
    "is_funded": true,
    "is_revealed": false,
    "is_spendable": true,
    "last_in": 0,
    "last_out": 0,
    "last_seen": 1,
    "n_ops": 0,
    "n_origination": 0,
    "n_tx": 0,
    "pubkey": "",
    "spendable_balance": 16000.1037,
    "total_burned": 0,
    "total_received": 0,
    "total_sent": 0,
}
```

### Basic/Delegate Account Card Datafields

**Delegate**: A newly registered delegate without any prior incoming delegations or with staking balance less than a roll so no rights have ever been assigned.

Accounts who have just registered as delegate (delegate address == own address), but have never received any rights or acted as baker do not have to display all fields. For the purpose of our explorer we will assign baker status only to those accounts who have been allocated some rights in the past or for the future.

Note that even though such an account may not have rights to participate as baker in consensus, the account may have enough own or delegated funds to own a roll for voting!

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
|    | **all basic/simple fields** ||||
| 24 | Delegated Balance      | float64  |||
| 25 | Total Delegations      | int64    |||
| 26 | Active Delegations     | int64    |||
| 27 | Is Delegate            | boolean  | true | tag `Delegate` |
| 28 | Is Active Delegate     | boolean  | true | tag `Active Delegate` |
| 29 | Num Proposals          | int64    |||
| 30 | Num Ballots            | int64    |||

- current cycle rolls
- real-time rolls relevant for future cycle
- delegation balance history graph
- delegation count history graph
- rolls history graph
- voting history list (election name, proposal name, past number of rolls)

#### Example

```json
{
    "account": "tz1WQj4nzKBgRUpTTxoSr7mddwH7DP3afYx7",
    "account_type": "ed25519",
    "active_delegations": 0,
    "delegate": "tz1WQj4nzKBgRUpTTxoSr7mddwH7DP3afYx7",
    "delegated_balance": 0,
    "first_in": 1139,
    "first_out": 4122,
    "first_seen": 1,
    "is_activated": true,
    "is_active_delegate": false,
    "is_delegate": true,
    "is_funded": true,
    "is_revealed": true,
    "is_spendable": true,
    "last_in": 326947,
    "last_out": 150354,
    "last_seen": 326947,
    "n_ballot": 0,
    "n_ops": 18,
    "n_origination": 1,
    "n_proposal": 0,
    "n_tx": 16,
    "pubkey": "edpkufHry7MA8oeZs9qEdkRjAzQWSjf8MY3Gpg8o8n9q39n5irLZsD",
    "spendable_balance": 2999.900747,
    "total_burned": 0.257,
    "total_delegations": 1,
    "total_fees_payed": 0,
    "total_received": 16697.187747,
    "total_sent": 19697.03,
}
```

### Basic/Baker Account Card Datafields

**Baker**: An active delegate that has rights for baking/endorsing in the current or a future cycle. The baker may have been deactivated which means he will receive no more future rights even though some future rights may already have been given.

**Inactive Baker**: A deactivated delegate/baker who has no more rights in the current cycle or any future cycle.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
|    | **all basic/delegate fields** ||||
| 31 | Total Rewards Earned   | float64  |||
| 32 | Total Fees Earned      | float64  |||
| 33 | Total Lost             | float64  |||
| 34 | Frozen Deposits        | float64  |||
| 35 | Frozen Rewards         | float64  |||
| 36 | Frozen Fees            | float64  |||
| 37 | Blocks Baked           | int64    |||
| 38 | Blocks Missed          | int64    |||
| 39 | Blocks Stolen          | int64    |||
| 40 | Blocks Endorsed        | int64    |||
| 41 | Slots Endorsed         | int64    |||
| 42 | Slots Missed           | int64    |||


- total balance (a.k.a staking bond)
- pending rewards
- staking balance
- staking capacity
- delegated balance
- available capacity
- baker efficiency (rights vs stolen/missed blocks/endorsements + lost rewards) in coin units last 5 cycles
- baker luck (actual randomized rights vs ideal rights by rolls) in coin units last 5 and next 5 cycles
- baker fee in percent (for public services only)
- lifetime totals
- active delegations
- next baking block
- next endorsement block
- voting history list (election name, proposal name, past number of rolls)
- payout accuracy last 7 cycles
- current cycle rolls
- current cycle rights at priority 0 (baking/endorse) and priority 1 (baking/endorse)
- current cycle bake/endorse/steal/miss history
- delegate rank by balance (Top 1..100, then 100+)
- delegate rank by delegations (Top 1..100, then 100+)
- real-time rolls relevant for future cycle
- delegation balance history graph
- delegation count history graph
- rolls history graph
- voting history list (election name, proposal name, past number of rolls)


#### Example

```json
{
    "account": "tz3RDC3Jdn4j15J7bBHZd29EUee9gVB1CxD9",
    "account_type": "p256",
    "active_delegations": 6,
    "blocks_baked": 25127,
    "blocks_endorsed": 371014,
    "blocks_missed": 517,
    "blocks_stolen": 745,
    "delegate": "tz3RDC3Jdn4j15J7bBHZd29EUee9gVB1CxD9",
    "delegated_balance": 15908943.391749,
    "first_in": 30,
    "first_out": 4097,
    "first_seen": 1,
    "frozen_deposits": 2323264,
    "frozen_fees": 9.236845,
    "frozen_rewards": 71653.374976,
    "is_activated": true,
    "is_active_delegate": true,
    "is_contract": false,
    "is_delegatable": false,
    "is_delegate": true,
    "is_delegated": false,
    "is_funded": true,
    "is_revealed": true,
    "is_spendable": true,
    "is_vesting": false,
    "last_in": 499577,
    "last_out": 499577,
    "last_seen": 499577,
    "manager": "",
    "manager_id": 0,
    "n_ballot": 2,
    "n_delegation": 0,
    "n_ops": 372165,
    "n_ops_failed": 0,
    "n_origination": 0,
    "n_proposal": 0,
    "n_tx": 21,
    "pubkey": "p2pk67wVncLFS1DQDm2gVR45sYCzQSXTtqn3bviNYXVCq6WRoqtxHXL",
    "row_id": 1,
    "slots_endorsed": 733347,
    "slots_missed": 57584,
    "spendable_balance": 2478974.556842,
    "token_gen_max": 1580,
    "token_gen_min": 1,
    "total_burned": 0,
    "total_delegations": 8,
    "total_fees_earned": 139.152167,
    "total_fees_payed": 0,
    "total_lost": 0,
    "total_received": 3199043.673895,
    "total_rewards_earned": 1674718.3426,
    "total_sent": 0,
    "unclaimed_balance": 0
}
```

### Basic Contract (without code) Account Card Datafields

KT1 are typically smart contracts in Tezos, but they are allowed to have no code. Such contracts are used to delegate staking rights to bakers. Anybody who likes to delegate but not run it's own baker must use this account type.

The main difference from basic/simple accounts is that contracts cannot originate (create new contracts), but delegate. So instead of `Num originations` there is a field `Num delegations`.

Some KT1 contracts are not (yet) or no longer delegated or cannot be delegated (then flag `is_delegatable` is false). Such contracts are similar to basic/simple accounts, but if they are delegatable we can display a hint on how to do it. It really doesn't make any sense to have a KT1 without code that is not delegatable, but people could still do this with current Tezos design.

Every KT1 contract also has a manager which is always a tz1/tz2/tz3 basic account. The manager controls the contract, can spend funds (if `is_spendable` flag is true) and change delegate (if `is_delegatable` flag is true). Changing delegate means the KT1 can switch to a new delegate or just withdraw from its current delegate in which case it no longer delegates.

KT1 can be in two states, *Not-Delegated* or *Delegated*.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
|    | **all general fields** ||||
| 9  | First In               | int64    |||
| 10 | First Out              | int64    |||
| 11 | First Seen             | int64    |||
| 12 | Last In                | int64    |||
| 13 | Last Out               | int64    |||
| 14 | Last Seen              | int64    |||
| 15 | Total Received         | float64  |||
| 16 | Total Sent             | float64  |||
| 17 | Total Burned           | float64  |||
| 18 | Total Fees Payed       | float64  |||
| 19 | Is Revealed            | boolean  |||
| 20 | Pubkey                 | string   |||
| 21 | Num Ops                | int64    |||
| 22 | Num Ops Failed         | int64    |||
| 23 | Num Tx                 | int64    |||
| 24 | Num Delegation         | int64    |||
| 25 | Manager                | string   |||
| 26 | Delegate/Baker         | string   |||
| 27 | Is Vesting             | boolean  | true | tag `Vesting` |
| 28 | Is Delegatable         | boolean  | true | tag `Delegatable` |
| 29 | Is Delegated           | boolean  | true | tag `Delegated` |
| 30 | Is Spendable           | boolean  | true | tag `Spendable` |
| 31 | Is Contract            | boolean  | true | tag `Contract` |

- display manager account as card
- display baker account as card when state is `Delegated`
- display delegation hint when delegatable and state is `Not delegated`
- lifetime total income from delegation (may be difficult to measure)
- 30d staking income graph with 1 data point per cycle and 30d sum
- current baker fee (needs lookup table)
- next payout time + amount (complex formula, we'll see if we support this)
- tx history table (when/age/block, sender/receiver, amount, fee, block, op)
- balance history flow graph (in/out) with overlay event marks when delegate changed
- show delegation history table if previous delegation(s) exist: when (block, cycle, time), how much (balance), where (baker), op


#### Example

```json
{
    "account": "KT1Ctq1S544wcjXq4uipMFbofJp7ASPC9edL",
    "account_type": "contract",
    "delegate": "",
    "first_in": 1461,
    "first_out": 1481,
    "first_seen": 1455,
    "is_contract": false,
    "is_delegatable": false,
    "is_delegated": false,
    "is_funded": true,
    "is_revealed": true,
    "is_spendable": false,
    "is_vesting": false,
    "last_in": 496169,
    "last_out": 468696,
    "last_seen": 496169,
    "manager": "tz1eTQUfTprQTvduwkcroTj2e2GNuWwDTk1j",
    "n_delegation": 3,
    "n_ops": 119,
    "n_ops_failed": 1,
    "n_tx": 115,
    "pubkey": "edpkvJWCZCn7YxGKJmW6qAkvRTkWYLMgoxzYpqirKy7E67WhzCRWXQ",
    "spendable_balance": 23.872986,
    "total_burned": 0,
    "total_fees_earned": 0,
    "total_fees_payed": 0,
    "total_received": 11422.110646,
    "total_sent": 11398.23624,
}
```

### Smart Contract with Code

Smart contracts are used to execute custom code and store custom state in Tezos. Smart contracts may or may not have a balance. Calls are made through transactions with attached parameters which may alter the state.

Smart contracts can also issue `internal` transactions to send funds or call other contracts. The original caller account pays fees for regular and internal transactions.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
|    | **all basic contract fields** ||||
| 32 | Code                   | JSON     | ... | ... |
| 33 | Storage                | JSON     | ... | ... |


- manager account card
- creation date
- lifetime #ops, total gas paid, total fees paid, storage paid
- storage size
- storage content
- code
- list of ops
- graph gas paid
- graph fees paid


### Vesting Contract Account Card Datafields

A vesting contract is a special type of smart contract with code created in the Genesis block and owned by the Tezos foundation that restricts spending by a vesting schedule (every month 1/24th of the balance becomes spendable with a total vesting time of 2 years).

Vesting contracts have an unclaimed balance.

There is only a total of 32 such accounts and all of them delegate to one of the 8 foundation bakers.

| #  | Name                   | Type     | Example | Display as |
|----|------------------------|----------|---------|------------|
|    | **all smart contract fields** ||||
| 34 | Unclaimed balance      | float64  |||

- same graphs as regular delegated contract
- unclaimed/vested balance graph

#### Example

```json
{
    "account": "KT1QuofAgnsWffHzLA7D78rxytJruGHDe7XG",
    "account_type": "contract",
    "delegate": "tz3RDC3Jdn4j15J7bBHZd29EUee9gVB1CxD9",
    "first_in": 30,
    "first_out": 30,
    "first_seen": 1,
    "is_contract": true,
    "is_delegatable": false,
    "is_delegated": true,
    "is_funded": false,
    "is_revealed": false,
    "is_spendable": true,
    "is_vesting": true,
    "last_in": 30,
    "last_out": 30,
    "last_seen": 30,
    "manager": "",
    "manager_id": 0,
    "n_delegation": 0,
    "n_ops": 3,
    "n_ops_failed": 0,
    "n_tx": 3,
    "pubkey": "",
    "spendable_balance": 0,
    "total_burned": 0,
    "total_delegations": 0,
    "total_fees_payed": 0,
    "total_received": 0,
    "total_sent": 199041.301565,
    "unclaimed_balance": 9354941.173593
}
```

