import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRow, FlexColumn, Blockies } from '../Common';
import { backerAccounts } from '../../config/backer-accounts';
import { timeFormat } from 'd3-time-format';
import { getShortHash } from '../../utils';
import BlocksPie from './BlockInfoPie'

const BlockInfo = ({ block }) => {
  // const name = Object.keys(backerAccounts).filter(hash => backerAccounts[hash] === props.address);

  return (
    <Wrapper>
      <Card title="Block Info">

        <FlexColumn minHeight={200} justifyContent="space-between">
          <FlexRow justifyContent="space-between">
            <DataBox
              title={timeFormat('%a, %d %B %H')(new Date(block.time))}
              value={block.height}
            />
            <DataBox
              title="Cycle"
              value={block.cycle}
            />
          </FlexRow>
          <FlexRow mt={1}>
            {
              [...Array(32).keys()].map(() => {
                return <div style={{ height: "12px", margin: "2px", width: "11px", background: "#27b9f7", }} ></div>
              })
            }
          </FlexRow>
          <FlexRow justifyContent="space-between">
            <div style={{ fontSize: "14px" }}> {getShortHash(block.hash)}</div>
            <DataBox title="Slots Endorsed" />
            <Link>
              <div> <Blockies hash={block.baker} />
                {getShortHash(block.baker)}</div>

              <DataBox title="Baker" />
            </Link>

          </FlexRow>



          <FlexRow justifyContent="space-between">


            <FlexColumn minHeight={80} justifyContent="space-between">
              <DataBox
                title="Gas Used"
                value={block.gas_used} />
              <DataBox
                valueType="currency-fixed"
                title="Volume"
                value={block.volume} />
            </FlexColumn>
            <FlexColumn mr={100} minHeight={80} justifyContent="space-between">
              <DataBox
                valueType="currency-fixed"
                title="Gas Price"
                value={block.gas_price} />
              <DataBox
                title="Gas Limit"
                value={block.gas_price} />
            </FlexColumn>

            <FlexColumn textAlign="right" minHeight={80} justifyContent="space-between">
              <DataBox
                title="Solvetime"
                value={block.solvetime} />

              <DataBox
                title="Priority"
                value={block.priority} />

            </FlexColumn>
            <FlexColumn textAlign="right" minHeight={80} justifyContent="space-between">


              <DataBox
                valueType="currency-fixed"
                title="Block Rewards"
                value={block.rewards} />

              <DataBox
                valueType="currency-fixed"
                title="Block Fees"
                value={block.fees} />

            </FlexColumn>

          </FlexRow>

        </FlexColumn>
      </Card >
    </Wrapper >
  );
};
const Link = styled.a`
    color:#26B2EE
    font-size:14px;
    text-align:right;
    `

const Wrapper = styled.div`
        min-width: 340px;
        flex:1.8;
        margin: 0 5px;
    `
export default BlockInfo;


    // const newData = [
//   {color: "#18ecf2", value: block.n_accounts, id: "New Accounts" },
//   {color: "#29bcfa", value: block.n_new_implicit, id: "New Implicit" },
//   {color: "#858999", value: block.n_new_managed, id: "New Managed" },
//   {color: "#3e85f1", value: block.n_new_contracts, id: "New Contracts" },
//   {color: "hsl(357, 70%, 50%)", value: block.n_cleared_accounts, id: "Deleted Accounts", },
//   {color: "#000", value: block.n_funded_accounts, id: "Funded Accounts" },
      // ]

