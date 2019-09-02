import React from 'react';
import { Spiner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails, Blockies, NoDataFound } from '../../../Common';
import { formatDayTime, getShortHashOrBakerName, formatCurrency, formatValue } from '../../../../utils';
import { opNames } from '../../../../config';
import { Link } from 'react-router-dom';
import { getAccountOperations } from '../../../../services/api/tz-stats';
import TxTypeIcon from '../../../Common/TxTypeIcon';

const TransactionTable = ({ account, incoming, type = 'transaction' }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false, cursor: 0, eof: false });
  const [, setIsFetching] = useInfiniteScroll(fetchMoreOperations, 'account-operations');

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
      return <TxTable data={data} account={account} incoming={incoming} />;
    default:
      return <OtherTable data={data} account={account} incoming={incoming} />;
  }
};

const TxTable = ({ data, account, incoming }) => {
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={15}>{incoming?'From':'To'}</TableHeaderCell>
        <TableHeaderCell width={15}>Amount</TableHeaderCell>
        <TableHeaderCell width={10}>Fees</TableHeaderCell>
        <TableHeaderCell width={20}>Date</TableHeaderCell>
        <TableHeaderCell width={10}>Block</TableHeaderCell>
        <TableHeaderCell width={10}>Hash</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'account-operations'}>
          {data.table && data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                  { incoming ? (
                    <TableCell width={15}>
                      <Blockies hash={item.sender} />
                      <Link to={`/account/${item.sender}`}>{getShortHashOrBakerName(item.sender)}</Link>
                    </TableCell>
                    ) : (
                    <TableCell width={15}>
                      <Blockies hash={item.receiver} />
                      <Link to={`/account/${item.receiver}`}>{getShortHashOrBakerName(item.receiver)}</Link>
                    </TableCell>
                  )}
                  <TableCell width={15}>{`${formatCurrency(item.volume)}`}</TableCell>
                  <TableCell width={10}>{`${formatCurrency(item.fee)}`}</TableCell>
                  <TableCell width={20}>{`${formatDayTime(item.time,1,1)}`}</TableCell>
                  <TableCell width={10}><Link to={`/block/${item.height}`}>{formatValue(item.height)}</Link></TableCell>
                  <TableCell width={10}>
                    <Link to={`/operation/${item.hash}`}>{getShortHashOrBakerName(item.hash)}</Link>
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
        <TableHeaderCell width={12}>Type</TableHeaderCell>
        <TableHeaderCell width={12}>From</TableHeaderCell>
        <TableHeaderCell width={12}>To</TableHeaderCell>
        <TableHeaderCell width={12}>Amount</TableHeaderCell>
        <TableHeaderCell width={11}>Fees</TableHeaderCell>
        <TableHeaderCell width={18}>Date</TableHeaderCell>
        <TableHeaderCell width={8}>Block</TableHeaderCell>
        <TableHeaderCell width={10}>Hash</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'account-operations'}>
          {data.table && data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={12}>
                    <TxTypeIcon isSuccess={item.is_success} type={item.type} />
                    <TableDetails>{`${opNames[item.type]}`}</TableDetails>
                  </TableCell>
                  <TableCell width={12}>
                    <Blockies hash={item.sender} />
                    <Link to={`/account/${item.sender}`}>{getShortHashOrBakerName(item.sender)}</Link>
                  </TableCell>
                  {item.receiver ? (
                    <TableCell width={12}>
                      <Blockies hash={item.receiver} />
                      <Link to={`/account/${item.receiver}`}>{getShortHashOrBakerName(item.receiver)}</Link>
                    </TableCell>
                  ) : (
                    <TableCell width={12}>-</TableCell>
                  )}
                  <TableCell width={12}>{(item.volume||item.reward)?formatCurrency(item.volume||item.reward):'-'}</TableCell>
                  <TableCell width={11}>{item.fee?formatCurrency(item.fee):'-'}</TableCell>
                  <TableCell width={18}>{`${formatDayTime(item.time,1,1)}`}</TableCell>
                  <TableCell width={8}><Link to={`/block/${item.height}`}>{formatValue(item.height)}</Link></TableCell>
                  <TableCell width={10}>
                    <Link to={`/operation/${item.hash}`}>{getShortHashOrBakerName(item.hash)}</Link>
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
