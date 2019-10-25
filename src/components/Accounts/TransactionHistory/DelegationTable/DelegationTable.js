import React from 'react';
import { Spinner } from '../../../../components/Common';
import { Blockies, NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails, Value } from '../../../Common';
import { getShortHash } from '../../../../utils';
import { getTableDataByType } from '../../../../services/api/tz-stats';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const DelegationTable = ({ account }) => {
  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');
  const [data, setData] = React.useState({ table: [], isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let ops = await getTableDataByType({
        type: 'delegation',
        address: account.address,
        cycle: chain.cycle,
        limit: account.active_delegations+1, // include self
      });
      let self = ops.findIndex(i => i.address === account.address);
      let bal = ops[self].delegated_balance;
      ops.splice(self, 1);
      ops.forEach(i => i.balance = i.spendable_balance+i.unclaimed_balance);
      ops = ops.sort((a, b) => b.balance - a.balance);
      setData({
        table: ops,
        delegated: bal,
        isLoaded: true,
      });
    };
    fetchData();
    return function cleanup() {
      setData({
        table: [],
        isLoaded: false
      });
    };
  }, [account.address, account.active_delegations, account.n_delegations, chain.cycle]);

  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={15}>Address</TableHeaderCell>
        <TableHeaderCell width={10}>Cycle</TableHeaderCell>
        <TableHeaderCell width={20}>Since</TableHeaderCell>
        <TableHeaderCell width={20}>Balance</TableHeaderCell>
        <TableHeaderCell width={20}>Share</TableHeaderCell>
        <TableHeaderCell width={5}></TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'account-operations'}>
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
                  <TableCell width={10}><Value value={item.delegated_since/config.blocks_per_cycle} type="value-full" round={true}/></TableCell>
                  <TableCell width={20}><Value value={item.delegated_since_time} type="datetime"/></TableCell>
                  <TableCell width={20}><Value value={item.balance} type="currency" digits={0} zero="-"/></TableCell>
                  <TableCell width={20}>
                    <Value type="percent" prec={6} digits={3} zero='-' value={item.balance / data.delegated}/>
                  </TableCell>
                  <TableCell width={5}></TableCell>
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

export default DelegationTable;
