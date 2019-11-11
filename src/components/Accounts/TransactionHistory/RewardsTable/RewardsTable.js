import React from 'react';
import { Spinner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, Value, Error} from '../../../Common';
import { getAccountIncome } from '../../../../services/api/tz-stats';
import RewardsSplitTable  from '../RewardsSplitTable';
import { useGlobal } from 'reactn';

function setStatus(income, cycle, config) {
  income.forEach((item) => {
    switch (true) {
    case item.cycle < cycle - config.preserved_cycles:
      item.status = 'Unfrozen';
      item.color = 'inherit';
      break;
    case item.cycle < cycle:
      item.status = 'Frozen';
      item.color = '#26B2EE';
      break;
    case item.cycle === cycle:
      item.status = 'Active';
      item.color = 'inherit';
      break;
    default:
      item.status = 'Pending';
      item.color = 'rgba(255, 255, 255, 0.52)';
    }
  });
}

const columns = [
  'row_id',
  'cycle',
  'n_delegations',
  'baking_income',
  'endorsing_income',
  'fees_income',
  'seed_income',
  'double_baking_income',
  'double_endorsing_income',
  'total_income',
  'expected_income',
  'total_lost',
  'lost_accusation_fees',
  'lost_accusation_rewards',
  'lost_accusation_deposits',
  'lost_revelation_fees',
  'lost_revelation_rewards',
  'luck_percent',
  'performance_percent',
];

const RewardsTable = ({ account }) => {
  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');
  const [data, setData] = React.useState({ table: [], isLoaded: false, cursor: 0, eof: false });
  useInfiniteScroll(fetchMore, 'income');

  function showSplit(item) {
    setData(data => {
      return {
        showSplit: true,
        selected: item,
        table: data.table,
        isLoaded: data.isLoaded,
        cursor: data.cursor,
        eof: data.eof,
      };
    })
  }

  function hideSplit() {
    setData(data => {
      return {
        showSplit: false,
        selected: null,
        table: data.table,
        isLoaded: data.isLoaded,
        cursor: data.cursor,
        eof: data.eof,
      };
    })
  }

  async function fetchMore() {
    if (data.eof) { return; }
    let more = await getAccountIncome({
      address: account.address,
      order: 'desc',
      columns: columns,
      cursor: data.cursor
    });
    let eof = !more.length;
    setStatus(more, chain.cycle, config);
    setData({
      table: [...data.table, ...more],
      isLoaded: true,
      cursor: eof?data.cursor:more.slice(-1)[0].row_id,
      eof: eof
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let income = await getAccountIncome({
          address: account.address,
          columns: columns,
          order: 'desc'
        });
        let eof = !income.length;
        setStatus(income, chain.cycle, config);
        setData({
          table: income,
          isLoaded: true,
          cursor: !eof?income.slice(-1)[0].row_id:0,
          eof: eof,
        });
      } catch (e) {
        switch (e.status) {
        case 502:
        case 504:
          return;
        default:
          setData({
            isLoaded: true,
            error: e
          });
        }
      }
    };
    fetchData();
    return function cleanup() {
      setData({
        table: [],
        isLoaded: false,
        cursor: 0,
        eof: false
      });
    };
  }, [account.address, account.last_seen, chain.cycle, config]);

  switch (true) {
  case !data.isLoaded:
    return <><TableHeader/><TableBody><Spinner /></TableBody></>;
  case !!data.error:
    return <Error err={data.error} />;
  case data.showSplit:
    return <RewardsSplitTable account={account} income={data.selected} back={hideSplit}/>;
  default:
    return (
      <>
      <TableHeader>
        <TableHeaderCell width={5}>Cycle</TableHeaderCell>
        <TableHeaderCell width={8}>Status</TableHeaderCell>
        <TableHeaderCell width={11}>Baking</TableHeaderCell>
        <TableHeaderCell width={11}>Endorsing</TableHeaderCell>
        <TableHeaderCell width={10}>Extra</TableHeaderCell>
        <TableHeaderCell width={10}>Fees</TableHeaderCell>
        <TableHeaderCell width={10}>Slashed</TableHeaderCell>
        <TableHeaderCell width={15}>Luck/Efficiency</TableHeaderCell>
        <TableHeaderCell width={9}>Delegators</TableHeaderCell>
        <TableHeaderCell width={5}>Split</TableHeaderCell>
      </TableHeader>
      <TableBody id={'income'}>
      {data.table.length ? (
        data.table.map((item, i) => {
          return (
            <TableRow key={i} color={item.color}>
              <TableCell width={5}><Value value={item.cycle} type="value-full"/></TableCell>
              <TableCell width={8}>{item.status}</TableCell>
              <TableCell width={11}><Value value={item.baking_income} type="currency" digits={0} zero="-"/></TableCell>
              <TableCell width={11}><Value value={item.endorsing_income} type="currency" digits={0} zero="-"/></TableCell>
              <TableCell width={10}><Value value={item.seed_income + item.double_baking_income + item.double_endorsing_income} type="currency" digits={0} zero="-"/></TableCell>
              <TableCell width={10}><Value value={item.fees_income} type="currency" digits={0} zero="-"/></TableCell>
              <TableCell width={10}><Value value={item.total_lost} type="currency" digits={0} zero="-"/></TableCell>
              <TableCell width={15}>
                <Value value={item.luck_percent/100} type="percent" digits={2} zero="-"/>
                &nbsp;/&nbsp;
                <Value value={item.performance_percent/100} type="percent" digits={2} zero="-"/>
              </TableCell>
              <TableCell width={9}><Value value={item.n_delegations} type="value-full" zero="-"/></TableCell>
              <TableCell style={{cursor:'pointer'}} width={5} onClick={(e) => { showSplit(item); }} >&raquo;</TableCell>
            </TableRow>
          );
        })
      ) : (
        <NoDataFound />
      )}
      </TableBody>
      </>
    );
  }
};

export default RewardsTable;
