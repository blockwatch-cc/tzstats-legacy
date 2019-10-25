import React from 'react';
import { Card, DataBox, FlexColumnSpaceBetween, FlexRow, Spiner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash } from '../../../services/api/tz-stats';
import { Link } from 'react-router-dom';

const DoubleEndorsementEvidence = ({ op }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
	const fetchData = async () => {
	  let [accuser, offender] = await Promise.all([
		op.sender && getAccountByHash(op.sender),
		op.receiver && getAccountByHash(op.receiver),
	  ]);

	  setData({
		isLoaded: true,
		op: op,
		accuser: accuser,
		offender: offender,
	  });
	};

	fetchData();
  }, [op]);

  return ( data.isLoaded ? (
	<FlexRow>
	  <OperationAccount title={'Accuser'} account={data.accuser}/>
	  <Wrapper>
		<Card title={`${opNames[op.type]}`}>
		  <FlexRow height={80}>
			<TxTypeIcon fontSize={50} mr={40} type={op.type} isSuccess={op.is_success} />
			<FlexColumnSpaceBetween flex={1}>
				<FlexRow>
					<Link to={`/${op.data[0].operations.level}`}><DataBox title="Block" valueSize="14px" value={op.data[0].operations.level} /></Link>
				</FlexRow>
				<FlexRow>
					<DataBox title="Burned" value={op.burned} valueSize="14px" valueType="currency-short" />
                    <DataBox title="Reward" ml={40} value={op.reward} valueSize="14px" valueType="currency-short" />
				</FlexRow>
			</FlexColumnSpaceBetween>
		  </FlexRow>
		</Card>
	  </Wrapper>
	  <OperationAccount title={'Offender'} account={data.offender}/>
	</FlexRow>
  ) : (
	<Spiner />
  ));
};

const Wrapper = styled.div`
  flex: 1;
  margin: 0 5px;
`;

export default DoubleEndorsementEvidence;
