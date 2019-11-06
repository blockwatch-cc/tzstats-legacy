import React from 'react';
import styled from 'styled-components';
import { useGlobal } from 'reactn';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getOperations } from '../services/api/tz-stats';
import { buildTitle } from '../utils';
import { opNames } from '../config';
import OperationDetails from '../components/Operations/OperationDetails';
import OperationType from '../components/Operations/OperationType';
import OperationError from '../components/Operations/OperationError';
import { Spinner, NotFound, Error } from '../components/Common';

const OperationPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false, wait: false, isBulk: false, isCall: false });
  const [config] = useGlobal('config');
  const hash = match.params.hash;
  useInfiniteScroll(fetchMore, 'body');

  React.useEffect(() => {
    document.title = buildTitle(config, 'Operation', hash);
  }, [config, hash]);

  async function fetchMore() {
    if (!data.ops.length) {
      return;
    }
    setData({
      render: [...data.render, ...data.ops.splice(0, 20)],
      isLoaded: true,
      ops: data.ops,
      isBulk: data.isBulk,
    });
  }

  const load = React.useCallback(async () => {
    try {
      let ops = await getOperations(hash);
      document.title = buildTitle(config, opNames[ops[0].type], hash);
      setData({
        isLoaded: true,
        isBulk: ops.length > 1 && !ops[0].is_contract && ops[0].type === ops[1].type,
        isCall: ops[0].is_contract,
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
            wait: true,
          });
          break;
        default:
          setData({
            isLoaded: true,
            error: e,
          });
      }
    }
  }, [hash, config]);

  React.useEffect(() => {
    setData({ isLoaded: false, wait: false });
    load();
    return () => {
      setData({ isLoaded: false, wait: false });
    };
  }, [hash, load]);

  switch (true) {
    case !data.isLoaded:
      return <Spinner />;
    case !!data.error:
      return <Error err={data.error} />;
    case data.wait:
      return <NotFound reloadFunc={load} type="transaction" hash={hash} />;
    default:
      return (
        <Wrapper>
          <h1>
            {data.isCall
              ? 'Smart Contract Call'
              : (data.isBulk ? 'Bulk ' : '') + opNames[data.render.slice(-1)[0].type]}
          </h1>
          {data.render.map((op, index) => {
            return (
              <Operation key={index}>
                <OperationType op={op} key={'ot' + index} />
                {((!data.isBulk && !data.isCall) || !index) && <OperationDetails op={op} key={'od' + index} />}
                {!op.is_success && !!op.errors && <OperationError op={op} />}
              </Operation>
            );
          })}
        </Wrapper>
      );
  }
};

const Wrapper = styled.div``;

const Operation = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default OperationPage;
