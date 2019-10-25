import React from 'react';
import { Spinner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, Value } from '../../../Common';
import { getAccountRights } from '../../../../services/api/tz-stats';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const columns = [
  'row_id',
  'type',
  'height',
  'cycle',
  'time',
  'priority',
  'is_lost',
  'is_stolen',
  'is_missed',
  'is_seed_required',
  'is_seed_revealed'
];

function setStatus(rights, height) {
  rights.forEach(item => {
    if (item.height <= height) {
      switch (true) {
      case item.is_lost:
        item.status = 'Lost';
        break;
      case item.is_stolen:
        item.status = 'Stolen';
        break;
      case item.is_missed:
        item.status = 'Missed';
        break;
      default:
        if (item.type === 'baking' && item.priority > 0) {
          item.status = 'Unused';
        } else {
          item.status = 'Claimed';
        }
      }
    } else {
      item.status = 'Pending';
    }
  })
}

const RightsTable = ({ account }) => {
  const [chain] = useGlobal('chain');
  const [data, setData] = React.useState({ table: [], isLoaded: false, cursor: 0, eof: false });
  const currentheight = chain.height;
  useInfiniteScroll(fetchMore, 'rights');

  async function fetchMore() {
    if (data.eof) { return; }
    let more = await getAccountRights({
      address: account.address,
      order: 'desc',
      columns: columns,
      cursor: data.cursor,
      limit: 500,
    });
    let eof = !more.length;
    setStatus(more, currentheight);
    setData({
      table: [...data.table, ...more],
      isLoaded: true,
      cursor: eof?data.cursor:more.slice(-1)[0].row_id,
      eof: eof
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let rights = await getAccountRights({
        address: account.address,
        columns: columns,
        order: 'desc',
        limit: 500,
      });
      let eof = !rights.length;
      setStatus(rights, currentheight);
      setData({
        table: rights,
        isLoaded: true,
        cursor: !eof?rights.slice(-1)[0].row_id:0,
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
  }, [account.address, currentheight]);


  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>Cycle</TableHeaderCell>
        <TableHeaderCell width={10}>Height</TableHeaderCell>
        <TableHeaderCell width={10}>Type</TableHeaderCell>
        <TableHeaderCell width={10}>Status</TableHeaderCell>
        <TableHeaderCell width={10}>Priority</TableHeaderCell>
        <TableHeaderCell width={10}>Slot</TableHeaderCell>
        <TableHeaderCell width={10}>Seed</TableHeaderCell>
        <TableHeaderCell width={20}>Date</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'rights'}>
          {data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}><Value value={item.cycle} type="value-full"/></TableCell>
                  <TableCell width={10}>
                    <Link to={`/${item.height}`}><Value value={item.height} type="value-full"/></Link>
                  </TableCell>
                  <TableCell width={10}>{item.type}</TableCell>
                  <TableCell width={10}>{item.status}</TableCell>
                  <TableCell width={10}>{item.type==='baking'?item.priority:'-'}</TableCell>
                  <TableCell width={10}>{item.type==='endorsing'?item.priority:'-'}</TableCell>
                  <TableCell width={10}>{item.seed_required?(item.seed_revealed?'Revealed':'Pending'):'-'}</TableCell>
                  <TableCell width={20}><Value value={item.time} type="datetime"/></TableCell>
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

export default RightsTable;
