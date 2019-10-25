import React from 'react';
import { Card, DataBox, HashedBox, FlexRowSpaceBetween, FlexColumnSpaceBetween, FlexRow, Spiner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { timeAgo, getOpTags } from '../../../utils';
import { getAccountByHash } from '../../../services/api/tz-stats';

const Origination = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let [sender, contract, manager, delegate] = await Promise.all([
        op.sender && getAccountByHash(op.sender),
        op.receiver && getAccountByHash(op.receiver),
        (op.manager&&op.manager!==op.sender) && getAccountByHash(op.manager),
        (op.delegate&&op.delegate!==op.sender) && getAccountByHash(op.delegate),
      ]);

      setData({
        isLoaded: true,
        op: op,
        sender: sender,
        contract: contract,
        manager: op.manager?manager||sender:null,
        delegate: delegate||(op.delegate?sender:null),
      });
    };

    fetchData();
  }, [op]);

  return ( data.isLoaded ? (
    <FlexRow>
      <OperationAccount title={'Sender'} account={data.sender}/>
      <Wrapper>
        <Card to={data.contract?('/'+data.contract.address):null} title={`${opNames[op.type]}`} tags={getOpTags(op)}>
          <FlexRow height={80}>
            <TxTypeIcon fontSize={50} mr={40} type={op.type} isSuccess={op.is_success} />
            <FlexColumnSpaceBetween flex={1}>
              <FlexRow>
                <HashedBox
                  hash={data.contract?data.contract.address:null}
                  isCopy={false}
                  short={true}
                  typeName={`Last active ${data.contract?timeAgo.format(new Date(data.contract.last_seen_time)):'-'}`}
                />
              </FlexRow>
              <FlexRowSpaceBetween>
                <DataBox title="Fee" value={op.fee} valueSize="14px" valueType="currency-short" />
                <DataBox title="Burned" value={op.burned} valueSize="14px" valueType="currency-short" />
              </FlexRowSpaceBetween>
            </FlexColumnSpaceBetween>
          </FlexRow>
        </Card>
      </Wrapper>
      <OperationAccount title={'Delegate'} account={data.delegate} onempty={'No delegate set'}/>
    </FlexRow>
  ) : (
    <Spiner />
  ));
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default Origination;
