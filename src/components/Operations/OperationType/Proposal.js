import React from 'react';
import { Card, DataBox, FlexColumnSpaceBetween, FlexRow, Spinner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash, getAccountVoting } from '../../../services/api/tz-stats';
import { getProposalByHash } from '../../../config/proposals';


const Proposal = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let [sender, ballot] = await Promise.all([
        op.sender && getAccountByHash(op.sender),
        getAccountVoting({ address: op.sender, op: op.hash, limit: 1 }),
      ]);

      setData({
        isLoaded: true,
        op: op,
        sender: sender,
        hashes: op.data.split(','),
        proposals: op.data.split(',').map(h => getProposalByHash(h)),
        ballot: ballot[0],
      });
    };

    fetchData();
  }, [op]);

  return data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender} />
      <Wrapper>
        <Card to={`/election/${data.ballot.election_id}`} title={`${opNames[op.type]}`}>
          <FlexRow height={80}>
            <TxTypeIcon fontSize={50} mr={40} type={op.type} isSuccess={op.is_success} />
            <FlexColumnSpaceBetween flex={1}>
              <FlexRow>
                <DataBox
                  title="Election"
                  valueSize="14px"
                  value={data.proposals[0].name.split(' ')[0]}
                  valueType="text"
                />
                <DataBox
                  title="Proposals"
                  ml={40}
                  value={data.proposals.map((p, index) => p.name.split(' ')[1] || index+1).join(', ')}
                  valueSize="14px"
                  valueType="text"
                />
                <DataBox title="Rolls" ml={40} value={data.ballot.rolls} valueSize="14px" />
              </FlexRow>
              {data.proposals[0] && (
                <FlexRow>
                  <DataBox
                    title="Link"
                    value={
                      <a target="_blank" rel="noopener noreferrer" href={data.proposals[0].link || '#'}>
                        {data.proposals[0].link || '-'}
                      </a>
                    }
                    valueSize="14px"
                    valueType="plain"
                  />
                </FlexRow>
              )}
            </FlexColumnSpaceBetween>
          </FlexRow>
        </Card>
      </Wrapper>
    </FlexRow>
  ) : (
    <Spinner />
  );
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Proposal;
