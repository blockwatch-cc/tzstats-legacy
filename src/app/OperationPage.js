import React from 'react';
import styled from 'styled-components';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getOperations } from '../services/api/tz-stats';
import OperationDetails from '../components/Operations/OperationDetails';
import OperationType from '../components/Operations/OperationType';
import { Spinner, NotFound, Error } from '../components/Common';

const OperationPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false, wait: false });
  const hash = match.params.hash;
  useInfiniteScroll(fetchMore, 'body');

  async function fetchMore() {
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

  const load = React.useCallback(
    async () => {
      try {
        let ops = await getOperations(hash);
        setData({
          isLoaded: true,
          render: ops.splice(0, 20),
          ops: ops,
        });
      } catch (e) {
        switch (e.status) {
        case 502:
        case 504:
          return;
        case 404:
          setData({
            isLoaded: true,
            wait: true
          });
          break;
        default:
          setData({
            isLoaded: true,
            error: e
          });
        }
      }
    },
    [hash]
  );

  React.useEffect(() => {
    setData({ isLoaded: false, wait: false });
    load();
    return () => { setData({ isLoaded: false, wait: false }); }
  }, [hash, load]);

  switch (true) {
  case !data.isLoaded:
    return <Spinner />;
  case !!data.error:
    return <Error err={data.error} />;
  case data.wait:
    return <NotFound reloadFunc={load} type="transaction" hash={hash} />
  default:
    return (
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
    );
  }
};

const Wrapper = styled.div``;

const Operation = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
    border-top: 1px solid transparent;
  }
`;

export default OperationPage;
