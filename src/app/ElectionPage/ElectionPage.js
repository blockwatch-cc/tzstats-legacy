import React from 'react';
import styled from 'styled-components';
import { getElectionById, getElectionHistory } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common';
import {
  ProposalPeriod,
  ExplorationPeriod,
  TestingPeriod,
  PromotionPeriod,
  ElectionHistory,
} from '../../components/Elections';

const ElectionPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });
  const currentElectionId = match.params.id;

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
  }, [currentElectionId, match]);

  return data.isLoaded ? (
    <Wrapper>
      <ElectionHistory electionHistory={data.electionHistory} currentElection={data.election} />
      <TwoElementsWrapper>
        <ProposalPeriod period={data.election.proposal} />
        <ExplorationPeriod period={data.election.testing_vote} />
      </TwoElementsWrapper>
      <TwoElementsWrapper>
        <TestingPeriod period={data.election.testing} />
        <PromotionPeriod period={data.election.promotion_vote} />
      </TwoElementsWrapper>
    </Wrapper>
  ) : (
    <Spiner />
  );
};
const Wrapper = styled.div``;
const TwoElementsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 9px;
  padding-bottom: 1px;
  margin-left: -5px;
  margin-right: -5px;
`;
export default ElectionPage;
