import React from 'react';
import styled from 'styled-components';
import BlockHistory from '../../components/Blocks/BlockHistory';
import BlockOperations from '../../components/Blocks/BlockOperations';
import BlockInfo from '../../components/Blocks/BlockInfo';
import BlockTxChart from '../../components/Blocks/BlockTxChart';
import { getBlock, getBlockHistory } from '../../services/api/tz-stats';
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
      let blockHistory = [];
      if (lastBlock.height - block.height < 50) {
        blockHistory = await getBlockHistory(lastBlock.height, 50, 0);
      } else {
        blockHistory = await getBlockHistory(block.height, 25, 25);
      }
      setData({
        isLoaded: true,
        block: block,
        blockHistory,
        lastBlock,
      });
    };

    fetchData();
  }, [currentBlockHash, history, match]);

  return data.isLoaded ? (
    <Wrapper>
      <BlockHistory blockHistory={data.blockHistory} currentBlock={data.block} lastBlock={data.lastBlock} />
      <TwoElementsWrapper>
        <BlockInfo block={data.block} setTxType={setTxType} />
      </TwoElementsWrapper>
      <BlockOperations block={data.block} txType={txType} />
    </Wrapper>
  ) : (
    <Spiner />
  );
};

const TwoElementsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-left: -5px;
  margin-right: -5px;
`;

const Wrapper = styled.div``;
export default withRouter(BlockPage);
