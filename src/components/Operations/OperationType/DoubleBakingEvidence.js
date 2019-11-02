import React from 'react';
import { Card, DataBox, FlexRow, Spinner } from '../../Common';
import styled from 'styled-components';
import TxTypeIcon from '../../Common/TxTypeIcon';
import OperationAccount from '../OperationAccount';
import { opNames } from '../../../config';
import { getAccountByHash } from '../../../services/api/tz-stats';
import { Link } from 'react-router-dom';

const DoubleBakingEvidence = ({ op }) => {
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

	return data.isLoaded ? (
		<FlexRow>
			<OperationAccount title={'Accuser'} account={data.accuser} />
			<Wrapper>
				<Card title={`${opNames[op.type]}`}>
					<FlexRow>
						<TxTypeIcon fontSize={40} mr={40} mt={-15} type={op.type} isSuccess={op.is_success} />
						<Link to={`/${op.data[0].level}`}>
							<DataBox title="Block" valueSize="18px" value={op.data[0].level} />
						</Link>
					</FlexRow>
				</Card>
			</Wrapper>
			<OperationAccount title={'Offender'} account={data.offender} />
		</FlexRow>
	) : (
		<Spinner />
	);
};

const Wrapper = styled.div`
	flex: 1;
	margin: 0 5px;
`;

export default DoubleBakingEvidence;
