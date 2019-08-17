import React from 'react';
import styled from 'styled-components';
import { getOperation, getAccountByHash } from '../../services/api/tz-stats';
import OperationDetails from '../../components/Operations/OperationDetails';
import OperationTypeDetails from '../../components/Operations/OperationTypeDetails';
import { Spiner } from '../../components/Common';
import { wrapToVolume, getDelegatorByHash } from '../../utils';

const OperationPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });
  const currentOperationHash = match.params.hash;

  React.useEffect(() => {
    const fetchData = async () => {
      let operation = await getOperation(currentOperationHash);

      let [receiver, sender] = await Promise.all([
        operation.receiver && getAccountByHash(operation.receiver),
        operation.sender && getAccountByHash(operation.sender),
      ]);

      setData({
        isLoaded: true,
        operation: { ...operation, sender, receiver },
      });
    };

    fetchData();
  }, [currentOperationHash, match]);

  return data.isLoaded ? (
    <Wrapper>
      <OperationTypeDetails operation={data.operation} />
      <OperationDetails operation={data.operation} />
    </Wrapper>
  ) : (
    <Spiner />
  );
};

const JoinContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Wrapper = styled.div``;
export default OperationPage;
