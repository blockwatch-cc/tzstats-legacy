import React from 'react';
import styled from 'styled-components';
import { useGlobal } from 'reactn';
import { getElectionById, getElectionHistory } from '../services/api/tz-stats';
import { Spinner } from '../components/Common';
import {
  ProposalPeriod,
  ExplorationPeriod,
  TestingPeriod,
  PromotionPeriod,
  ElectionHistory,
} from '../components/Elections';
import { useMetaTags } from '../hooks/useMetaTags';

const ElectionPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });
  const [config] = useGlobal('config');
  const currentElectionId = match.params.id;
  useMetaTags('Tezos Governance');

  React.useEffect(() => {
    const fetchData = async () => {
      let [election, electionHistory] = await Promise.all([getElectionById(currentElectionId), getElectionHistory()]);
      setData({
        election,
        electionHistory,
        isLoaded: true,
      });
    };

    fetchData();
  }, [currentElectionId, match, config]);

  return data.isLoaded ? (
    <Wrapper>
      <ElectionHistory electionHistory={data.electionHistory} currentElection={data.election} />
      <TwoElementsWrapper>
        <ProposalPeriod period={data.election.proposal} election={data.election} />
        <ExplorationPeriod period={data.election.testing_vote} />
      </TwoElementsWrapper>
      <TwoElementsWrapper>
        <TestingPeriod period={data.election.testing} />
        <PromotionPeriod period={data.election.promotion_vote} election={data.election} />
      </TwoElementsWrapper>
    </Wrapper>
  ) : (
    <Spinner />
  );
};
const Wrapper = styled.div``;
const TwoElementsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-left: -5px;
  margin-right: -5px;
`;
export default ElectionPage;
