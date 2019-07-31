import React from 'react';
import styled from 'styled-components';
import BlockHistory from '../../components/BlockHistory'
import BlockOperations from '../../components/BlockOperations'
import BlockInfo from '../../components/BlockInfo'
import BlockTxChart from '../../components/BlockTxChart'
import { getBlock, getBlockData } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common'
import { withRouter } from 'react-router-dom';

const BlockPage = ({ match, history }) => {

  const [data, setData] = React.useState({ isLoaded: false, match });

  const currentBlockHash = match.params.hash;

  React.useEffect(() => {
    const fetchData = async () => {

      let [block, blockData] = await Promise.all([
        getBlock({ id: currentBlockHash }),
        getBlockData(),
      ]);
      if (!block) {
        history.push(`/not-found/${currentBlockHash}`)
      }

      setData({
        isLoaded: true,
        block: block,
        blockData,
        operations: block.ops
      });
    };

    fetchData();
  }, [match]);

  return (
    data.isLoaded ?
      (
        <Wrapper>
          <BlockHistory data={data.blockData} currentBlock={data.block} />
          <JoinContainer>
            <BlockInfo block={data.block} />
            <BlockTxChart block={data.block} />
          </JoinContainer>
          <BlockOperations data={data.operations} />
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
export default withRouter(BlockPage);
