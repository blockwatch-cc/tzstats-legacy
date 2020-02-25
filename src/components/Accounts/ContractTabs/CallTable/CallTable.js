import React from 'react';
import { Spinner } from '../../../../components/Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails, Blockies, NoDataFound, Value } from '../../../Common';
import { getShortHashOrBakerName } from '../../../../utils';
import { Link } from 'react-router-dom';
import { getContractCalls } from '../../../../services/api/tz-stats';

const CallTable = ({ contract }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false, cursor: 0, eof: false });
  useInfiniteScroll(fetchMoreOperations, "calls");

  async function fetchMoreOperations() {
    if (data.eof) { return; }
    let calls = await getContractCalls({
      address: contract.address,
      type: 'transaction',
      order: 'desc',
      offset: data.table.length
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
        type: 'transaction',
        order: 'desc',
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
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={3}>No</TableHeaderCell>
        <TableHeaderCell width={18}>Sender</TableHeaderCell>
        <TableHeaderCell width={17}>Target</TableHeaderCell>
        <TableHeaderCell width={15}>Call</TableHeaderCell>
        <TableHeaderCell width={10}>Fee</TableHeaderCell>
        <TableHeaderCell width={18}>Date</TableHeaderCell>
        <TableHeaderCell width={15}>Hash</TableHeaderCell>
      </TableHeader>
      <TableBody id="calls">
        {data.isLoaded ? (
          data.table && data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i} color={item.is_success?'inherit':'#ED6290'}>
                  <TableCell width={3}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={18}>
                    <Blockies hash={item.sender} />
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.sender}`}>{getShortHashOrBakerName(item.sender)}</Link>
                  </TableCell>
                  <TableCell width={17}>
                    <Blockies hash={item.receiver} />
                    <Link style={{color:item.is_success?'inherit':'#ED6290'}} to={`/${item.receiver}`}>{getShortHashOrBakerName(item.receiver)}</Link>
                  </TableCell>
                  <TableCell width={15}>
                    <Value value={item.parameters.call} type="plain"/>
                  </TableCell>
                  <TableCell width={10}>
                    <Value value={item.fee>0?item.fee:0} type="currency" digits={6} zero="-"/>
                  </TableCell>
                  <TableCell width={18}><Value value={item.time} type="datetime"/></TableCell>
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

export default CallTable;
