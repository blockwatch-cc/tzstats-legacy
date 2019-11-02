### Transaction (regular transaction, not smart contract)

https://api.tzstats.com/explorer/op/oouocXPE3gVArp3DcquSTeFHexAvXf3JhnWmoQBMTa2a9GXcsWa

Relevant fields
```
"block": "BMZsJZdBeJ2FwhqRhMpCkS9d9rU1d7GDkt7wYwBk4DJwn3Ck7gr",
"burned": 0,
"counter": 1506239,
"cycle": 132,
"days_destroyed": 6738.766842,
"fee": 0.00161,
"gas_limit": 10300,
"gas_price": 0.15784,
"gas_used": 10200,
"hash": "oouocXPE3gVArp3DcquSTeFHexAvXf3JhnWmoQBMTa2a9GXcsWa",
"height": 543663,
"is_success": true,
"op_n": 24,
"receiver": "tz1NhL3Xy5R1TnjpcG4gEdviFRVpDNdcjGPD",
"sender": "tz1McSBdMYdqS6ELbH7X9n2gLotCshiUbgiL",
"time": "2019-07-30T18:15:35Z",
"type": "transaction",
"volume": 3590.020071
```

Notes
- a transaction burns coins when receiver is a new account
- days destroyed = volume * token age
- can fail when gas limit is too low or sender has insufficient funds to cover fees+volume
- counter is similar to nonce in Ethereum

### Delegation

https://api.tzstats.com/explorer/op/op1i2QpU5RiCJobmYAGDutkMkQqk8PEguPMhDursTKmSF8WxikE

Relevant fields
```
"block": "BKoLWqkgMN8FJCBmbkkWqSfEJkcDZenSmDzzRWmXSaNDeRKyuzz",
"counter": 7,
"cycle": 132,
"fee": 0.001257,
"gas_limit": 10000,
"gas_price": 0.1257,
"gas_used": 10000,
"hash": "op1i2QpU5RiCJobmYAGDutkMkQqk8PEguPMhDursTKmSF8WxikE",
"height": 543660,
"is_success": true,
"op_n": 24,
"receiver": "tz1iDu3tHhf7H4jyXk6rGV4FNUsMqQmRkwLp",
"sender": "KT1DEDKqWYr5FEf85k6BG7pyy6jLvDGYet9S",
"time": "2019-07-30T18:12:35Z",
"type": "delegation",
```

Notes:
- delegated amount is sender's balance at time of delegation (we don't know this balance for sure and it's to expensive to reconstruct here, so we don't display it for now; I could calculate it in the backend and add it as volume to the operation though - maybe I'll do)
- can fail when gas limit is too low or sender has insufficient funds to cover fees


### Origination

https://api.tzstats.com/explorer/op/opD4PQzETy9FVXijxJEWq2a1b9MCEmfGrheHwLjTfaDa9Dfbh9C

Relevant fields
```
"block": "BLSikqb69AZwgWabdMNEX1yTDsb9yLpHXnnynkwJyGUDHqdJwkY",
"burned": 0.257,
"counter": 80573,
"cycle": 132,
"data": "tz1Rucj9xVgZVBTmtatYhZB4bzCr8HMmXzYP,tz1gnsrkY7JECqCbwdu6WtYWdi329MxFVqpQ",
"days_destroyed": 8510.416667,
"fee": 0.00142,
"gas_limit": 10600,
"gas_price": 0.142,
"gas_used": 10000,
"has_data": true,
"hash": "opD4PQzETy9FVXijxJEWq2a1b9MCEmfGrheHwLjTfaDa9Dfbh9C",
"height": 543604,
"is_success": true,
"op_c": 0,
"op_n": 23,
"receiver": "KT1DGnkjBN3WnvrrgY4z9WssFqBeAfcRQH6w",
"sender": "tz1Rucj9xVgZVBTmtatYhZB4bzCr8HMmXzYP",
"storage_limit": 277,
"storage_paid": 0,
"storage_size": 0,
"time": "2019-07-30T17:16:30Z",
"type": "origination",
"volume": 3000
```

Example above:
- creates a new account and burns 0.257tz
- data format: "<manager>,<delegate>" (may only contain manager when not delegated)
- volume > 0: also transfers funds into the new contract

