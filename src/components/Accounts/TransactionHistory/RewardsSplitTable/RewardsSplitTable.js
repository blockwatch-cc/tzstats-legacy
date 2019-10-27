import React from 'react';
import { Spinner } from '../../../../components/Common';
import { Blockies, NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails, Value, Error } from '../../../Common';
import { getShortHash } from '../../../../utils';
import { getSnapshotDelegators } from '../../../../services/api/tz-stats';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const RewardsSplitTable = ({ account, income, back }) => {
  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');
  const [data, setData] = React.useState({ table: [], isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let dlgs = await getSnapshotDelegators({
          address: account.address,
          cycle: income.cycle - config.preserved_cycles - 2,
          limit: 50000, // need all for sorting
        });
        let self = dlgs.findIndex(i => i.address === account.address);
        let own = dlgs[self].balance;
        let staking = dlgs[self].balance+dlgs[self].delegated;
        dlgs.splice(self, 1);
        dlgs = dlgs.sort((a, b) => b.balance - a.balance);
        setData({
          table: dlgs,
          staking: staking,
          own: own,
          income: (income.cycle < chain.cycle ? income.total_income : Math.max(income.total_income, income.expected_income)) - income.total_lost,
          isLoaded: true,
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
        isLoaded: false
      });
    };
  }, [account.address, income, chain.cycle, config.preserved_cycles]);

  switch (true) {
  case !data.isLoaded:
    return <><TableHeader/><TableBody><Spinner /></TableBody></>;
  case !!data.error:
    return <Error err={data.error} />;
  default:
    return (
    <>
      <h4 style={{marginTop:0, fontWeight: 300}}>
        <span style={{marginRight: 5, cursor:'pointer'}} onClick={(e) => { back(); }} >&laquo;</span>
        {income.cycle<chain.cycle?'Final':'Tentative'} Reward Split for Cycle {income.cycle}: {income.cycle<chain.cycle?'Total':'Expected'} Income <Value value={data.income} type="currency" digits={0} zero="-"/>, Baker Share <Value value={data.income * (data.own / data.staking)} type="currency" digits={0} prec={6} zero="-"/> / <Value type="percent" prec={6} digits={3} zero='-' value={data.own / data.staking}/> (0% fee assumed)
      </h4>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={15}>Delegator</TableHeaderCell>
        <TableHeaderCell width={20}>Since</TableHeaderCell>
        <TableHeaderCell width={15}>Balance</TableHeaderCell>
        <TableHeaderCell width={15}>Share</TableHeaderCell>
        <TableHeaderCell width={15}>Amount</TableHeaderCell>
      </TableHeader>
      <TableBody id={'reward-split'}>
        {data.table.length ? (
          data.table.map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell width={5}>
                  <TableDetails>{i + 1}</TableDetails>
                </TableCell>
                <TableCell width={15}>
                  <Blockies hash={item.address} />
                  <Link to={`/${item.address}`}>{getShortHash(item.address)}</Link>
                </TableCell>
                <TableCell width={20}><Value value={item.since_time} type="datetime"/></TableCell>
                <TableCell width={15}><Value value={item.balance} type="currency" digits={0} zero="-"/></TableCell>
                <TableCell width={15}>
                  <Value type="percent" prec={6} digits={3} zero='-' value={item.balance / data.staking}/>
                </TableCell>
                <TableCell width={15}><Value value={data.income * (item.balance / data.staking)} type="currency" digits={0} prec={6} zero="-"/></TableCell>
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

export default RewardsSplitTable;
