import React from 'react';
import { Spinner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, Value } from '../../../Common';
import { getShortHash } from '../../../../utils';
import { getBakedBlocks, getBakedFlows } from '../../../../services/api/tz-stats';
import { Link } from 'react-router-dom';

const blockColumns = [
  'row_id',
  'height',
  'cycle',
  'time',
  'hash',
  'is_orphan',
  'solvetime',
  'priority',
  'n_endorsement',
  'fee',
];

const flowColumns = [
  'row_id',
  'height',
  'amount_in',
  'category',
];

function mixFlows(blocks, flows) {
  let bi = 0;
  flows.forEach((f, i) => {
    for (;bi<blocks.length && blocks[bi].height > f.height; bi++) {}
    if (bi < blocks.length) {
      switch (f.category) {
      case 'rewards':
        blocks[bi].reward = f.amount_in;
        break
      case 'deposits':
        blocks[bi].deposit = f.amount_in;
        break
      default:
      }
    }
  })
}

const BakingTable = ({ account }) => {
  const [data, setData] = React.useState({ table: [], isLoaded: false, blockCursor: 0, flowCursor: 0, eof: false });
  useInfiniteScroll(fetchMoreOperations, 'baked');

  async function fetchMoreOperations() {
    if (data.eof) { return; }
    let [moreBlocks, moreFlows] = await Promise.all([
      getBakedBlocks({
        baker: account.address,
        order: 'desc',
        columns: blockColumns,
        limit: 100,
        cursor: data.blockCursor
      }),
      getBakedFlows({
        baker: account.address,
        order: 'desc',
        columns: flowColumns,
        limit: 200,
        cursor: data.flowCursor
      })
    ]);
    let eof = !moreBlocks.length;
    mixFlows(moreBlocks, moreFlows);
    setData({
      table: [...data.table, ...moreBlocks],
      isLoaded: true,
      blockCursor: eof?data.blockCursor:moreBlocks.slice(-1)[0].row_id,
      flowCursor: eof?data.flowCursor:moreFlows.slice(-1)[0].row_id,
      eof: eof
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let [blocks, flows] = await Promise.all([
        getBakedBlocks({
          baker: account.address,
          order: 'desc',
          columns: blockColumns,
          limit: 100
        }),
        getBakedFlows({
          baker: account.address,
          order: 'desc',
          columns: flowColumns,
          limit: 200
        })
      ]);
      let eof = !blocks.length;
      mixFlows(blocks, flows);
      setData({
        table: blocks,
        isLoaded: true,
        blockCursor: !eof?blocks.slice(-1)[0].row_id:0,
        flowCursor: !eof?flows.slice(-1)[0].row_id:0,
        eof: eof,
      });
    };
    fetchData();
    return function cleanup() {
      setData({
        table: [],
        isLoaded: false,
        blockCursor: 0,
        flowCursor: 0,
        eof: false
      });
    };
  }, [account.address, account.last_bake_height]);


  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>Cycle</TableHeaderCell>
        <TableHeaderCell width={8}>Block</TableHeaderCell>
        <TableHeaderCell width={7}>Priority</TableHeaderCell>
        <TableHeaderCell width={11}>Endorsements</TableHeaderCell>
        <TableHeaderCell width={9}>Bake Time</TableHeaderCell>
        <TableHeaderCell width={10}>Reward</TableHeaderCell>
        <TableHeaderCell width={10}>Fee</TableHeaderCell>
        <TableHeaderCell width={10}>Deposit</TableHeaderCell>
        <TableHeaderCell width={18}>Date</TableHeaderCell>
        <TableHeaderCell width={15}>Hash</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'baked'}>
          {data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i} color={item.is_orphan?'#ED6290':'inherit'}>
                  <TableCell width={5}><Value value={item.cycle} type="value-full"/></TableCell>
                  <TableCell width={8}><Value value={item.height} type="value-full"/></TableCell>
                  <TableCell width={7}>{item.priority}</TableCell>
                  <TableCell width={11}>{item.n_endorsement}</TableCell>
                  <TableCell width={9}>{item.solvetime}s</TableCell>
                  <TableCell width={10}><Value value={item.reward||0} type="currency" sym="" digits={0} zero="-"/></TableCell>
                  <TableCell width={10}><Value value={item.fees||0} type="currency" sym="" digits={0} zero="-"/></TableCell>
                  <TableCell width={10}><Value value={item.deposit||0} type="currency" sym="" digits={0} zero="-"/></TableCell>
                  <TableCell width={18}><Value value={item.time} type="datetime"/></TableCell>
                  <TableCell width={15}>
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

export default BakingTable;