Notes:
- an origination (strange name) create a new contract (KT1 address) with or without code
- often originations come as multi-operation together with a reveal operation (e.g. https://api.tzstats.com/op//onjRFntxBQNAV3dzrBfz1U6r7VGyox6v3yu1y82nvLmxxqcbaZY); that's why our /explorer/op endpoint returns an array of ops
- an origination can also delegate and transfer funds in one step, both apply to the new contract
- manager: a contract account always has a manager account (who is allowed to control funds and delegation), this manager can be the source of this operation, but it can also be a different account
- can fail when gas limit is too low or sender has insufficient funds to cover fees+burn+volume


### Activation

https://api.tzstats.com/explorer/op/onnto1AVR5oLCike3mx67WnM733ECa7h8ZVgwFUoqELQzVvx8nr

Relevant fields
```
"block": "BMd8kgWRCN5ULo8FzSRfiwKVKVnqQVPpygLw7KB7YUAUXXpCGxk",
"cycle": 0,
"data": "9ddc41d40baae30ea91293a9a5989439c43e7029",
"has_data": true,
"hash": "onnto1AVR5oLCike3mx67WnM733ECa7h8ZVgwFUoqELQzVvx8nr",
"height": 493,
"is_success": true,
"op_c": 0,
"op_n": 8,
"receiver": "tz1Qr1s2Jf9qeTAN7UpyfDi8vEUWofcTEh6V",
"time": "2018-07-01T01:55:42Z",
"type": "activate_account",
"volume": 7055.8375
```

Notes:
- has only a receiver
- data is the hex encoded secret used to unlock the funds
- is always successful

### Endorsement


https://api.tzstats.com/explorer/op/onppLQXf4yxfp9McwHDp79kpNsVHtmhMTm9T9ASp3J6wSgf7zw3

```
"block": "BLSvXiKvXighWsg9RDtRZ26UpY7iT2KndxVM1GPVAiJhVSM6UdS",
"cycle": 132,
"data": "2147483648",
"deposit": 64,
"has_data": true,
"hash": "onppLQXf4yxfp9McwHDp79kpNsVHtmhMTm9T9ASp3J6wSgf7zw3",
"height": 543688,
"is_success": true,
"op_n": 15,
"receiver": "tz1KfEsrtDaA1sX7vdM4qmEPWuSytuqCDp5j",
"reward": 2,
"sender": "tz1KfEsrtDaA1sX7vdM4qmEPWuSytuqCDp5j",
"time": "2019-07-30T18:43:10Z",
"type": "endorsement",
```

Notes:
- data is endorsement slot bitmask as uint32 string
- sender == receiver
- is always successful

### Proposal

https://api.tzstats.com/explorer/op/ooVguVHxgePPnTHv6esWcbs1PaH9Ri9jejmd7AXqzRr7nwxtZ4S

Relevant fields
```
"block": "BML2KScLVXMGKwZ7R8UQR5azCq9xce56oHU15stZbE74whdrWyj",
"cycle": 132,
"data": "PsBABY5nk4JhdEv1N1pZbt6m6ccB9BfNqa23iKZcHBh23jmRS9f,",
"has_data": true,
"hash": "ooVguVHxgePPnTHv6esWcbs1PaH9Ri9jejmd7AXqzRr7nwxtZ4S",
"height": 543606,
"is_success": true,
"op_n": 26,
"sender": "tz1hAYfexyzPGG6RhZZMpDvAHifubsbb6kgn",
"time": "2019-07-30T17:18:30Z",
"type": "proposals",
```

Notes:
- does not cost fees or gas
- is always successful
- data is a list of submitted proposals

### Ballot

https://api.tzstats.com/explorer/op/ongC5aK2bcHTsV6HbRwPU6QmDXABHv2BpBXLv4yE6ZUX8VGPJBJ

Relevant fields
```
"block": "BL6cPUcjpuCjXugE8BocptXaQA6KJNNPEmfkWYZaTki5Vb59SSF",
"cycle": 107,
"data": "Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd,yay",
"has_data": true,
"hash": "ongC5aK2bcHTsV6HbRwPU6QmDXABHv2BpBXLv4yE6ZUX8VGPJBJ",
"height": 439125,
"is_success": true,
"op_n": 24,
"sender": "tz3adcvQaKXTCg12zbninqo3q8ptKKtDFTLv",
"time": "2019-05-15T23:44:13Z",
"type": "ballot",
```

Notes:
- does not cost fees or gas
- is always successful
- data: "<proposal>,<ballot>" - yay, nay, pass

### Reveal

https://api.tzstats.com/explorer/op/opUSLegyN3Vph7aiSZea6QZFHCaxcvV6LPxJee3HBhg6aDKcQYf

Relevant fields
```
"block": "BLr6pKFuuSGW9FST72wQH69vutrcU3DSpwdKTC45VbE39kFQzFs",
"counter": 1722809,
"cycle": 132,
"data": "edpkuxFdwJbfMscVN3tkVUWb1yKvoDyvW1ZYni6C3Lh5CUccZ9bgUc",
"fee": 0,
"gas_limit": 10100,
"gas_price": 0,
"gas_used": 10000,
"has_data": true,
"hash": "opUSLegyN3Vph7aiSZea6QZFHCaxcvV6LPxJee3HBhg6aDKcQYf",
"height": 543691,
"is_success": true,
"op_c": 0,
"op_n": 25,
"sender": "tz1VCxyLFTbeMroAXBckZieBwz1tAvM83qhx",
"time": "2019-07-30T18:46:10Z",
"type": "reveal",
```

Notes:
- has only sender
- data: "<pubkey>"
- can fail when gas limit is too low or sender has insufficient funds to cover fees
- may be part of a multi-op (reveal + origination) (e.g. https://api.tzstats.com/op/onjRFntxBQNAV3dzrBfz1U6r7VGyox6v3yu1y82nvLmxxqcbaZY)

### Seed Nonce Revelation

https://api.tzstats.com/explorer/op/onqX1CxuxZmJnrYyBCf6hCmsofUF2YQdZmzwrs7JbufX9YuR9jw

Relevant fields
```
"block": "BMensPrcSuhiTRe3GvhUEYXTPFWGdDgpXC9HvB75S4qhNyL3UVn",
"cycle": 132,
"data": "96c24ebc54338feca0871ea0bd582b79290fb7ccfd5604187ec91b8c5e404168",
"has_data": true,
"hash": "onqX1CxuxZmJnrYyBCf6hCmsofUF2YQdZmzwrs7JbufX9YuR9jw",
"height": 540676,
"is_success": true,
"op_c": 0,
"op_n": 29,
"reward": 0.125,
"sender": "tz1P2Po7YM526ughEsRbY4oR9zaUPDZjxFrb",
"time": "2019-07-28T15:20:36Z",
"type": "seed_nonce_revelation",
```

Notes:
- is always successful
- does not cost fees or gas
- has a reward for the sender (a baker)
- has a sender only
- data: hex encoded nonce (used for seeding the network-wide random number generator)

### Double Baking Evidence

https://api.tzstats.com/explorer/op/oozeQnDq8K1WSp2khUz22SSBwUqMkYsvAfvJqm8tWGGFAmdGAiv

Relevant fields
```
ock": "BLUodew5BLhdxRzNV1hMgMoTzhN4RRuYy7wtxrdedfzPigCTNYr",
"burned": 610,
"cycle": 127,
"data": [
    {
        "context": "CoUwFTznWfDib1S3izLaYLXGw6uwdohxn73rr3df6E1M3jCsWZ6P",
        "fitness": [
            "00",
            "0000000000f9b1fc"
        ],
        "level": 520340,
        "operations_hash": "LLoZj3GKoVHiSh7KmFLp82yFE3WXng6fQBhzyKGGKm4TAsB4zt5cq",
        "predecessor": "BKwabJ4MqfvtipnarJj38oU9rVVCFQznGpMnxeDXbdmLWojTbCv",
        "priority": 0,
        "proof_of_work_nonce": "000000039b28872e",
        "proto": 4,
        "seed_nonce_hash": "",
        "signature": "sigQrG3yUtRPUW8eX6jwwu1L8TKMKwvwPxqseSPNQNj8Mq34B8Kz5R6839nb8S9ULNmbfTC7bJt4RDxGwJo8YX7En6YUWoug",
        "timestamp": "2019-07-13T19:40:43Z",
        "validation_pass": 4
    },
    {
        "context": "CoUwFTznWfDib1S3izLaYLXGw6uwdohxn73rr3df6E1M3jCsWZ6P",
        "fitness": [
            "00",
            "0000000000f9b1fc"
        ],
        "level": 520340,
        "operations_hash": "LLoaK6uF3G6t2f1GVk6L6tAxvPL1o2uaCUy7cBHzEK54DqWyCZjfp",
        "predecessor": "BKwabJ4MqfvtipnarJj38oU9rVVCFQznGpMnxeDXbdmLWojTbCv",
        "priority": 0,
        "proof_of_work_nonce": "00000003bddc459e",
        "proto": 4,
        "seed_nonce_hash": "",
        "signature": "sighEdJutCf7xgNCNtMUVr4v3xP4LcLque7xmivFZi65M3wH4C3zeeWqctSx6jnzogu1uQwhdV3MGP2MnupaAQ2GG3N2FN6H",
        "timestamp": "2019-07-13T19:40:43Z",
        "validation_pass": 4
    }
],
"has_data": true,
"hash": "oozeQnDq8K1WSp2khUz22SSBwUqMkYsvAfvJqm8tWGGFAmdGAiv",
"height": 520646,
"is_success": true,
"op_c": 0,
"op_n": 21,
"receiver": "tz1TzaNn7wSQSP5gYPXCnNzBCpyMiidCq1PX",
"reward": 0,
"sender": "tz1LLNkQK4UQV6QcFShiXJ2vT2ELw449MzAA",
"time": "2019-07-14T01:09:29Z",
"type": "double_baking_evidence",
"volume": 0
```

Notes:
- is always successful
- does not cost fees or gas
- data is two block headers found to be double baked
- sender is the accuser (who gets a reward), bug: reward not counted yet (will be field rewards)
- receiver is the offender (who gets slashed), bug: amount not counted yet (will be field volume)
- burned: half the of the slashed funds are burned


### Double Endorsement Evidence

https://api.tzstats.com/explorer/op/ootpxSaVxNnirHzMCZ5kajx8VsZpnxEnmNPxbhjRCdBU59VuBSq

Relevant fields
```
ock": "BLUodew5BLhdxRzNV1hMgMoTzhN4RRuYy7wtxrdedfzPigCTNYr",
"burned": 238,
"cycle": 135,
"data": [
    {
        "branch": "BLyQHMFeNzZEKHmKgfD9imcowLm8hc4aUo16QtYZcS5yvx7RFqQ",
        "operations": {
            "kind": "endorsement",
            "level": 554811
        },
        "signature": "sigqgQgW5qQCsuHP5HhMhAYR2HjcChUE7zAczsyCdF681rfZXpxnXFHu3E6ycmz4pQahjvu3VLfa7FMCxZXmiMiuZFQS4MHy"
    },
    "op2": {
        "branch": "BLTfU3iAfPFMuHTmC1F122AHqdhqnFTfkxBmzYCWtCkBMpYNjxw",
        "operations": {
            "kind": "endorsement",
            "level": 554811
        },
        "signature": "sigPwkrKhsDdEidvvUgEEtsaVhyiGmzhCYqCJGKqbYMtH8KxkrFds2HmpDCpRxSTnehKoSC8XKCs9eej6PEzcZoy6fqRAPEZ"
    }
],
"has_data": true,
"hash": "ootpxSaVxNnirHzMCZ5kajx8VsZpnxEnmNPxbhjRCdBU59VuBSq",
"height": 555852,
"is_success": true,
"op_c": 0,
"op_n": 29,
"receiver": "tz1PeZx7FXy7QRuMREGXGxeipb24RsMMzUNe",
"reward": 224,
"sender": "tz2TSvNTh2epDMhZHrw73nV9piBX7kLZ9K9m",
"time": "2019-07-14T01:09:29Z",
"type": "double_baking_evidence",
"volume": 462
```

Notes:
- is always successful
- does not cost fees or gas
- data consists of two operations found to be in violation (same endorsement for different branches, i.e. fork blocks)
- sender is the accuser (who gets the reward)
- receiver is the offender (who gets slashed)
- burned: about half the of the slashed funds are burned (not exactly but burned+rewards=slashed)
- volume: slashed amount


### Transaction (smart contract call)

https://api.tzstats.com/explorer/op/oo6wsu78JrozJxPWW9QrP6ZDKgyhufDSJwBt2jdtKR964VvmMmG

Relevant fields

```
"block": "BM4o7x6rXz9pfptYujFYy5a2kCrD2ASvoMv2LZJz8ywjXnoxzNj",
"burned": 0,
"counter": 62451,
"cycle": 46,
"days_destroyed": 0,
"fee": 0,
"gas_limit": 170360,
"gas_price": 0,
"gas_used": 170153,
"has_data": true,
"hash": "oo6wsu78JrozJxPWW9QrP6ZDKgyhufDSJwBt2jdtKR964VvmMmG",
"height": 189764,
"is_contract": true,
"is_internal": false,
"is_success": true,
"op_c": 0,
"op_n": 20,
"parameters": {..}
"receiver": "KT1BvVxWM6cjFuJNet4R9m64VDCN2iMvjuGE",
"sender": "tz1LBEKXaxQbd5Gtzbc1ATCwc3pppu81aWGc",
"storage": {...}
"storage_limit": 0,
"storage_paid": 0,
"storage_size": 8382,
"time": "2018-11-15T10:53:59Z",
"type": "transaction",
"volume": 0
```

Notes
- may fail when gas_limit is too low or sender funds are insufficient or contract code execution fails
- does not have `data` field, instead uses `parameters` as IN params and `storage` as out param (= full contract storage after update)
- may or may not send funds
- may or may not trigger an internal transaction like in the full example below

Full Example

https://api.tzstats.com/explorer/op/oo6wsu78JrozJxPWW9QrP6ZDKgyhufDSJwBt2jdtKR964VvmMmG

```
[{
    "block": "BM4o7x6rXz9pfptYujFYy5a2kCrD2ASvoMv2LZJz8ywjXnoxzNj",
    "burned": 0,
    "counter": 62451,
    "cycle": 46,
    "data": "",
    "days_destroyed": 0,
    "deposit": 0,
    "fee": 0,
    "gas_limit": 170360,
    "gas_price": 0,
    "gas_used": 170153,
    "has_data": true,
    "hash": "oo6wsu78JrozJxPWW9QrP6ZDKgyhufDSJwBt2jdtKR964VvmMmG",
    "height": 189764,
    "is_contract": true,
    "is_internal": false,
    "is_success": true,
    "op_c": 0,
    "op_n": 20,
    "parameters": {
        "args": [
            {
                "args": [
                    {
                        "args": [
                            {
                                "int": "4039200000"
                            }
                        ],
                        "prim": "Left"
                    }
                ],
                "prim": "Right"
            }
        ],
        "prim": "Right"
    },
    "receiver": "KT1BvVxWM6cjFuJNet4R9m64VDCN2iMvjuGE",
    "reward": 0,
    "sender": "tz1LBEKXaxQbd5Gtzbc1ATCwc3pppu81aWGc",
    "storage": {
        "args": [
            [
                {
                    "args": [
                        {
                            "bytes": "000005e36c09abe621f2aa03ce1add763de5c14527fc"
                        },
                        {
                            "int": "700000000"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0000098cac6e08349109426c28aad1d8128de7a852f3"
                        },
                        {
                            "int": "11220754689"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "00001e002677f6e62b5b051ef63043fad7402d01f2b8"
                        },
                        {
                            "int": "17646982791"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "000035b01d56689e47a511c82156295c1a3c8e5f4cc0"
                        },
                        {
                            "int": "9967227"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "00003bdd835e3acb1764f51398c56e61af2361a2765d"
                        },
                        {
                            "int": "20856441766"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "000046e91ac2e1e71b3970b26e38feb6ffcf84c93f43"
                        },
                        {
                            "int": "0"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "00006a6607e5312494e747351065bf5c76c2e3d0c13b"
                        },
                        {
                            "int": "995650005"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0000a60b36f8cecc6fbec22c72d93bb545ffc85cfc50"
                        },
                        {
                            "int": "14268243108"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0000b2f5ffcead61ba5dfb515026b116246a6013a367"
                        },
                        {
                            "int": "5581647542"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0000baac621373b82dbc4d17f0c52a09bfc8d3a4202f"
                        },
                        {
                            "int": "637902576"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0000be03989cb3668a5dd0c1fffa138914d83e9210d6"
                        },
                        {
                            "int": "8417961239"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0000bff25b3926946e19854492a20ffd69c18ba3fb6d"
                        },
                        {
                            "int": "17437358995"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0000cbc0f3fdd92a7fc13d74e8a88835b9f02bbaa6da"
                        },
                        {
                            "int": "2498000000"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0000ce4947ee91376ef90f17ed03d53b14076e714bbf"
                        },
                        {
                            "int": "3357222411"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0102640ec1aa379e1ca5df86354c6fea62ee65d9cb00"
                        },
                        {
                            "int": "0"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "011eb989c8b2abc0103fcd2a4e5e89f7227ad8857400"
                        },
                        {
                            "int": "79540178"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0127cdfb0a9737d1e97e9ac47b71406d0b6b8bd8a500"
                        },
                        {
                            "int": "1994972668"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "01407bb64d2c2f52fff72adbdd032a86ea008df53d00"
                        },
                        {
                            "int": "6694159084"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0147959ea84d564f0bd0bb57bd7302f5d8cf4e76f100"
                        },
                        {
                            "int": "2244700000"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "015b7e419a1d2d69afff1c960869569736d49a6a5800"
                        },
                        {
                            "int": "6671720394"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "0177005e66c97edb1f3959f7add1a7e88071915cd100"
                        },
                        {
                            "int": "50718547783"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "01872bec39bf4882a16037ded6976fa3b6ecaef7ac00"
                        },
                        {
                            "int": "50595633998"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "01ab062220312a77f03738c1b2aad1334276c7bfae00"
                        },
                        {
                            "int": "60414680184"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "01aecfb1075ad1e941200b9382fc7fa2931c2f0f8a00"
                        },
                        {
                            "int": "3977008911"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "01c18ac61624d9939ac987883cf532a5507491371400"
                        },
                        {
                            "int": "999286224"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "01c1f96c16013ad68563cdfeb33965a7946754ce8300"
                        },
                        {
                            "int": "497825002"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "01e932531e950b2975ccde431cbb6f4dac32040bc800"
                        },
                        {
                            "int": "8992531001"
                        }
                    ],
                    "prim": "Elt"
                },
                {
                    "args": [
                        {
                            "bytes": "01e933cd8133cc8fe50192f4024d0d91ee25a6d91100"
                        },
                        {
                            "int": "99496052"
                        }
                    ],
                    "prim": "Elt"
                }
            ],
            {
                "args": [
                    {
                        "string": "Tez-Baking Token"
                    },
                    {
                        "args": [
                            {
                                "string": "BAKER"
                            },
                            {
                                "args": [
                                    {
                                        "int": "6"
                                    },
                                    {
                                        "args": [
                                            {
                                                "int": "297608233828"
                                            },
                                            {
                                                "args": [
                                                    {
                                                        "int": "296159049153"
                                                    },
                                                    {
                                                        "args": [
                                                            {
                                                                "bytes": "000005e699e5ebd79a591998a1d8b3f293366cf00bbb"
                                                            },
                                                            {
                                                                "args": [
                                                                    {
                                                                        "int": "1005781"
                                                                    },
                                                                    {
                                                                        "int": "1005135"
                                                                    }
                                                                ],
                                                                "prim": "Pair"
                                                            }
                                                        ],
                                                        "prim": "Pair"
                                                    }
                                                ],
                                                "prim": "Pair"
                                            }
                                        ],
                                        "prim": "Pair"
                                    }
                                ],
                                "prim": "Pair"
                            }
                        ],
                        "prim": "Pair"
                    }
                ],
                "prim": "Pair"
            }
        ],
        "prim": "Pair"
    },
    "storage_limit": 0,
    "storage_paid": 0,
    "storage_size": 8382,
    "time": "2018-11-15T10:53:59Z",
    "type": "transaction",
    "volume": 0
},
{
    "block": "BM4o7x6rXz9pfptYujFYy5a2kCrD2ASvoMv2LZJz8ywjXnoxzNj",
    "burned": 0,
    "counter": 0,
    "cycle": 46,
    "data": "",
    "days_destroyed": 14.025,
    "deposit": 0,
    "fee": 0,
    "gas_limit": 0,
    "gas_price": 0,
    "gas_used": 107,
    "has_data": true,
    "hash": "oo6wsu78JrozJxPWW9QrP6ZDKgyhufDSJwBt2jdtKR964VvmMmG",
    "height": 189764,
    "is_contract": true,
    "is_internal": true,
    "is_success": true,
    "op_c": 0,
    "op_n": 20,
    "parameters": {
        "prim": "Unit"
    },
    "receiver": "tz1LBEKXaxQbd5Gtzbc1ATCwc3pppu81aWGc",
    "reward": 0,
    "sender": "KT1BvVxWM6cjFuJNet4R9m64VDCN2iMvjuGE",
    "storage_limit": 0,
    "storage_paid": 0,
    "storage_size": 0,
    "time": "2018-11-15T10:53:59Z",
    "type": "transaction",
    "volume": 4039.2
}]
```