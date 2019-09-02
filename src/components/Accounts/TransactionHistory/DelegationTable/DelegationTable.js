import React from 'react';
import { Spiner } from '../../../../components/Common';
import { Blockies, NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails } from '../../../Common';
import { formatCurrency, getShortHash, formatDayTime } from '../../../../utils';
import { getTableDataByType } from '../../../../services/api/tz-stats';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const DelegationTable = ({ account }) => {
  const [chain] = useGlobal('chain');
  const [data, setData] = React.useState({ table: [], isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let ops = await getTableDataByType({
        type: 'delegation',
        address: account.address,
        cycle: chain.cycle,
        limit: account.total_delegations,
      });
      ops = ops.sort((a, b) => b.balance - a.balance);
      setData({
        table: ops,
        isLoaded: true,
      });
    };
    fetchData();
  }, [account, chain]);

  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={15}>Account</TableHeaderCell>
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
                    <Blockies hash={item.account} />
                    <Link to={`/account/${item.account}`}>{getShortHash(item.account)}</Link>
                  </TableCell>
                  <TableCell width={20}>{formatDayTime(item.since_time,1,1)}</TableCell>
                  <TableCell width={20}>{formatCurrency(item.balance)}</TableCell>
                  <TableCell width={20}>
                    {`${((item.balance / account.delegated_balance) * 100).toFixed(3)}%`}
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
          <Spiner />
        </TableBody>
      )}
    </>
  );
};

export default DelegationTable;
