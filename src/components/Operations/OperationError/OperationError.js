import React from 'react';
import { Card } from '../../Common';
import { opNames } from '../../../config';

const OperationError = ({ op }) => {
  return <Card title={opNames[op.type] + ' Error'}>{op.errors[0].id}</Card>;
};

export default OperationError;
