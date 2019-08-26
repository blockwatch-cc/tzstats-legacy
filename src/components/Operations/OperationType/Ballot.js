import React from 'react';
import { Card, DataBox, HashedBox, FlexRowSpaceBetween, FlexColumnSpaceBetween, FlexRow, Spiner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { proposals, opNames, govNames } from '../../../config';
import { getAccountByHash, getAccountVoting } from '../../../services/api/tz-stats';
import { capitalizeFirstLetter } from '../../../utils';

const Ballot = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      const embedded = op.data.split(',');
      let [sender, ballot] = await Promise.all([
        op.sender && getAccountByHash(op.sender),
        getAccountVoting({address: op.sender, op: op.hash})
      ]);

      setData({
        isLoaded: true,
        op: op,
        sender: sender,
        hash: embedded[0],
        proposal: proposals[embedded[0]],
        vote: capitalizeFirstLetter(embedded[1]),
        ballot: ballot[0],
      });
    };

    fetchData();
  }, [op]);

  return ( data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender}/>
      <Wrapper>
        <Card to={`/election/${data.hash}`} title={`${opNames[op.type]}`}>
          <FlexRow height={80}>
            <TxTypeIcon fontSize={50} mr={40} type={op.type} isSuccess={op.is_success} />
            <FlexColumnSpaceBetween flex={1}>
              <FlexRow>
                <DataBox title="Election" valueSize="14px" value={data.proposal.name} valueType="text" />
                <DataBox title="Period" ml={40} valueSize="14px" value={govNames[data.ballot.voting_period_kind]} valueType="text" />
                <DataBox title="Vote" ml={40} value={data.vote} valueSize="14px" valueType="text" />
                <DataBox title="Rolls" ml={40} value={data.ballot.rolls} valueSize="14px" />
              </FlexRow>
            </FlexColumnSpaceBetween>
          </FlexRow>
        </Card>
      </Wrapper>
    </FlexRow>
  ) : (
    <Spiner />
  ));
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Ballot;

