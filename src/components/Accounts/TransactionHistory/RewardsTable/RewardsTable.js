import React from 'react';
import { Spiner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, Value } from '../../../Common';
import { getAccountIncome } from '../../../../services/api/tz-stats';
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
  'slashed_income',
  'luck_percent',
  'efficiency_percent',
];

const RewardsTable = ({ account }) => {
  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');
  const [data, setData] = React.useState({ table: [], isLoaded: false, cursor: 0, eof: false });
  useInfiniteScroll(fetchMoreOperations, 'income');

  async function fetchMoreOperations() {
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

  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>Cycle</TableHeaderCell>
        <TableHeaderCell width={8}>Status</TableHeaderCell>
        <TableHeaderCell width={8}>Baking</TableHeaderCell>
        <TableHeaderCell width={11}>Endorsing</TableHeaderCell>
        <TableHeaderCell width={10}>Extra</TableHeaderCell>
        <TableHeaderCell width={10}>Fees</TableHeaderCell>
        <TableHeaderCell width={10}>Slashed</TableHeaderCell>
        <TableHeaderCell width={13}>Luck/Efficiency</TableHeaderCell>
        <TableHeaderCell width={10}>Delegators</TableHeaderCell>
        <TableHeaderCell width={5}>Split</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'income'}>
          {data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i} color={item.color}>
                  <TableCell width={5}><Value value={item.cycle} type="value-full"/></TableCell>
                  <TableCell width={8}>{item.status}</TableCell>
                  <TableCell width={8}><Value value={item.baking_income} type="currency" digits={0} zero="-"/></TableCell>
                  <TableCell width={11}><Value value={item.endorsing_income} type="currency" digits={0} zero="-"/></TableCell>
                  <TableCell width={10}><Value value={item.seed_income + item.double_baking_income + item.double_endorsing_income} type="currency" digits={0} zero="-"/></TableCell>
                  <TableCell width={10}><Value value={item.fees_income} type="currency" digits={0} zero="-"/></TableCell>
                  <TableCell width={10}><Value value={item.slashed_income} type="currency" digits={0} zero="-"/></TableCell>
                  <TableCell width={13}>
                    <Value value={item.luck_percent/100} type="percent" digits={2} zero="-"/>
                    /
                    <Value value={item.efficiency_percent/100} type="percent" digits={2} zero="-"/>
                  </TableCell>
                  <TableCell width={10}><Value value={item.n_delegations} type="value-full" zero="-"/></TableCell>
                  <TableCell width={5}>&raquo;</TableCell>
                </TableRow>
              );
            })
          ) : (
            <NoDataFound />
          )}
        </TableBody>
      ) : (
        <TableBody>
          <Spiner />
        </TableBody>
      )}
    </>
  );
};

export default RewardsTable;
