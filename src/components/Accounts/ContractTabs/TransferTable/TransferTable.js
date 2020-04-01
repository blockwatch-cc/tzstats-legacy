import React from 'react';
import { Spinner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails, Blockies, NoDataFound, Value } from '../../../Common';
import { getShortHashOrBakerName } from '../../../../utils';
import { Link } from 'react-router-dom';
import { getContractCalls } from '../../../../services/api/tz-stats';

const TransferTable = ({ token }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false, eof: false });
  useInfiniteScroll(fetchMoreOperations, 'xfer');

  // fetch transactions sent to token and entrypoint 'transfer'
  async function fetchMoreOperations() {
    if (data.eof) { return; }
    let xfer = await getContractCalls({
      address: token.addr,
      order: 'desc',
      entrypoint: token.txfn,
      offset: data.table.length
    });
    // Note: 'entrypoint' is the Michelson entrypoint, 'call' is the actual function
    xfer = xfer.filter(op => op.parameters.call === token.txfn);
    let eof = !xfer.length;
    setData({
      table: [...data.table, ...xfer],
      isLoaded: true,
      eof: eof,
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let xfer = await getContractCalls({
        address: token.addr,
        order: 'desc',
        entrypoint: token.txfn,
      });
      xfer = xfer.filter(op => op.parameters.call === token.txfn);
      let eof = !xfer.length;
      setData({
        table: xfer,
        isLoaded: true,
        eof: eof,
      });
    };
    fetchData();
    return function cleanup() {
      setData({
        table: [],
        isLoaded: false,
        eof: false,
      });
    };
  }, [token.addr, token.txfn]);

  return <TransferTableTpl data={data} token={token} />;
};

const TransferTableTpl = ({ data, token }) => {
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={15} justify="flex-end">Amount</TableHeaderCell>
        <TableHeaderCell width={20}>Sender</TableHeaderCell>
        <TableHeaderCell width={20}>Receiver</TableHeaderCell>
        <TableHeaderCell width={20}>Date</TableHeaderCell>
        <TableHeaderCell width={20}>Hash</TableHeaderCell>
      </TableHeader>
      <TableBody id="xfer" height="calc(100vh - 450px)">
        {data.isLoaded ? (
          data.table && data.table.length ? (
            data.table.map((item, i) => {
              const xfer = item.parameters.value[token.txfn];
              return (
                <TableRow key={i} color={item.is_success?'inherit':'#ED6290'}>
                  <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={15} justify="flex-end">
                    <Value value={parseInt(xfer.value)/Math.pow(10, token.decimals)} type="currency" sym={token.code} digits={0} zero="-"/>
                  </TableCell>
                  <TableCell width={20}>
                    <Blockies hash={xfer.from} />
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${xfer.from}`}>{getShortHashOrBakerName(xfer.from)}</Link>
                  </TableCell>
                  <TableCell width={20}>
                    <Blockies hash={xfer.to} />
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${xfer.to}`}>{getShortHashOrBakerName(xfer.to)}</Link>
                  </TableCell>
                  <TableCell width={20}><Value value={item.time} type="datetime"/></TableCell>
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

export default TransferTable;
