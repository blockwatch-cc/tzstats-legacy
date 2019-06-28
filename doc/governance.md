## Tezos Governance Process

- https://medium.com/tezos/amending-tezos-b77949d97e1e
- https://blog.nomadic-labs.com/athens-proposals-injected.html

```
# List Proposals and supporting rolls
curl https://mainnet.tezrpc.me/chains/main/blocks/491518/votes/proposals

# List Delegate Rolls
curl https://mainnet.tezrpc.me/chains/main/blocks/491518/votes/listings

# Get current quorum (-> 8198 as integer = percentage with 2 digits)
curl https://mainnet.tezrpc.me/chains/main/blocks/493818/votes/current_quorum

```

- 4 periods:
  1. Proposal Period
  2. Exploration or “Testing” Vote Period
  3. Testing Period
  4. Promotion Vote Period
- 32,768 blocks or roughly 22 days, 18 hours per period
- sum: almost exactly three months from proposal to activation
- any failure to proceed to the subsequent period reverts the network back to a Proposal Period


#### Proposal Period

- Proposal Operation
  - **source** is the baker who submits the proposal operation
  - **period** specifies the specific proposal period in which the proposal was submitted
  - **proposals hash** is the hash of the tarball of concatenated .ml/.mli source files
- Bakers may submit up to 20 proposals in each Proposal Period
- When submitting a proposal, the baker is also submitting a **vote** for that proposal, equivalent to the number of **rolls** in its staking balance at the start of the period.
- other bakers can then vote on proposals by submitting proposal operations of their own, meaning each baker may vote once on up to 20 proposals
- At the end of the Proposal Period, the network counts the proposal votes and the most-upvoted proposal proceeds to the Exploration Vote Period. If no proposals have been submitted or if there is a tie between proposals, a new Proposal Period begins.

The proposer should upload a TAR archive for the proposal and uses `tezos-protocol-compiler` to generate the hash. Example: https://blog.nomadic-labs.com/athens-proposals-injected.html with hash Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd.


#### Exploration Vote Period

- ballot operation
  - **source** is the baker
  - **period_n** is the specific voting period in which the operation was submitted
  - **proposal** specifies the proposal
  - **ballot** specifies the baker’s vote, either **Yay**, **Nay** or **Pass**
- baker’s vote is based on the number of rolls in its staking balance at the beginning of the Exploration Vote Period
- Each baker may send a ballot operation only once during the voting period.
- At the end of eight cycles, if voting participation (the total of “Yays,” “Nays,” and “Passes”) meets the **quorum** (explained below) and an **80% supermajority of non-abstaining** bakers approves, the proposal proceeds to the Testing Period.
- quorum initially 80%, then Q_t+1 = 0.8 Q_t + 0.2 q_t (actual participation)

#### Testing Period

- test fork is generated, running parallel to the main Tezos chain for 48 hours before terminating
- testnet matching the amendment proposal is likely to run off-chain for the remaining \~7.3 cycles

#### Promotion Vote Period
- bakers submit their votes using the ballot operation,
- votes weighted proportionally to the number of rolls in their staking balance at the beginning of the Promotion Vote Period
- each baker may send only one ballot operation
- If the participation rate reaches the minimum quorum and an 80% supermajority of non-abstaining bakers votes “Yay,” then the proposal is activated as the new mainnet.
