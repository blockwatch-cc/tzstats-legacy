import React from 'react';
import styled from 'styled-components';
import { getOperation, getAccountByHash } from '../../services/api/tz-stats';
import OperationAccountDetiles from '../../components/OperationAccountDetiles'
import OperationDetiles from '../../components/OperationDetiles'
import OperationTypeDetiles from '../../components/OperationTypeDetiles'
import { Spiner } from '../../components/Common'
import { wrapToVolume, getDelegatorByHash, } from '../../utils';


const OperationPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });
  const currentOperationHash = match.params.hash;
  const delegatorName = getDelegatorByHash(currentOperationHash)

  React.useEffect(() => {
    const fetchData = async () => {
      let operation = await getOperation(currentOperationHash);

      let [receiver, sender] = await Promise.all([
        operation.receiver && getAccountByHash(operation.receiver),
        operation.sender && getAccountByHash(operation.sender)
      ]);

      setData({
        isLoaded: true,
        operation: { ...operation, sender, receiver, delegatorName },
      });
    };

    fetchData();
  }, [match]);

  return (
    data.isLoaded ?
      (
        <Wrapper>
          <OperationTypeDetiles operation={data.operation} />
          <OperationDetiles operation={data.operation} />
        </Wrapper >
      ) :
      <Spiner />
  )
};

const JoinContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
                
`;
export default OperationPage;
