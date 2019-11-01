import React from 'react';
import { Spinner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, Value } from '../../../Common';
import { getAccountIncome, zeroIncome } from '../../../../services/api/tz-stats';
import { useGlobal } from 'reactn';

const losses = ['lost_accusation_fees', 'lost_accusation_rewards', 'lost_revelation_fees', 'lost_revelation_rewards'];

function updateStatus(income, cycle, config, balance) {
  let j = 0;
  for (var i = income.length - 1; i >= 0; j++ && i--) {
    let item = income[i];
    let iplus5 = j > 5 ? income[i + 5] : zeroIncome(i + 5, columns);
    let share = j > 5 ? iplus5.balance / (iplus5.balance + iplus5.delegated) : 0;
    switch (true) {
      case item.cycle < cycle - config.preserved_cycles:
        item.status = 'Unfrozen';
        item.color = 'inherit';
        item.projected_balance = 0;
        item.available_balance = 0;
        break;
      case item.cycle < cycle:
        item.status = 'Frozen';
        item.color = '#26B2EE';
        item.projected_balance = 0;
        item.available_balance = 0;
        break;
      case item.cycle === cycle:
        item.status = 'Active';
        item.color = 'inherit';
        // console.log("Projecting cycle",item.cycle,"balance from spendable=", balance,
        //   "bond_diff=", item.expected_bonds - item.total_bonds,
        //   "unfreeze_bonds=", iplus5.total_bonds,
        //   "unfreeze_income=", iplus5.total_income,
        //   "unfreeze_income_share=", share,
        //   "unfreeze_income_after_share=", iplus5.total_income * share
        // );
        item.projected_balance = balance - (item.expected_bonds - item.total_bonds);
        item.available_balance = item.projected_balance;
        if (item.projected_balance < 0) {
          item.projected_balance = 0;
          item.overdelegated = true;
          item.color = '#ED6290';
        }
        const unfreeze_bonds = iplus5.total_bonds - iplus5.lost_accusation_deposits;
        let unfreeze_rewards = iplus5.total_income;
        losses.forEach(n => {
          unfreeze_rewards -= iplus5[n];
        });
        item.projected_balance += unfreeze_bonds + unfreeze_rewards * share;
        break;
      default:
        item.status = 'Pending';
        item.color = 'rgba(255, 255, 255, 0.52)';
        // console.log("Projecting cycle",item.cycle,"balance from projected=", income[i+1].projected_balance,
        //   "bonds=", item.expected_bonds,
        //   "unfreeze_bonds=", iplus5.total_bonds,
        //   "unfreeze_income=", iplus5.total_income,
        //   "unfreeze_income_share=", share,
        //   "unfreeze_income_after_share=", iplus5.total_income * share
        // );
        // for new bakers during their vesting period, the income table is not filled
        const last_balance = income.length > i + 1 ? income[i + 1].projected_balance : balance;
        item.projected_balance = last_balance - item.expected_bonds;
        item.available_balance = item.projected_balance;
        if (item.projected_balance < 0) {
          item.projected_balance = 0;
          item.overdelegated = true;
          item.color = '#ED6290';
        }
        if (income.length > i + 5 && income[i + 5].cycle === cycle) {
          // current cycle is not finished yet, so our best guess is use max(total, expected)
          const unfreeze_bonds = Math.max(iplus5.total_bonds, iplus5.expected_bonds) - iplus5.lost_accusation_deposits;
          let unfreeze_rewards = Math.max(iplus5.total_income, iplus5.expected_income);
          losses.forEach(n => {
            unfreeze_rewards -= iplus5[n];
          });
          item.projected_balance += unfreeze_bonds + unfreeze_rewards * share;
        } else {
          const unfreeze_bonds = iplus5.total_bonds - iplus5.lost_accusation_deposits;
          let unfreeze_rewards = iplus5.total_income;
          losses.forEach(n => {
            unfreeze_rewards -= iplus5[n];
          });
          item.projected_balance += unfreeze_bonds + unfreeze_rewards * share;
        }
    }
  }
}

