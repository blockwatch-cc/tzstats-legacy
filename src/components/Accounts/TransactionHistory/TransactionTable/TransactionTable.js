import React from 'react';
import styled from 'styled-components';
import { Spiner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails, Blockies, NoDataFound } from '../../../Common';
import { timeAgo, getShortHashOrBakerName, formatCurrency } from '../../../../utils';
import { opNames } from '../../../../config';
import { Link } from 'react-router-dom';
import { getAccountOperations } from '../../../../services/api/tz-stats';
import TxTypeIcon from '../../../Common/TxTypeIcon';

const TransactionTable = ({ account, incoming, type = 'transaction' }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false, cursor: 0, eof: false });
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOperations, 'account-operations');

  async function fetchMoreOperations() {
    if (data.eof) { return; }
    let newOps = await getAccountOperations({
      address: account.address,
      type: type,
      direction: incoming ? 'receiver' : 'sender',
      cursor: data.cursor
    });
    let eof = !newOps.length;
    setData({
      table: [...data.table, ...newOps],
      isLoaded: true,
      cursor: eof?data.cursor:newOps[0].row_id,
      eof: eof
    });
    setIsFetching(false);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let ops = await getAccountOperations({
        address: account.address,
        type: type,
        direction: incoming ? 'receiver' : 'sender'
      });
      ops = ops.reverse();
      setData({
        table: ops,
        isLoaded: true,
        cursor: ops.length?ops[0].row_id:0,
        eof: !ops.length
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
  }, [account, type, incoming]);

  switch (type) {
    case 'transaction':
      return <TxTable data={data} account={account} incoming={incoming} />
    default:
      return <OtherTable data={data} account={account} incoming={incoming} />
  }
};

const TxTable = ({ data, account, incoming }) => {
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={25}>Details</TableHeaderCell>
        <TableHeaderCell width={20}>{incoming?'From':'To'}</TableHeaderCell>
        <TableHeaderCell width={20}>Amount</TableHeaderCell>
        <TableHeaderCell width={20}>Fees</TableHeaderCell>
        <TableHeaderCell width={10}>Hash</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'account-operations'}>
          {data.table && data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={25}>
                    <TxTypeIcon isSuccess={item.is_success} type={item.op_type} />
                    <TableDetails>{`${opNames[item.op_type]} ${timeAgo.format(new Date(item.time))}`}</TableDetails>
                  </TableCell>
                  { incoming ? (
                    <TableCell width={20}>
                      <Blockies hash={item.sender} />
                      <Link to={`/account/${item.sender}`}>{getShortHashOrBakerName(item.sender)}</Link>
                    </TableCell>
                    ) : (
                    <TableCell width={20}>
                      <Blockies hash={item.receiver} />
                      <Link to={`/account/${item.receiver}`}>{getShortHashOrBakerName(item.receiver)}</Link>
                    </TableCell>
                  )}
                  <TableCell width={20}>{`${formatCurrency(item.volume)}`}</TableCell>
                  <TableCell width={20}>{`${formatCurrency(item.fee)}`}</TableCell>
                  <TableCell width={10}>
                    <Link to={`/operation/${item.op_hash}`}>{getShortHashOrBakerName(item.op_hash)}</Link>
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
          <Spiner />
        </TableBody>
      )}
    </>
  );
};

const OtherTable = ({ data, account }) => {
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={25}>Details</TableHeaderCell>
        <TableHeaderCell width={20}>From</TableHeaderCell>
        <TableHeaderCell width={20}>To</TableHeaderCell>
        <TableHeaderCell width={20}>Fees</TableHeaderCell>
        <TableHeaderCell width={10}>Hash</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'account-operations'}>
          {data.table && data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={25}>
                    <TxTypeIcon isSuccess={item.is_success} type={item.op_type} />
                    <TableDetails>{`${opNames[item.op_type]} ${timeAgo.format(new Date(item.time))}`}</TableDetails>
                  </TableCell>
                  <TableCell width={20}>
                    <Blockies hash={item.sender} />
                    <Link to={`/account/${item.sender}`}>{getShortHashOrBakerName(item.sender)}</Link>
                  </TableCell>
                  {item.receiver ? (
                    <TableCell width={20}>
                      <Blockies hash={item.receiver} />
                      <Link to={`/account/${item.receiver}`}>{getShortHashOrBakerName(item.receiver)}</Link>
                    </TableCell>
                  ) : (
                    <TableCell width={20}>-</TableCell>
                  )}
                  <TableCell width={20}>{`${formatCurrency(item.fee)}`}</TableCell>
                  <TableCell width={10}>
                    <Link to={`/operation/${item.op_hash}`}>{getShortHashOrBakerName(item.op_hash)}</Link>
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
          <Spiner />
        </TableBody>
      )}
    </>
  );
};

export default TransactionTable;
