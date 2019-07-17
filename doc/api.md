## API Endpoints

```
GET /ping                        // server time and path latency measurement
GET /explorer/chain              // blockchain head info
GET /explorer/status             // blockchain crawler status

GET /explorer/config             // chain configuration
GET /explorer/config/head        // chain configuration at head block
GET /explorer/config/{height}    // chain configuration at selected height

GET /explorer/account/{hash}          // account details
GET /explorer/account/{hash}/op       // account with embedded ops (`n` limit, `o` offset)
GET /explorer/account/{hash}/managed  // account with embedded managed contracts (`n` limit, `o` offset)

GET /explorer/contract/{hash}       // contract details
GET /explorer/contract/{hash}/op    // contract with embedded ops (`n` limit, `o` offset)

GET /explorer/block/head            // block details
GET /explorer/block/{height}
GET /explorer/block/{hash}
GET /explorer/block/*/op            // block with embedded ops

GET /explorer/op/{hash}             // operation

GET /explorer/tables/account        // current state of all accounts including smart contracts
GET /explorer/tables/contract       // smart contracts state at creation incl code & storage
GET /explorer/tables/block          // all blocks
GET /explorer/tables/op             // all operations
GET /explorer/tables/flow           // all balance, freezer and delegation flows
GET /explorer/tables/rights         // all baking and endorsing rights at each block (history only)
GET /explorer/tables/snapshot       // balance snapshots for all active delegates and their delegators at every snapshot block
GET /explorer/tables/supply         // running supply totals at each block
GET /explorer/tables/chain          // running blockchain totals at each block
```
