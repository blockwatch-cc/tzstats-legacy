import React from 'react';
import { Spinner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails, Blockies, NoDataFound, Value } from '../../../Common';
import { getShortHashOrBakerName, formatValue } from '../../../../utils';
import { opNames } from '../../../../config';
import { Link } from 'react-router-dom';
import { getAccountOperations } from '../../../../services/api/tz-stats';
import TxTypeIcon from '../../../Common/TxTypeIcon';

const TransactionTable = ({ account, incoming, type = 'transaction' }) => {
  const direction = incoming ? 'receiver' : 'sender';
  const id = type+'-'+direction;
  const [data, setData] = React.useState({table:[], isLoaded: false, cursor: 0, eof: false, id: id });
  useInfiniteScroll(fetchMoreOperations, id);

  async function fetchMoreOperations() {
    if (data.eof) { return; }
    let newOps = await getAccountOperations({
      address: account.address,
      type: type,
      direction: direction,
      order: 'desc',
      cursor: data.cursor
    });
    let eof = !newOps.length;
    setData({
      table: [...data.table, ...newOps],
      isLoaded: true,
      cursor: eof?data.cursor:newOps[newOps.length-1].row_id,
      eof: eof,
      id: id
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let ops = await getAccountOperations({
        address: account.address,
        type: type,
        order: 'desc',
        direction: direction
      });
      let eof = !ops.length;
      setData({
        table: ops,
        isLoaded: true,
        cursor: !eof?ops[ops.length-1].row_id:0,
        eof: eof,
        id: id
      });
    };
    fetchData();
    return function cleanup() {
      setData({
        table: [],
        isLoaded: false,
        cursor: 0,
        eof: false,
        id: id
      });
    };
  }, [account.address, account.last_seen, type, direction, id]);

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
        <TableHeaderCell width={18}>{incoming?'Sender':'Receiver'}</TableHeaderCell>
        <TableHeaderCell width={15}>Amount</TableHeaderCell>
        {!incoming?<TableHeaderCell width={20}>Fee / Burn</TableHeaderCell>:''}
        <TableHeaderCell width={20}>Date</TableHeaderCell>
        <TableHeaderCell width={8}>Block</TableHeaderCell>
        <TableHeaderCell width={15}>Hash</TableHeaderCell>
      </TableHeader>
      <TableBody id={data.id}>
        {data.isLoaded ? (
          data.table && data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i} color={item.is_success?'inherit':'#ED6290'}>
                  <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                  { incoming ? (
                    <TableCell width={18}>
                      <Blockies hash={item.sender} />
                      <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.sender}`}>{getShortHashOrBakerName(item.sender)}</Link>
                    </TableCell>
                    ) : (
                    <TableCell width={18}>
                      <Blockies hash={item.receiver} />
                      <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.receiver}`}>{getShortHashOrBakerName(item.receiver)}</Link>
                    </TableCell>
                  )}
                  <TableCell width={15}><Value value={item.volume} type="currency" digits={0} zero="-"/></TableCell>
                  { !incoming ? (
                    <TableCell width={20}>
                      <Value value={item.fee>0?item.fee:0} type="currency" digits={0} zero="-"/>
                      &nbsp;/&nbsp;
                      <Value value={item.burned} type="currency" digits={0} zero="-"/>
                    </TableCell>
                    ) : ''
                  }
                  <TableCell width={20}><Value value={item.time} type="datetime"/></TableCell>
                  <TableCell width={8}>
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.height}`}>{formatValue(item.height)}</Link>
                  </TableCell>
                  <TableCell width={15}>
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.hash}`}>{getShortHashOrBakerName(item.hash)}</Link>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <NoDataFound />
          )
      ) : (
          <Spinner />
      )}
      </TableBody>
    </>
  );
};

const OtherTable = ({ data, account }) => {
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={3}>No</TableHeaderCell>
        <TableHeaderCell width={5}>Type</TableHeaderCell>
        <TableHeaderCell width={20}>Receiver</TableHeaderCell>
        <TableHeaderCell width={22}>Fee / Burn</TableHeaderCell>
        <TableHeaderCell width={20}>Date</TableHeaderCell>
        <TableHeaderCell width={10}>Block</TableHeaderCell>
        <TableHeaderCell width={20}>Hash</TableHeaderCell>
      </TableHeader>
      <TableBody id={data.id}>
        {data.isLoaded ? (
          data.table && data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i} color={item.is_success?'inherit':'#ED6290'}>
                  <TableCell width={3}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={5} title={(item.is_success?'':'Failed ')+opNames[item.type]}>
                    <TxTypeIcon isSuccess={item.is_success} type={item.type} />
                  </TableCell>
                  {item.delegate||item.receiver ? (
                    <TableCell width={20}>
                      <Blockies hash={item.delegate||item.receiver} />
                      <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.delegate||item.receiver}`}>{getShortHashOrBakerName(item.delegate||item.receiver)}</Link>
                    </TableCell>
                  ) : (
                    <TableCell width={20}>-</TableCell>
                  )}
                  <TableCell width={22}>
                    <Value value={item.fee>0?item.fee:0} type="currency" digits={0} zero="-"/>
                    &nbsp;/&nbsp;
                    <Value value={item.burned} type="currency" digits={0} zero="-"/>
                  </TableCell>
                  <TableCell width={20}><Value value={item.time} type="datetime"/></TableCell>
                  <TableCell width={10}>
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.height}`}>{formatValue(item.height)}</Link>
                  </TableCell>
                  <TableCell width={20}>
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.hash}`}>{getShortHashOrBakerName(item.hash)}</Link>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <NoDataFound />
         )
      ) : (
          <Spinner />
      )}
      </TableBody>
    </>
  );
};

export default TransactionTable;
