import React from 'react';
import styled from 'styled-components';
import { Spiner } from '../../../../components/Common';
import { Blockies, DataBox, NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails } from '../../../Common';
import { timeAgo, getShortHashOrBakerName, formatCurrency } from '../../../../utils';
import { getTableDataByType } from '../../../../services/api/tz-stats';
import { Link } from 'react-router-dom';
import TxTypeIcon from '../../../Common/TxTypeIcon';
import { timeFormat } from 'd3-time-format';

const AccountManagmentTable = ({ account }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let acc = await getTableDataByType({
        address: account.address,
        type: 'managed',
        limit: account.n_origination
      });
      setData({table: acc, isLoaded: true});
    };
    if (account.n_origination) {
      fetchData();
    } else {
      setData({isLoaded: true});
    }
  }, [account]);

  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={15}>Account</TableHeaderCell>
        <TableHeaderCell width={15}>Created</TableHeaderCell>
        <TableHeaderCell width={15}>Last Seen</TableHeaderCell>
        <TableHeaderCell width={20}>Balance</TableHeaderCell>
        <TableHeaderCell width={20}>Delegate</TableHeaderCell>
        <TableHeaderCell width={10}>Status</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'account-managed'}>
          {data.table && data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={15}>
                    <Blockies hash={item.account} />
                    <Link to={`/account/${item.account}`}>{getShortHashOrBakerName(item.account)}</Link>
                  </TableCell>
                  <TableCell width={15}>
                    <DataBox title={timeFormat('%b %d, %H:%M')(item.first_in_time)} />
                  </TableCell>
                  <TableCell width={15}>
                    <DataBox title={timeFormat('%b %d, %H:%M')(item.last_seen_time)} />
                  </TableCell>
                  <TableCell width={20}>{formatCurrency(item.spendable_balance)}</TableCell>
                  {item.delegate?(
                    <TableCell width={20}>
                      <Blockies hash={item.delegate} />
                      <Link to={`/account/${item.delegate}`}>{getShortHashOrBakerName(item.delegate)}</Link>
                    </TableCell>
                  ) : (
                    <TableCell width={20}>-</TableCell>
                  )}
                  <TableCell width={10}>{item.is_active ? 'Active' : 'Inactive'}</TableCell>
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

export default AccountManagmentTable;
