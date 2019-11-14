import React from 'react';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails } from '../../../Common';
import { capitalizeFirstLetter, formatValue, formatDayTime, getShortHash } from '../../../../utils';
import { getTableDataByType } from '../../../../services/api/tz-stats';
import { Spinner } from '../../../../components/Common';
import { Link } from 'react-router-dom';
import { getProposalByHash } from '../../../../config/proposals';


const VotingTable = ({ account }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false, cursor: 0, eof: false });
  useInfiniteScroll(fetchMoreOperations, 'votes');

  async function fetchMoreOperations() {
    if (data.eof) { return; }
    let votes = await getTableDataByType({
      address: account.address,
      type: 'votes',
      cursor: data.cursor,
      order: 'desc'
    });
    let eof = !votes.length;
    setData({
      table: [...data.table, ...votes],
      isLoaded: true,
      cursor: eof?data.cursor:votes[0].row_id,
      eof: eof
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let votes = await getTableDataByType({
        address: account.address,
        type: 'votes',
      });
      votes = votes.reverse();
      setData({
        table: votes,
        isLoaded: true,
        cursor: votes.length?votes[0].row_id:0,
        eof: !votes.length
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
  }, [account.address, account.last_seen]);
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={15}>Election</TableHeaderCell>
        <TableHeaderCell width={10}>Vote</TableHeaderCell>
        <TableHeaderCell width={10}>Ballot</TableHeaderCell>
        <TableHeaderCell width={10}>Rolls</TableHeaderCell>
        <TableHeaderCell width={20}>Date</TableHeaderCell>
        <TableHeaderCell width={10}>Block</TableHeaderCell>
        <TableHeaderCell width={10}>Op</TableHeaderCell>
        <TableHeaderCell width={10}></TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'votes'}>
          {data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={15}><Link to={`/election/${item.election_id}`}>{getProposalByHash(item.proposal).name}</Link></TableCell>
                  <TableCell width={10}>{capitalizeFirstLetter(item.voting_period_kind).replace('_vote', '')}</TableCell>
                  <TableCell width={10}>{item.ballot.toUpperCase() || '-'}</TableCell>
                  <TableCell width={10}>{formatValue(item.rolls)}</TableCell>
                  <TableCell width={20}>{formatDayTime(item.time,1,1)}</TableCell>
                  <TableCell width={10}><Link to={`/${item.height}`}>{formatValue(item.height)}</Link></TableCell>
                  <TableCell width={10}><Link to={`/${item.op}`}>{getShortHash(item.op)}</Link></TableCell>
                  <TableCell width={10}></TableCell>
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

export default VotingTable;
