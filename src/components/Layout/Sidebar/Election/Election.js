import React from 'react';
import styled from 'styled-components';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox, LinkIcon } from '../../../Common';
import { withRouter, Link } from 'react-router-dom';
import { getElectionById } from '../../../../services/api/tz-stats';
import { getProposalByHash } from '../../../../config/proposals';

const Election = ({ history }) => {
  const [election, setElection] = React.useState({});
  const periodNumber = election.is_empty?0:election.num_periods;
  React.useEffect(() => {
    const fetchData = async () => {
      let election = await getElectionById();
      setElection(election);
    };
    fetchData();
  }, []);
  let proposalDetails = getProposalByHash(election.num_proposals ? election.proposal.proposals[0].hash : null);
  return (
    <Wrapper>
      <Link to={`/election/${election.election_id}`}>
      <LinkIcon>&#x25E5;</LinkIcon>
      {election && (
        <Card interactive={true} elevation={Elevation.ZERO}>
          <ElectionBoxWrapper>
            <ElectionBox>
              {new Array(periodNumber).fill(0).map((item, i) => (
                <PeriodBox key={i} />
              ))}
            </ElectionBox>
            <PeriodName>{proposalDetails.name}</PeriodName>
          </ElectionBoxWrapper>
          <DataBox title={`On-Chain Election`} />
        </Card>
      )}
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  position: relative;
`;
const PeriodName = styled.div`
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 16px;
`;
const PeriodBox = styled.div`
  background: linear-gradient(45deg, #26b2ee 0%, #29c0ff 100%);
  width: 9px;
  height: 9px;
`;
const ElectionBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  border: 1px solid ${props => (props.iscurrent === 'true' ? '#fff' : '#424553')};
`;
export default withRouter(Election);
