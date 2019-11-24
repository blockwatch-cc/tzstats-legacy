import React from 'react';
import { Card, DataBox, FlexRow, FlexColumn, Spinner } from '../../Common';
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
      let [sender, block] = await Promise.all([op.sender && getAccountByHash(op.sender), getBlock(op.height - 1)]);

      setData({
        isLoaded: true,
        op: op,
        sender: sender,
        block: block,
        allslots: getSlots(block.endorsed_slots).reverse(),
        opslots: getSlots(parseInt(op.data)).reverse(),
      });
    };

    fetchData();
  }, [op]);

  return data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender} />
      <Wrapper>
        <Card title={`${opNames[op.type]}`}>
          <FlexRow alignItems="center">
            <TxTypeIcon fontSize={50} mr={30} type={op.type} isSuccess={op.is_success} />
            <Link to={`/${op.height - 1}`}>
              <DataBox title="Block Endorsed" valueSize="18px" value={op.height - 1} />
            </Link>
            <FlexColumn flex={1} ml={30}>
              <Boxes>
                {data.allslots.map((item, i) => {
                  return <Slot key={i} color={data.opslots[i] ? white : item ? blue : grey} />;
                })}
              </Boxes>
              <DataBox
                title={`Slots Endorsed (${data.opslots
                  .map((s, i) => i)
                  .filter(s => data.opslots[s])
                  .reverse()
                  .map(s => s + 1)
                  .join(', ')})`}
              />
            </FlexColumn>
          </FlexRow>
        </Card>
      </Wrapper>
    </FlexRow>
  ) : (
    <Spinner />
  );
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

const Boxes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 192px;
  margin-bottom: 2px;
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
  background: ${props => props.color || grey};
`;
