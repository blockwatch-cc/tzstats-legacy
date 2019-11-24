import React from 'react';
import { Card, FlexRow, DataBox } from '../../Common';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getProposalByHash, getProposalById } from '../../../config/proposals';

const ElectionHistory = ({ electionHistory, currentElection }) => {
  const periodMap = { empty: 0, proposal: 1, testing_vote: 2, testing: 3, promotion_vote: 4 };
  return (
    <Wrapper>
      <Card title="Election History">
        <FlexRow>
          {electionHistory.filter(e => {return !e.is_empty || e.is_open;}).map((item, i) => {
            return (
              <ElectionBoxWrapper key={i}>
                <ElectionBox
                  to={`/election/${item.row_id}`}
                  iscurrent={`${item.row_id === currentElection.election_id}`}
                >
                  {new Array(periodMap[item.is_empty?'empty':item.last_voting_period]).fill(0).map((item, i) => (
                    <PeriodBox key={i} />
                  ))}
                </ElectionBox>
                <DataBox title={(item.proposal?getProposalByHash(item.proposal):getProposalById(item.row_id)).name} />
              </ElectionBoxWrapper>
            );
          })}
        </FlexRow>
      </Card>
    </Wrapper>
  );
};

// const getElectionName = item => {
//   return proposals[item.proposal] ? (
//     proposals[item.proposal].name.split(" ")[0]
//   ) : (
//     <span>-</span>
//   );
// };

const ElectionBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
`;
const ElectionBox = styled(Link)`
  width: 25px;
  height: 25px;
  background-color: #646876;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    border: 1px solid #fff;
  }
  border: 1px solid ${props => (props.iscurrent === 'true' ? '#fff' : '#424553')};
`;
const PeriodBox = styled.div`
  background: linear-gradient(45deg, #26b2ee 0%, #29c0ff 100%);
  width: 11.5px;
  height: 11.5px;
`;

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
`;

export default ElectionHistory;
