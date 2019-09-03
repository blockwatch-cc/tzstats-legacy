import React from 'react';
import styled from 'styled-components';
import BlockHistory from '../../components/Blocks/BlockHistory';
import BlockOperations from '../../components/Blocks/BlockOperations';
import BlockInfo from '../../components/Blocks/BlockInfo';
import { getBlock, getBlockRange } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common';
import { withRouter } from 'react-router-dom';

const BlockPage = ({ match, history }) => {
  const [data, setData] = React.useState({ isLoaded: false, match });
  const [txType, setTxType] = React.useState(null);
  const currentBlockHash = match.params.hash;

  React.useEffect(() => {
    const fetchData = async () => {
      let [block, lastBlock] = await Promise.all([getBlock(currentBlockHash), getBlock()]);
      //todo optimize it for blockNumber
      const onehour = 60*60*1000;
      const historySpan = (new Date(lastBlock.time) - new Date(block.time) + block.solvetime*1000)
      console.log("BLOCK time diff",historySpan, lastBlock.time, block.time, block.solvetime );
      let blockHistory = [];
      if (historySpan < onehour) {
        blockHistory = await getBlockRange(lastBlock.height, 60, 0);
      } else {
        blockHistory = await getBlockRange(block.height, 30, 30);
      }
      setData({
        isLoaded: true,
        block: block,
        blockHistory,
        lastBlock,
      });
      setTxType(null);
    };

    fetchData();
  }, [currentBlockHash, history, match]);

  return data.isLoaded ? (
    <Wrapper>
      <BlockHistory blockHistory={data.blockHistory} currentBlock={data.block} />
      <BlockInfo block={data.block} setTxType={setTxType} />
      {!data.block.is_uncle ? <BlockOperations block={data.block} txType={txType} /> : ''}
    </Wrapper>
  ) : (
    <Spiner />
  );
};

const Wrapper = styled.div``;
export default withRouter(BlockPage);
