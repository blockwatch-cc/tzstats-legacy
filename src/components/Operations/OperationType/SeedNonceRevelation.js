import React from 'react';
import { Card, DataBox, FlexColumnSpaceBetween, FlexRow, Spinner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash } from '../../../services/api/tz-stats';
import { Link } from 'react-router-dom';

const SeedNonceRevelation = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
	const fetchData = async () => {
	  const embedded = op.data.split(',');
	  let [sender] = await Promise.all([
		op.sender && getAccountByHash(op.sender),
	  ]);

	  setData({
		isLoaded: true,
		op: op,
		sender: sender,
		height: embedded[0],
		nonce: embedded[1]
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
					<Link to={`/${data.height}`}><DataBox title="For Block" valueSize="14px" value={data.height} /></Link>
				</FlexRow>
				<FlexRow>
					<DataBox title="Nonce" valueSize="12px" valueType="text" value={`0x${data.nonce}`} />
				</FlexRow>
			</FlexColumnSpaceBetween>
		  </FlexRow>
		</Card>
	  </Wrapper>
	</FlexRow>
  ) : (
	<Spinner />
  ));
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default SeedNonceRevelation;
