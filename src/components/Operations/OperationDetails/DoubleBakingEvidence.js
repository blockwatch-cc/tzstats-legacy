import React from 'react';
import { DataBox, FlexRow } from '../../Common';
import { Link } from 'react-router-dom';

const DoubleBakingEvidence = ({ op }) => {
	return (
		<FlexRow>
			<Link to={`/${op.block}`}>
				<DataBox mr={40} title="Block" valueSize="14px" value={op.height} />
			</Link>
			<Link to={`/cycle/${op.cycle}`}>
				<DataBox mr={40} title="Cycle" valueSize="14px" value={op.cycle} />
			</Link>
			<DataBox mr={40} title="Date & Time" valueSize="14px" valueType="datetime" value={op.time} />
			<DataBox mr={40} title="Burned" value={op.burned} valueSize="14px" valueType="currency-short" />
			<DataBox mr={40} title="Reward" value={op.reward} valueSize="14px" valueType="currency-short" />
		</FlexRow>
	);
};

export default DoubleBakingEvidence;
