import React from 'react';
import { DataBox, FlexRowSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const DoubleEndorsementEvidence = ({ op }) => {
  const [chain] = useGlobal('chain');
	return (
		<FlexRowSpaceBetween>
			<Link to={`/${op.block}`}>
				<DataBox title="Block" value={op.height} />
			</Link>
            <DataBox title="Confirmations" value={chain.height-op.height} />
			<Link to={`/cycle/${op.cycle}`}>
				<DataBox title="Cycle" value={op.cycle} />
			</Link>
			<DataBox title="Date & Time" valueType="datetime" value={op.time} />
			<DataBox title="Reward" value={op.volume} valueType="currency-short" />
			<DataBox title="Burned" value={op.burned} valueType="currency-short" />
			<DataBox title="Slashed" value={-op.reward-op.deposit-op.fee} valueType="currency-short" />
		</FlexRowSpaceBetween>
	);
};

export default DoubleEndorsementEvidence;
