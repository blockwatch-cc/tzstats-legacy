import React from 'react';
import styled from 'styled-components';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { DataBox, NoDataFound } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails } from '../../../Common';
import { timeAgo, getProposaNameByHash, capitalizeFirstLetter } from '../../../../utils';
import { getTableDataByType } from '../../../../services/api/tz-stats';
import { Link } from 'react-router-dom';
import { Spiner } from '../../../../components/Common';
import TxTypeIcon from '../../../Common/TxTypeIcon';
import { timeFormat } from 'd3-time-format';

const VotingTable = ({ account }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false, cursor: 0, eof: false });
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOperations, 'account-votes');

  async function fetchMoreOperations() {
    if (data.eof) { return; }
    let votes = await getTableDataByType({
      address: account.address,
      type: 'votes',
      cursor: data.cursor
    });
    let eof = !votes.length;
    votes = votes.reverse();
    setData({
      table: [...data.table, ...votes],
      isLoaded: true,
      cursor: eof?data.cursor:votes[0].row_id,
      eof: eof
    });
    setIsFetching(false);
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
  }, []);
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={25}>Election</TableHeaderCell>
        <TableHeaderCell width={20}>Vote</TableHeaderCell>
        <TableHeaderCell width={20}>Date</TableHeaderCell>
        <TableHeaderCell width={20}>Ballot</TableHeaderCell>
        <TableHeaderCell width={10}>Rolls</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'account-votes'}>
          {data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={25}>{getProposaNameByHash(item.proposal)}</TableCell>
                  <TableCell width={20}>{capitalizeFirstLetter(item.voting_period_kind).replace('_vote', '')}</TableCell>
                  <TableCell width={20}>
                    <DataBox title={timeFormat('%b %d, %H:%M')(item.time)} />
                  </TableCell>
                  <TableCell width={20}>{item.ballot.toUpperCase() || '-'}</TableCell>
                  <TableCell width={10}>{item.rolls}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <NoDataFound />
          )}
        </TableBody>
      ) : (
        <TableBody>
          <Spiner />
        </TableBody>
      )}
    </>
  );
};

export default VotingTable;
