import React from 'react';
import AnalyticsPanel from '../components/Analytics/AnalyticsPanel';
import OnchainActivity from '../components/Analytics/OnchainActivity';
import TransactionActivity from '../components/Analytics/TransactionActivity';
import OverallAccountsGrowth from '../components/Analytics/OverallAccountsGrowth';
import { Spinner, TwoCardInline, FlexColumn } from '../components/Common';
import { withRouter } from 'react-router-dom';
import { useMetaTags } from '../hooks/useMetaTags';

const AnalyticPage = () => {
  const [data, setData] = React.useState({ isLoaded: false });
  useMetaTags('Tezos Analytics');

  React.useEffect(() => {
    const fetchData = async () => {
      setData({
        isLoaded: true,
      });
    };

    fetchData();
  }, []);

  return data.isLoaded ? (
    <>
      <TwoCardInline>
        <OverallAccountsGrowth />
        <FlexColumn flex={0.5}>
          <OnchainActivity />
          <TransactionActivity />
        </FlexColumn>
      </TwoCardInline>
      <AnalyticsPanel />
    </>
  ) : (
    <Spinner />
  );
};

export default withRouter(AnalyticPage);
