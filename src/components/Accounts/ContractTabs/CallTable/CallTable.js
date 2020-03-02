import React from 'react';
import { Spinner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails, Blockies, NoDataFound, Value } from '../../../Common';
import { getShortHashOrBakerName, getShortHash } from '../../../../utils';
import { Link } from 'react-router-dom';
import { getContractCalls } from '../../../../services/api/tz-stats';

const CallTable = ({ contract }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false, cursor: 0, eof: false });
  useInfiniteScroll(fetchMoreOperations, "calls");

  async function fetchMoreOperations() {
    if (data.eof) { return; }
    let calls = await getContractCalls({
      address: contract.address,
      order: 'desc',
      offset: data.table.length,
      limit: 20
    });
    let eof = !calls.length;
    setData({
      table: [...data.table, ...calls],
      isLoaded: true,
      eof: eof,
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let calls = await getContractCalls({
        address: contract.address,
        order: 'desc',
        limit: 20
      });
      let eof = !calls.length;
      setData({
        table: calls,
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
  }, [contract.address]);

  return <CallTableTpl data={data} contract={contract} />;
};

const CallTableTpl = ({ data, contract, incoming }) => {
  function shortenHash(h) {
    if (h === contract.address) {
      return 'Self';
    }
    return getShortHashOrBakerName(h);
  }

  return (
    <>
      <TableHeader>
        <TableHeaderCell width={3}>No</TableHeaderCell>
        <TableHeaderCell width={18}>Sender</TableHeaderCell>
        <TableHeaderCell width={18}>Target</TableHeaderCell>
        <TableHeaderCell width={20}>Call</TableHeaderCell>
        <TableHeaderCell width={10}>Fee</TableHeaderCell>
        <TableHeaderCell width={18}>Date</TableHeaderCell>
        <TableHeaderCell width={12}>Hash</TableHeaderCell>
      </TableHeader>
      <TableBody id="calls" height="calc(100vh - 450px)">
        {data.isLoaded ? (
          data.table && data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i} color={item.is_success?'inherit':'#ED6290'}>
                  <TableCell width={3}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={18}>
                    <Blockies hash={item.sender} />
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.sender}`}>{shortenHash(item.sender)}</Link>
                  </TableCell>
                  <TableCell width={18}>
                    <Blockies hash={item.receiver} />
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.receiver}`}>{shortenHash(item.receiver)}</Link>
                  </TableCell>
                  <TableCell width={20}>
                    <Value value={item.parameters?item.parameters.call:item.type} type="plain"/>
                  </TableCell>
                  <TableCell width={10}>
                    <Value value={item.fee>0?item.fee:0} type="currency" digits={6} zero="-"/>
                  </TableCell>
                  <TableCell width={18}><Value value={item.time} type="datetime"/></TableCell>
                  <TableCell width={12}>
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.hash}`}>{getShortHash(item.hash)}</Link>
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

export default CallTable;
