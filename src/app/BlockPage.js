import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import BlockHistory from '../components/Blocks/BlockHistory';
import BlockOperations from '../components/Blocks/BlockOperations';
import BlockInfo from '../components/Blocks/BlockInfo';
import { getBlock, getBlockRange } from '../services/api/tz-stats';
import { formatValue, buildTitle } from '../utils';
import { Spinner, NotFound, Error } from '../components/Common';
import { withRouter } from 'react-router-dom';

const BlockPage = ({ match, history }) => {
  const [data, setData] = React.useState({ isLoaded: false, wait: false });
  const [txType, setTxType] = React.useState(null);
  const [config] = useGlobal('config');
  const [chain] = useGlobal('chain');
  const hash = match.params.hash;

  React.useEffect(() => {
    document.title = buildTitle(config, 'Block', hash);
  }, [config, hash]);

  const load = React.useCallback(async () => {
    try {
      let block = await getBlock(hash);
      document.title = buildTitle(config, 'Block', formatValue(block.height));
      const sixtyblocks = 60 * config.time_between_blocks[0] * 1000;
      const historySpan = new Date(chain.timestamp) - new Date(block.time) + block.solvetime * 1000;
      let blockHistory = [];
      if (historySpan < sixtyblocks) {
        blockHistory = await getBlockRange(chain.height, 60, 0);
      } else {
        blockHistory = await getBlockRange(block.height, 30, 30);
      }
      setData({
        isLoaded: true,
        block: block,
        blockHistory,
      });
      setTxType(null);
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
  }, [hash, chain.timestamp, chain.height, config]);

  React.useEffect(() => {
    if (chain.height && config.time_between_blocks) {
      // setData({ isLoaded: false, wait: false });
      load();
    }
    return () => {
      setData({ isLoaded: false, wait: false });
    };
  }, [hash, chain.timestamp, chain.height, config.time_between_blocks, load]);

  switch (true) {
    case !data.isLoaded:
      return <Spinner />;
    case !!data.error:
      return <Error err={data.error} />;
    case data.wait:
      return <NotFound reloadFunc={load} type="block" hash={hash} />;
    default:
      return (
        <Wrapper>
          <BlockHistory blockHistory={data.blockHistory} currentBlock={data.block} />
          <BlockInfo block={data.block} setTxType={setTxType} />
          {!data.block.is_orphan ? <BlockOperations block={data.block} txType={txType} /> : ''}
        </Wrapper>
      );
  }
};

const Wrapper = styled.div``;
export default withRouter(BlockPage);
