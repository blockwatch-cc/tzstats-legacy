import React from 'react';
import { Card, DataBox, HashedBox, FlexRowSpaceBetween, FlexColumnSpaceBetween, FlexRow, FlexColumn, FlexRowWrap, Spiner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash, getBlock } from '../../../services/api/tz-stats';
import { getSlots } from '../../../utils';
import { Link } from 'react-router-dom';

const Endorsement = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let [sender, block] = await Promise.all([
        op.sender && getAccountByHash(op.sender),
        getBlock(op.height-1),
      ]);

      setData({
        isLoaded: true,
        op: op,
        sender: sender,
        block: block,
        allslots: getSlots(block.endorsed_slots),
        opslots: getSlots(parseInt(op.data))
      });
    };

    fetchData();
  }, [op]);

  return ( data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender}/>
      <Wrapper>
        <Card title={`${opNames[op.type]}`}>
          <FlexRow height={80}>
            <TxTypeIcon fontSize={50} mr={40} type={op.type} isSuccess={op.is_success} />
            <FlexColumnSpaceBetween flex={1}>
              <FlexRow>
                <Link to={`/block/${op.height-1}`}><DataBox title="Block Endorsed" valueSize="14px" value={op.height-1}/></Link>
                <DataBox title="Deposit" ml={40} value={op.deposit} valueSize="14px" valueType="currency-short" />
                <DataBox title="Reward" ml={40} value={op.reward} valueSize="14px" valueType="currency-short" />
              </FlexRow>
              <FlexRow>
				<FlexColumn>
					<FlexRowWrap width={192} mb={'2px'}>
					{data.allslots.map((item, i) => {
					  return (
					    <Slot key={i} color={data.opslots[i]?white:item?blue:grey}/>
					  );
					})}
					</FlexRowWrap>
					<DataBox title={`Slots Endorsed (${data.opslots.map((s,i)=>i).filter(s=>data.opslots[s]).reverse().map(s=>31-s).join(', ')})`} />
				</FlexColumn>
              </FlexRow>
            </FlexColumnSpaceBetween>
          </FlexRow>
        </Card>
      </Wrapper>
    </FlexRow>
  ) : (
    <Spiner />
  ));
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Endorsement;

const blue = '#27b9f7';
const grey = '#525566';
const white = '#fff';

const Slot = styled.div`
  height: 12px;
  width: 12px;
  font-size: 8px;
  text-align: center;
  border-right: 1px solid #444754;
  border-bottom: 1px solid #444754;
  background: ${props => props.color||grey};
`;