const columns = [
  'row_id',
  'cycle',
  'balance',
  'delegated',
  'expected_bonds',
  'expected_income',
  'total_bonds',
  'total_income',
  'total_lost',
  'n_baking_rights',
  'n_endorsing_rights',
  'lost_accusation_deposits',
  'lost_accusation_fees',
  'lost_accusation_rewards',
  'lost_revelation_fees',
  'lost_revelation_rewards',
];

const BondsTable = ({ account }) => {
  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');
  const [data, setData] = React.useState({ table: [], isLoaded: false, cursor: 0, eof: false });
  useInfiniteScroll(fetchMore, 'bonds');

  async function fetchMore() {
    if (data.eof) {
      return;
    }
    let more = await getAccountIncome({
      address: account.address,
      order: 'desc',
      columns: columns,
      cursor: data.cursor,
    });
    let eof = !more.length;
    let table = [...data.table, ...more];
    updateStatus(table, chain.cycle, config, account.spendable_balance);
    setData({
      table: table,
      isLoaded: true,
      cursor: eof ? data.cursor : more.slice(-1)[0].row_id,
      eof: eof,
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let income = await getAccountIncome({
        address: account.address,
        columns: columns,
        order: 'desc',
      });
      let eof = !income.length;
      updateStatus(income, chain.cycle, config, account.spendable_balance);
      setData({
        table: income,
        isLoaded: true,
        cursor: !eof ? income.slice(-1)[0].row_id : 0,
        eof: eof,
      });
    };
    fetchData();
    return function cleanup() {
      setData({
        table: [],
        isLoaded: false,
        cursor: 0,
        eof: false,
      });
    };
  }, [account.address, account.last_seen, account.spendable_balance, chain.cycle, config]);

  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>Cycle</TableHeaderCell>
        <TableHeaderCell width={8}>Status</TableHeaderCell>
        <TableHeaderCell width={10}>Staking</TableHeaderCell>
        <TableHeaderCell width={10}>Delegated</TableHeaderCell>
        <TableHeaderCell width={10}>Bake/Endorse Rights</TableHeaderCell>
        <TableHeaderCell width={10}>Expected Income</TableHeaderCell>
        <TableHeaderCell width={10}>Actual Income</TableHeaderCell>
        <TableHeaderCell width={10}>Expected Bonds</TableHeaderCell>
        <TableHeaderCell width={10}>Actual Bonds</TableHeaderCell>
        <TableHeaderCell width={10}>Projected Balance</TableHeaderCell>
        <TableHeaderCell width={10}>Available Balance</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'bonds'}>
          {data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i} color={item.color}>
                  <TableCell width={5}>
                    <Value value={item.cycle} type="value-full" />
                  </TableCell>
                  <TableCell width={8}>{item.status}</TableCell>
                  <TableCell width={10}>
                    <Value value={item.balance} type="currency-short" digits={0} zero="-" />
                  </TableCell>
                  <TableCell width={10}>
                    <Value value={item.delegated} type="currency-short" digits={0} zero="-" />
                  </TableCell>
                  <TableCell width={10}>
                    <Value value={item.n_baking_rights} zero="-" />/<Value value={item.n_endorsing_rights} zero="-" />
                  </TableCell>
                  <TableCell width={10}>
                    <Value value={item.expected_income} type="currency-short" digits={0} zero="-" />
                  </TableCell>
                  <TableCell width={10}>
                    <Value value={item.total_income - item.total_lost} type="currency-short" digits={0} zero="-" />
                  </TableCell>
                  <TableCell width={10}>
                    <Value value={item.expected_bonds} type="currency-short" digits={0} zero="-" />
                  </TableCell>
                  <TableCell width={10}>
                    <Value value={item.total_bonds} type="currency-short" digits={0} zero="-" />
                  </TableCell>
                  <TableCell width={10}>
                    <Value value={item.projected_balance} type="currency-short" zero="-" />
                  </TableCell>
                  <TableCell width={10}>
                    <Value value={item.available_balance} type="currency-short" zero="-" />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <NoDataFound />
          )}
        </TableBody>
      ) : (
        <TableBody>
          <Spinner />
        </TableBody>
      )}
    </>
  );
};

export default BondsTable;
