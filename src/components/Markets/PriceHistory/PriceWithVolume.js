import React from 'react';
import PriceChart from './PriceChart';
import { Card, FlexColumn, FlexColumnSpaceAround, DataBox, FlexRowWrap, Row } from '../../Common';
import styled from 'styled-components';
import _ from 'lodash';
import { isValid, getPeakVolumeTime, wrapToVolume } from '../../../utils';
import { useGlobal } from 'reactn';
import { getOhlcvData, getVolumeData, marketNames } from '../../../services/api/markets';
import { Spinner } from '../../../components/Common';
import useOnline from '../../../hooks/useOnline';
import useLocalStorage from '../../../hooks/useLocalStorage';

const PriceWithVolume = () => {
  const [countInTimeout, setCountInTimeout] = React.useState(0);
  const [data, setData] = React.useState({ isLoaded: false, priceHistory: [], lastPrice: {}, max: 0, peak: 0 });
  const [selected, setSelected] = React.useState({
    data: { time: new Date() },
    period: '',
    volume: 0,
  });
  const defaultMarket = { exchange: 'kraken', market: 'XTZ_USD' };
  const [market, setMarket] = useLocalStorage('market', defaultMarket);
  const [tickers] = useGlobal('tickers');
  const isOnline = useOnline();

  // reset when current exchange/market is dead
  if (!tickers.some((t)=> t.exchange === market.exchange && t.pair === market.market)) {
    setMarket(defaultMarket);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let timer = null,
        timeout = 600000;
      if (!isOnline) {
        if (countInTimeout > 0) {
          setCountInTimeout(0);
        }
        return;
      }
      try {
        let [marketData, volSeries] = await Promise.all([
          getOhlcvData({
            exchange: market.exchange,
            market: market.market,
            days: 30,
          }),
          getVolumeData({
            exchange: market.exchange,
            market: market.market,
            days: 30,
            collapse: 4,
          }),
        ]);
        const volume = wrapToVolume(volSeries);
        const priceHistory = marketData.map((item, i) => {
          item['hourVolumes'] = volume[i];
          return item;
        });
        setData({
          isLoaded: true,
          max: _.maxBy(volSeries, item => item[1])[1],
          peak: getPeakVolumeTime(volSeries, 4),
          avgvol: _.sumBy(priceHistory, o => o.vol_base) / priceHistory.length,
          priceHistory,
          lastPrice: priceHistory.slice(-1)[0],
        });
      } catch (e) {
        setData({ isLoaded: false, priceHistory: [], lastPrice: {}, max: 0, peak: 0 });
        timeout = 60000; // 1 min
      }
      timer = setTimeout(() => {
        setCountInTimeout(c => c + 1);
      }, timeout);
      return () => clearTimeout(timer);
    };
    fetchData();
  }, [countInTimeout, isOnline, market]);

  return data.isLoaded && isValid(data.priceHistory) ? (
    <Wrapper>
      <Card
        title={'30d Price History'}
        right={<MarketSelector tickers={tickers} current={market} setMarket={setMarket} />}
      >
        <FlexRowWrap height={350} mt={20}>
          <div style={{ flex: 1, marginLeft: 10, marginRight: 20 }}>
            <PriceChart
              type={'svg'}
              data={data.priceHistory}
              quote={getQuote(market.market)}
              volumeMax={data.max}
              setCurrentValue={setSelected}
            />
          </div>
          <ExtraColumn >
            <PriceLegend lastPrice={data.lastPrice} quote={getQuote(market.market)} />
            <DataBox
              valueSize="14px"
              valueType="currency"
              valueOpts={{ digits: 3 }}
              title="Average Daily Volume"
              value={data.avgvol}
            />
            <VolumeLegend peak={data.peak} currentValue={selected} />
          </ExtraColumn>
        </FlexRowWrap>
      </Card>
    </Wrapper>
  ) : (
    <Spinner />
  );
};

const ExtraColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 120px;
  border-top: 1px solid #787c8b;
`;


const getQuote = m => m.split('_')[1];

const MarketSelector = ({ tickers, current, setMarket }) => {
  const markets = _(tickers)
    .groupBy('exchange')
    .value();
  const pairs = markets[current.exchange].map(i => i.pair).sort();
  const exchanges = Object.keys(markets).sort();
  return (
    <Row>
      <Row>
        {pairs.map((p, i) => {
          return (
            <Button
              key={i}
              text={p}
              active={current.market === p}
              onClick={ev => setMarket({ exchange: current.exchange, market: p })}
            >
              {p.replace('_', '/')}
            </Button>
          );
        })}
      </Row>
      <Divider />
      <Row>
        {exchanges.map((e, i) => {
          return (
            <Button
              key={i}
              text={e}
              active={current.exchange === e}
              onClick={ev => setMarket({ exchange: e, market: markets[e][0].pair })}
            >
              {marketNames[e] || e}
            </Button>
          );
        })}
      </Row>
    </Row>
  );
};

const PriceLegend = ({ lastPrice, quote }) => {
  return (
    <FlexColumn height={170} borderBottom="1px solid #787c8b" justifyContent="space-evenly">
      <DataBox
        valueType="currency-flex"
        valueOpts={{ dim: 0, digits: 4, sym: quote }}
        title="Last Price"
        value={lastPrice.close}
      />
      <DataBox
        valueType="currency-flex"
        valueOpts={{ dim: 0, digits: 4, sym: quote }}
        title="Open Price Today"
        value={lastPrice.open}
      />
      <DataBox
        valueType="currency-flex"
        valueOpts={{ dim: 0, digits: 4, sym: quote }}
        title="Highest Price Today"
        value={lastPrice.high}
      />
      <DataBox
        valueType="currency-flex"
        valueOpts={{ dim: 0, digits: 4, sym: quote }}
        title="Lowest Price Today"
        value={lastPrice.low}
      />
    </FlexColumn>
  );
};

const VolumeLegend = ({ peak, currentValue }) => {
  return (
    <FlexColumnSpaceAround
      height={130}
      borderTop="1px solid #787c8b"
      borderBottom="1px solid #787c8b"
    >
      <DataBox value={peak} valueType="text" title="Peak Trading Hours" />
    </FlexColumnSpaceAround>
  );
};
const Wrapper = styled.div`
  min-width: 300px;
`;

const Button = styled.button`
  cursor: pointer;
  border: 0 none;
  color: #eee;
  background-color: ${props => (props.active ? '#6f7482' : '#525662')};
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 10px;
  text-align: center;
  width: fit-content;
  height: fit-content;
  margin-left: 5px;
  &:hover {
    background-color: #747988;
    color: #fff;
  }
  &:first-child {
    margin-left: 0;
  }
`;

const Divider = styled.span`
  margin: 0 5px;
  border-left: 1px solid #666;
`;

export default PriceWithVolume;
