import React from 'react';
import styled from 'styled-components';
import BlockHistory from '../../components/Blocks/BlockHistory';
import BlockOperations from '../../components/Blocks/BlockOperations';
import BlockInfo from '../../components/Blocks/BlockInfo';
import BlockTxChart from '../../components/Blocks/BlockTxChart';
import { getBlock, getBlockData } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common';
import { withRouter } from 'react-router-dom';

const BlockPage = ({ match, history }) => {
  const [data, setData] = React.useState({ isLoaded: false, match });

  const currentBlockHash = match.params.hash;

  React.useEffect(() => {
    const fetchData = async () => {
      let [block, blockData] = await Promise.all([getBlock({ id: currentBlockHash }), getBlockData()]);
      if (!block) {
        history.push(`/not-found/${currentBlockHash}`);
      }

      setData({
        isLoaded: true,
        block: block,
        blockData,
        operations: block.ops,
      });
    };

    fetchData();
  }, [currentBlockHash, history, match]);

  return data.isLoaded ? (
    <Wrapper>
      <BlockHistory data={data.blockData} currentBlock={data.block} />
      <TwoElementsWrapper>
        <BlockInfo block={data.block} />
        <BlockTxChart block={data.block} />
      </TwoElementsWrapper>
      <BlockOperations data={data.operations} />
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
