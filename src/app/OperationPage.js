import React from 'react';
import styled from 'styled-components';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getOperations } from '../services/api/tz-stats';
import OperationDetails from '../components/Operations/OperationDetails';
import OperationType from '../components/Operations/OperationType';
import { Spiner } from '../components/Common';

const OperationPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });
  const currentOperationHash = match.params.hash;
  useInfiniteScroll(fetchMoreOperations, 'body');

  async function fetchMoreOperations() {
    if (!data.ops.length) {
      return;
    }
    let ops = data.ops;
    setData({
      render: [...data.render, ...ops.splice(0, 20)],
      isLoaded: true,
      ops: ops,
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let ops = await getOperations(currentOperationHash);
      setData({
        isLoaded: true,
        render: ops.splice(0, 20),
        ops: ops,
      });
    };

    fetchData();
  }, [currentOperationHash, match]);

  return data.isLoaded ? (
    <Wrapper>
      {data.render.map((op, index) => {
        return (
          <Operation key={index}>
            <OperationDetails op={op} key={'od' + index} />
            <OperationType op={op} key={'ot' + index} />
          </Operation>
        );
      })}
    </Wrapper>
  ) : (
    <Spiner />
  );
};

const Wrapper = styled.div``;

const Operation = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
    border-top: 1px solid transparent;
  }
`;

export default OperationPage;
