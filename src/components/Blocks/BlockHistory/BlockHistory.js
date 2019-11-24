import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import _ from 'lodash';
import { Card, Value, FlexRow, FlexColumn, Devices } from '../../Common';
import BlockChart from './BlockChart';
import { Link } from 'react-router-dom';
import { timeAgo, getShortHash, formatValue } from '../../../utils';
import { getBlockTimeRange, getBlockHeight } from '../../../services/api/tz-stats';

function calcAgo(last) {
  return timeAgo.format(new Date(last));
}

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const BlockHistory = () => {
  const [config] = useGlobal('config');
  const [chain] = useGlobal('chain');

  // model
  const [data, setData] = React.useState({ isLoaded: false, blocks: [], last: {} });
  const [lastFullLoad, setLastFullLoad] = React.useState(0);

  // chart size handling
  const [chartConfig, setChartConfig] = React.useState({size: 60, width: 11, margin: 1});
  const ref = React.useRef(null);
  const rootElement = document.documentElement;

  // ago update handling
  const [countInTimeout, setCountInTimeout] = React.useState(0);
  const [ago, setAgo] = React.useState(calcAgo(chain.timestamp));

  // manage dynamic size
  React.useEffect(() => {
    function adjustSize() {
      const chart = ref.current ? ref.current.offsetWidth : 720;
      // Note: values are aligned with the CSS configuration in BlockChart
      const elem = convertRemToPixels(0.88);
      const margin = Math.max(parseInt(convertRemToPixels(0.05)), 1);
      setChartConfig({
        size: parseInt(chart / (elem + margin)),
        width: elem,
        margin: margin,
      });
      // console.log("Resize",elem,margin,parseInt(chart / (elem+margin) ))
    }
    const resize = _.debounce(() => { adjustSize(); }, 200);
    adjustSize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [setChartConfig, rootElement.style.fontSize]);

  // update displayed time each 10 sec
  React.useEffect(() => {
    const diff = (60 - new Date().getSeconds())%10;
    let timer = setTimeout(() => {
      setCountInTimeout(c => c + 1);
    }, diff*1000);
    setAgo(calcAgo(chain.timestamp));
    return () => clearTimeout(timer);
  }, [countInTimeout, chain.timestamp, setAgo]);

  // run full reload
  React.useEffect(() => {
    const fetchFull = async () => {
      let now = parseInt(new Date().getTime() / 1000) * 1000; // round to seconds
      now += now % 60000; // round up now to the next full minute
      const last = lastFullLoad;
      // const last = new Date(chain.timestamp).getTime();
      const blockspan = chartConfig.size * config.time_between_blocks[0] * 1000;
      if (now - last > blockspan) {
        now = last;
      }
      let blocks = await getBlockTimeRange(last - blockspan, now);
      setData({
        isLoaded: true,
        blocks,
        last: blocks.slice(-1)[0],
      });
    };
    if (config.version && lastFullLoad) {
      // console.log("Running full reload",lastFullLoad, config.time_between_blocks, config.version);
      fetchFull();
    }
  }, [config, lastFullLoad, chartConfig.size]);

  React.useEffect(() => {
    const fetchSingle = async () => {
      // console.log("Single block load",chain.height);
      let newblock = await getBlockHeight(chain.height);
      let now = parseInt(new Date().getTime() / 1000) * 1000;
      now += now % 60000; // round up now to the next full minute
      const blockspan = chartConfig.size * config.time_between_blocks[0] * 1000;
      // this may or may not be needed when the chain made no progress for blockspan
      // time slots
      // const last = new Date(chain.timestamp).getTime();
      // if (now - last > blockspan) {
      //   now = last;
      // }
      let blocks = data.blocks.filter(b => now - new Date(b.time).getTime() <= blockspan);
      blocks.push(newblock[0]);
      setData(d => {
        return {
          isLoaded: true,
          blocks: blocks,
          last: newblock[0],
        };
      });
    };
    // nothing to do without a new block
    if (!chain.height || (data.last && data.last.height === chain.height)) {
      // console.log("No new block", chain.height, data);
      return;
    }
    // we reload all state when
    // - on init
    // - older than 10 minutes
    // - detecing a gap
    // - detecting a reorg
    let full = !data.last||!data.blocks.length;
    // if (full) { console.log("Need full load on init", chain.height, chain.timestamp); }
    if (!full) {
      full = full || chain.height > data.last.height + 1;
      // if (chain.height>data.last.height+1) { console.log("Need full reload after gap", chain.height,data.last.height);}
      full = full || new Date(chain.timestamp) - lastFullLoad > 10 * 60000;
      // if (new Date(chain.timestamp).getTime() - lastFullLoad > 10*60000) { console.log("Need full reload after 10min");}
      full = full || data.last.parent_id !== data.blocks.slice(-2)[0].row_id;
      // if (data.last.parent_id!==data.blocks.slice(-2)[0].row_id) { console.log("Need full reload after reorg", data.last, data.blocks.slice(-2));}
    }
    switch (chain.status.status) {
      case 'synced':
        if (full) {
          setLastFullLoad(new Date(chain.timestamp).getTime());
        } else {
          fetchSingle();
        }
        break;
      default:
        // skip on init and when syncing (will be triggered by sidebar)
        break;
    }
  }, [config.time_between_blocks, chain, lastFullLoad, chartConfig.size, data]);

  return (
    <Wrapper>
      <Card>
        <DataRow>
          <DataItem>
            <DataTitle>Latest Block</DataTitle>
            <Value type="plain" value={<Link to={`/${chain.block_hash}`}>{formatValue(chain.height)}</Link>} />
          </DataItem>
          <DataItem>
            <DataTitle>Hash</DataTitle>
            <Value type="plain" value={<Link to={`/${chain.block_hash}`}>{getShortHash(chain.block_hash)}</Link>} />
          </DataItem>
          <DataItem>
            <DataTitle>Time</DataTitle>
            <Value type="text" value={ago}/>
          </DataItem>
          <DataItem>
            <DataTitle>Ops</DataTitle>
            <Value value={data.last.n_ops}/>
          </DataItem>
          <DataItem>
            <DataTitle>Volume</DataTitle>
            <Value type="currency" round={1} digits={0} value={data.last.volume} />
          </DataItem>
        </DataRow>
        <FlexRow>
          <BlockHistoryWrapper ref={ref}>
            <BlockChart blocks={data.blocks} config={chartConfig} />
          </BlockHistoryWrapper>
        </FlexRow>
      </Card>
    </Wrapper>
  );
};

const DataRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
`;

const DataItem = styled.div`
  font-size: 14px;
  margin-left: 0px;
  margin-right: 20px;
  white-space: nowrap;
  display: flex;
  flex-grow: 1;
  align-items: center;
  max-width: 120px;
  &:last-child {
    margin-right: 0;
  }
  @media ${Devices.mobileL} {
    max-width: unset;
    width: 100%;
    margin-right: 0;
    line-height: 1.4;
  }
`;

const DataTitle = styled.div`
  color:
  rgba(255,255,255,0.52);
  font-size: 12px;
  margin-right: 15px;
  width: 100%;
  text-align: right;
  @media ${Devices.mobileL} {
    text-align: left;
  }
`;


const Wrapper = styled.div`
  min-width: 300px;
`;
const BlockHistoryWrapper = styled(FlexColumn)`
  margin-top: 25px;
  margin-bottom: 10px;
  flex: 1;
`;

export default BlockHistory;
