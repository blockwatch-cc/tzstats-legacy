import React from 'react';
import StakingOverview from '../../components/Staking/StakingOverview';
import StakingCycleEvolution from '../../components/Staking/StakingCycleEvolution';
import StakingBakersInfo from '../../components/Staking/StakingBakerInfo';
import { getStakingData } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common';
//import { } from '../../utils';

const StakingPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });
  const currentUserHash = match.params.hash;

  React.useEffect(() => {
    const fetchData = async () => {
      setData({ isLoaded: true });
    };

    fetchData();
  }, [currentUserHash, match]);

  return data.isLoaded ? (
    <>
      <StakingOverview />
      <StakingCycleEvolution />
      <StakingBakersInfo />
    </>
  ) : (
    <Spiner />
  );
};

export default StakingPage;
