import React from 'react';
import styled from 'styled-components';
import CycleHistory from '../../components/Cycle/CycleHistory';
import CycleSnapshotInfo from '../../components/Cycle/CycleSnapshotInfo';
import CycleHealth from '../../components/Cycle/CycleHealth';
import DelegationTreeMap from '../../components/Cycle/DelegationTreeMap';
import { getCycleById, getDelegationHistory } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common';
import { withRouter } from 'react-router-dom';

const CyclePage = ({ match, history }) => {
  const [data, setData] = React.useState({ isLoaded: false, match });

  const currentCycleId = match.params.id;

  React.useEffect(() => {
    const fetchData = async () => {
      let [cycle, delegationHistory] = await Promise.all([
        getCycleById({ id: currentCycleId }),
        getDelegationHistory({ cycle: currentCycleId }),
      ]);

      setData({
        isLoaded: true,
        cycle,
        delegationHistory,
      });
    };

    fetchData();
  }, [currentCycleId, history, match]);

  return data.isLoaded ? (
    <Wrapper>
      <CycleHistory cycle={data.cycle} />
      <TwoElementsWrapper>
        <CycleSnapshotInfo cycle={data.cycle} />
        <CycleHealth cycle={data.cycle} />
      </TwoElementsWrapper>
      <DelegationTreeMap data={data.delegationHistory} cycle={data.cycle} />
    </Wrapper>
  ) : (
    <Spiner />
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
