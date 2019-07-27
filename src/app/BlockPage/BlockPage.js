import React from 'react';
import styled from 'styled-components';
import BlockHistory from '../../components/BlockHistory'
import BlockOperations from '../../components/BlockOperations'
import BlockInfo from '../../components/BlockInfo'
import BlockTxChart from '../../components/BlockTxChart'
import { getBlock, getBlockData } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common'
import { wrapToVolume } from '../../utils';


const BlockPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });
  const currentBlockHash = match.params.hash;

  React.useEffect(() => {
    const fetchData = async () => {

      let [block, blockData] = await Promise.all([
        getBlock({ id: currentBlockHash }),
        getBlockData({ days: 29 }),
      ]);

      setData({
        isLoaded: true,
        block: block,
        blockData
      });
    };

    fetchData();
  }, []);

  return (
    data.isLoaded ?
      (
        <Wrapper>
          <BlockHistory data={data.blockData} />
          <JoinContainer>
            <BlockInfo block={data.block} />
            <BlockTxChart block={data.block} />
          </JoinContainer>
          <BlockOperations block={data.block} />
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
export default BlockPage;
