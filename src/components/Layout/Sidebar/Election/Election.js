import React from 'react';
import styled from 'styled-components';
import { timeAgo } from '../../../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox } from '../../../Common';
import { withRouter } from 'react-router-dom';
import { getElectionById } from '../../../../services/api/tz-stats';
import { proposals } from '../../../../config/proposals';

const Election = ({ history }) => {
  const [election, setElection] = React.useState({});
  const periodNumber = election.promotion_vote ? 4 : election.testing ? 3 : election.testing_vote ? 2 : 1;
  const handleClick = () => {
    history.push(`/election/${election.election_id}`);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      let election = await getElectionById();
      setElection(election);
    };
    fetchData();
  }, []);
  const proposalDiteils =
    election.testing_vote && proposals[election.testing_vote.proposals[0].hash]
      ? proposals[election.testing_vote.proposals[0].hash]
      : { name: 'New', link: '', archive: '' };
  return (
    <Wrapper>
      {election && (
        <Card onClick={handleClick} interactive={true} elevation={Elevation.ZERO}>
          <DataBox title={`On-Chain Governance Period`} />
          <ElectionBoxWrapper>
            <ElectionBox>
              {new Array(periodNumber).fill(0).map((item, i) => (
                <PeriodBox key={i} />
              ))}
            </ElectionBox>
            <PeriodName>{proposalDiteils.name}</PeriodName>
          </ElectionBoxWrapper>
        </Card>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
`;
const PeriodName = styled.div`
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 16px;
`;
const PeriodBox = styled.div`
  background: linear-gradient(45deg, #26b2ee 0%, #29c0ff 100%);
  width: 8.5px;
  height: 8.5px;
`;
const ElectionBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;
const ElectionBox = styled.div`
  width: 20px;
  height: 20px;
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
export default withRouter(Election);
