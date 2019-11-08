import React from 'react';
import { DataBox, FlexRow } from '../../Common';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const Endorsement = ({ op }) => {
  const [chain] = useGlobal('chain');
	return (
		<FlexRow>
			<Link to={`/${op.block}`}>
				<DataBox mr={40} title="Block" value={op.height} />
			</Link>
            <DataBox title="Confirmations" value={chain.height-op.height} />
			<Link to={`/cycle/${op.cycle}`}>
				<DataBox mr={40} title="Cycle" value={op.cycle} />
			</Link>
			<DataBox mr={40} title="Date & Time" valueType="datetime" value={op.time} />
			<DataBox mr={40} title="Deposit" value={op.deposit} valueType="currency-short" />
			<DataBox mr={40} title="Reward" value={op.reward} valueType="currency-short" />
		</FlexRow>
	);
};

export default Endorsement;
