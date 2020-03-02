import React from 'react';
import { Spinner } from '../../../../components/Common';
import { Blockies, NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails, Value } from '../../../Common';
import { getShortHashOrBakerName } from '../../../../utils';
import { Link } from 'react-router-dom';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';


const HolderTable = ({ token }) => {
  const [data, setData] = React.useState({ table: [], isLoaded: false, eof: false });
  useInfiniteScroll(fetchMore, 'hodl');

  // fetch transactions sent to token and entrypoint 'transfer'
  async function fetchMore() {
    if (data.eof) { return; }
    await token.more();
    setData({
      table: token.holders,
      isLoaded: true,
      eof: token.eof,
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      await token.more();
      setData({
        table: token.holders,
        isLoaded: true,
        eof: token.eof,
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
  }, [token]);

  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={20}>Address</TableHeaderCell>
        <TableHeaderCell width={15} justify="flex-end">Balance</TableHeaderCell>
        <TableHeaderCell width={10} justify="flex-end">Share</TableHeaderCell>
        <TableHeaderCell width={45}></TableHeaderCell>
      </TableHeader>
      <TableBody id={'hodl'} height="calc(100vh - 450px)">
        {data.isLoaded ? (
          data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}>
                    <TableDetails>{i + 1}</TableDetails>
                  </TableCell>
                  <TableCell width={20}>
                    <Blockies hash={item.address} />
                    <Link to={`/${item.address}`}>{getShortHashOrBakerName(item.address)}</Link>
                  </TableCell>
                  <TableCell width={15} justify="flex-end"><Value value={item.balance} type="currency" sym={token.code} digits={0} zero="-"/></TableCell>
                  <TableCell width={10} justify="flex-end"><Value value={item.balance/token.config.totalSupply} type="percent" prec={6} digits={3} zero="-"/></TableCell>
                  <TableCell width={45}></TableCell>
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

export default HolderTable;
