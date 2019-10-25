import React from 'react';
import { Spinner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, Value } from '../../../Common';
import { getAccountOperations } from '../../../../services/api/tz-stats';
import { getShortHash } from '../../../../utils';
import { Link } from 'react-router-dom';

const columns = [
  'row_id',
  'height',
  'cycle',
  'time',
  'hash',
  'data',
  'reward',
  'deposit',
];

function unpackSlots(ops) {
  ops.forEach(o => {
    o.slots = [];
    let mask = parseInt(o.data);
    for (var i = 0; i < 32; i++) {
      if (mask & 1) {
        o.slots.push(i+1);
      }
      mask >>= 1;
    }
  })
}

const EndorsingTable = ({ account }) => {
  const [data, setData] = React.useState({ table: [], isLoaded: false, cursor: 0, eof: false });
  useInfiniteScroll(fetchMoreOperations, 'endorsed');

  async function fetchMoreOperations() {
    if (data.eof) { return; }
    let more = await getAccountOperations({
      address: account.address,
      type: 'endorsement',
      order: 'desc',
      columns: columns,
      cursor: data.cursor
    });
    let eof = !more.length;
    unpackSlots(more);
    setData({
      table: [...data.table, ...more],
      isLoaded: true,
      cursor: eof?data.cursor:more.slice(-1)[0].row_id,
      eof: eof
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let ops = await getAccountOperations({
        address: account.address,
        type: 'endorsement',
        order: 'desc',
        columns: columns
      });
      let eof = !ops.length;
      unpackSlots(ops);
      setData({
        table: ops,
        isLoaded: true,
        cursor: !eof?ops.slice(-1)[0].row_id:0,
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
  }, [account.address, account.slots_endorsed]);


  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>Cycle</TableHeaderCell>
        <TableHeaderCell width={10}>For Block</TableHeaderCell>
        <TableHeaderCell width={10}>In Block</TableHeaderCell>
        <TableHeaderCell width={20}>Slots</TableHeaderCell>
        <TableHeaderCell width={10}>Rewards</TableHeaderCell>
        <TableHeaderCell width={10}>Deposits</TableHeaderCell>
        <TableHeaderCell width={20}>Date</TableHeaderCell>
        <TableHeaderCell width={10}>Hash</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'endorsed'}>
          {data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}><Value value={item.cycle} type="value-full"/></TableCell>
                  <TableCell width={10}>
                    <Link to={`/${item.height-1}`}><Value value={item.height-1} type="value-full"/></Link>
                  </TableCell>
                  <TableCell width={10}>
                    <Link to={`/${item.height}`}><Value value={item.height} type="value-full"/></Link>
                  </TableCell>
                  <TableCell width={20}>{item.slots.join(', ')}</TableCell>
                  <TableCell width={10}><Value value={item.reward||0} type="currency" digits={0} zero="-"/></TableCell>
                  <TableCell width={10}><Value value={item.deposit||0} type="currency" digits={0} zero="-"/></TableCell>
                  <TableCell width={20}><Value value={item.time} type="datetime"/></TableCell>
                  <TableCell width={10}>
                      <Link style={{color:item.is_orphan?'#ED6290':'inherit'}} to={`/${item.hash}`}>{getShortHash(item.hash)}</Link>
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

export default EndorsingTable;
