import React from 'react';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getBlockOperations } from '../../../services/api/tz-stats';
import { opNames } from '../../../config';
import { Spinner, Card, Blockies, Value } from '../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails } from '../../Common';
import TxTypeIcon from '../../Common/TxTypeIcon';
import { getShortHash, getShortHashOrBakerName } from '../../../utils';

const BlockOperations = ({ block, txType }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false, cursor: 0, eof: false });
  useInfiniteScroll(fetchMoreOperations, 'block-ops');

  async function fetchMoreOperations() {
    if (data.eof) { return; }
    const newOps = await getBlockOperations({
      height: block.height,
      limit: 50,
      type: txType,
      cursor: data.cursor
    });
    let eof = !newOps.length;
    setData({
      type: txType,
      table: [...data.table, ...newOps],
      isLoaded: true,
      cursor: eof?data.cursor:newOps[newOps.length-1].row_id,
      eof: eof
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let ops = await getBlockOperations({
        height: block.height,
        limit: 50,
        type: txType,
      });
      setData({
        type: txType,
        table: ops,
        isLoaded: true,
        cursor: ops.length?ops[ops.length-1].row_id:0,
        eof: !ops.length||ops.length<50
      });
    };

    fetchData();
  }, [block.height, block.n_ops, txType]);

  return (
    <Wrapper>
      <Card title={'Block Operations' + (data.type?' ('+opNames[data.type]+'s)':'')}>
        <Table>
        <TableHeader>
          <TableHeaderCell width={5}>No</TableHeaderCell>
          <TableHeaderCell width={5}>Type</TableHeaderCell>
          <TableHeaderCell width={20}>Sender</TableHeaderCell>
          <TableHeaderCell width={20}>Receiver</TableHeaderCell>
          <TableHeaderCell width={20}>Amount/Reward</TableHeaderCell>
          <TableHeaderCell width={15}>Fee</TableHeaderCell>
          <TableHeaderCell width={15}>Hash</TableHeaderCell>
        </TableHeader>
        {data.isLoaded ? (
          <TableBody id={'block-ops'}>
            {data.table.length ? (
              data.table.map((item, i) => {
                return (
                  <TableRow key={i} color={item.is_success?'inherit':'#ED6290'}>
                    <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                    <TableCell width={5} title={opNames[item.is_contract?'call':item.type]}>
                      <TxTypeIcon isSuccess={item.is_success} type={item.is_contract ? 'contract' : item.type} />
                    </TableCell>
                    <TableCell width={20}>
                      <Blockies hash={item.sender} />
                      <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.sender}`}>{getShortHashOrBakerName(item.sender)}</Link>
                    </TableCell>
                    <TableCell width={20}>
                      {item.receiver ? (
                        <>
                          <Blockies hash={item.receiver} />
                          <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.receiver}`}>{getShortHashOrBakerName(item.receiver)}</Link>
                        </>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell width={20}><Value value={item.volume||item.reward} type="currency" digits={6} zero="-"/></TableCell>
                    <TableCell width={15}><Value value={item.fee} type="currency" digits={6} zero="-"/></TableCell>
                    <TableCell width={15}>
                      <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.hash}`}>{getShortHash(item.hash)}</Link>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <NoOperations>No operations found.</NoOperations>
            )}
          </TableBody>
        ) : (
          <TableBody>
            <Spinner />
          </TableBody>
        )}
        </Table>
      </Card>
    </Wrapper>
  );
};
const NoOperations = styled.div`
  margin: 80px auto;
  text-align: center;
  color: #858999;
`;
const Wrapper = styled.div`
  min-width: 300px;
  flex: 1.8;
`;

const Table = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;
export default BlockOperations;
