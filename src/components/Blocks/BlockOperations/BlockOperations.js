import React from 'react';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getBlockOperations } from '../../../services/api/tz-stats';
import { opNames } from '../../../config';
import { Spiner, Card, Blockies, DataBox } from '../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails } from '../../Common';
import TxTypeIcon from '../../Common/TxTypeIcon';
import { formatCurrency, getShortHash, getShortHashOrBakerName, capitalizeFirstLetter } from '../../../utils';

const BlockOperations = ({ block, txType }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false, cursor: 0, eof: false });
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOperations, 'block-operations');

  async function fetchMoreOperations() {
    if (data.eof) { return; }
    const newOps = await getBlockOperations({
      height: block.height,
      offset: data.table.length,
      limit: 50,
      type: txType,
    });
    let eof = !newOps.length;
    setData({
      type: txType,
      table: [...data.table, ...newOps],
      isLoaded: true,
      cursor: eof?data.cursor:newOps[0].row_id,
      eof: eof
    });
    setIsFetching(false);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let ops = await getBlockOperations({
        height: block.height,
        limit: 50,
        offset: 0,
        type: txType,
      });
      setData({
        type: txType,
        table: ops,
        isLoaded: true,
        cursor: ops.length?ops[0].row_id:0,
        eof: !ops.length
      });
    };

    fetchData();
  }, [block.height, block.n_ops, txType]);

  return (
    <Wrapper>
      <Card title={'Block Operations' + (data.type?' ('+opNames[data.type]+'s)':'')}>
        <TableHeader>
          <TableHeaderCell width={5}>No</TableHeaderCell>
          <TableHeaderCell width={25}>From</TableHeaderCell>
          <TableHeaderCell width={15}>Type</TableHeaderCell>
          <TableHeaderCell width={20}>To</TableHeaderCell>
          <TableHeaderCell width={15}>Amount</TableHeaderCell>
          <TableHeaderCell width={10}>Fee</TableHeaderCell>
          <TableHeaderCell width={10}>Hash</TableHeaderCell>
        </TableHeader>
        {data.isLoaded ? (
          <TableBody id={'block-operations'}>
            {data.table.length ? (
              data.table.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                    <TableCell width={25}>
                      <Blockies hash={item.sender} />
                      <Link to={`/account/${item.sender}`}>{getShortHashOrBakerName(item.sender)}</Link>
                    </TableCell>
                    <TableCell width={15}>
                      <TxTypeIcon isSuccess={item.is_success} type={item.is_contract ? 'contract' : item.op_type} />
                      <TableDetails>{opNames[item.op_type]}</TableDetails>
                    </TableCell>
                    <TableCell width={20}>
                      {item.receiver ? (
                        <>
                          <Blockies hash={item.receiver} />
                          <Link to={`/account/${item.receiver}`}>{getShortHashOrBakerName(item.receiver)}</Link>
                        </>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell width={15}>{item.volume ? formatCurrency(item.volume) : '-'}</TableCell>
                    <TableCell width={10}>{item.fee ? formatCurrency(item.fee) : '-'}</TableCell>
                    <TableCell width={10}>
                      <Link to={`/operation/${item.op_hash}`}>{getShortHash(item.op_hash)}</Link>
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
            <Spiner />
          </TableBody>
        )}
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
  min-width: 340px;
  flex: 1.8;
`;
export default BlockOperations;
