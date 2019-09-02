import React from 'react';
import WhaleDomination from '../../components/Whales/WhaleDomination';
import WealthCentralization from '../../components/Whales/WealthCentralization';
import { getStakingData } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common';
//import { } from '../../utils';

const WhalePage = ({ match }) => {
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
      <WhaleDomination />
      <WealthCentralization />
    </>
  ) : (
    <Spiner />
  );
};

export default WhalePage;
