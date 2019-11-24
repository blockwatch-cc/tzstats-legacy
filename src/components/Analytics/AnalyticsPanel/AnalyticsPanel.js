import React from 'react';
import styled from 'styled-components';
import { Card, TabRow, TabButton } from '../../Common';
import SupplyTab from './SupplyTab';
import ActivationsTab from './ActivationsTab';
import OperationsTab from './OperationsTab';
import FeesTab from './FeesTab';
import GrowthTab from './GrowthTab';

const AnalyticsPanel = () => {
  const [data, setData] = React.useState({ tab: 'supply' });
  const handleClick = async tab => {
    setData({ tab: tab });
  };
  return (
    <Wrapper>
      <Card>
        <TabRow>
          <TabButton active={data.tab === 'supply'} onClick={e => handleClick('supply')}>
            Supply
          </TabButton>
          <TabButton active={data.tab === 'activations'} onClick={e => handleClick('activations')}>
            Activations
          </TabButton>
          <TabButton active={data.tab === 'operations'} onClick={e => handleClick('operations')}>
            Operations
          </TabButton>
          <TabButton active={data.tab === 'fees'} onClick={e => handleClick('fees')}>
            Mean Fees
          </TabButton>
          <TabButton active={data.tab === 'growth'} onClick={e => handleClick('growth')}>
            Growth
          </TabButton>
        </TabRow>
        <TabContent type={data.tab} />
      </Card>
    </Wrapper>
  );
};
const TabContent = ({ type }) => {
  switch (type) {
    case 'supply':
      return <SupplyTab />;
    case 'activations':
      return <ActivationsTab />;
    case 'operations':
      return <OperationsTab />;
    case 'fees':
      return <FeesTab />;
    case 'growth':
      return <GrowthTab />;
    default:
      return <></>;
  }
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
`;

export default AnalyticsPanel;
