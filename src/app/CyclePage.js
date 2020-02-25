import React from 'react';
import styled from 'styled-components';
import { useGlobal } from 'reactn';
import CycleHistory from '../components/Cycle/CycleHistory';
import CycleSnapshotInfo from '../components/Cycle/CycleSnapshotInfo';
import CycleHealth from '../components/Cycle/CycleHealth';
import DelegationTreeMap from '../components/Cycle/DelegationTreeMap';
import { getChainData, getCycleById, getDelegationHistory } from '../services/api/tz-stats';
import { Spinner } from '../components/Common';
import { withRouter } from 'react-router-dom';
import { useMetaTags } from '../hooks/useMetaTags';

const CyclePage = ({ match, history }) => {
  const [data, setData] = React.useState({ isLoaded: false, match });
  const [config] = useGlobal('config');
  const currentCycleId = match.params.id;
  useMetaTags('Tezos Cycle', currentCycleId);

  React.useEffect(() => {
    const fetchData = async () => {
      let [chainData, cycle, delegationHistory] = await Promise.all([
        getChainData(),
        getCycleById({ id: currentCycleId }),
        getDelegationHistory({ cycle: currentCycleId }),
      ]);
      let lastCycle = chainData.cycle;

      setData({
        isLoaded: true,
        cycle,
        lastCycle,
        delegationHistory,
      });
    };

    fetchData();
  }, [currentCycleId, history, match]);

  return data.isLoaded ? (
    <Wrapper>
      <CycleHistory cycle={data.cycle} lastCycle={data.lastCycle} count={config.preserved_cycles} />
      <TwoElementsWrapper>
        <CycleSnapshotInfo cycle={data.cycle} />
        <CycleHealth cycle={data.cycle} />
      </TwoElementsWrapper>
      <DelegationTreeMap data={data.delegationHistory} cycle={data.cycle} />
    </Wrapper>
  ) : (
    <Spinner />
  );
};

const TwoElementsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-left: -5px;
  margin-right: -5px;
`;

const Wrapper = styled.div``;
export default withRouter(CyclePage);
