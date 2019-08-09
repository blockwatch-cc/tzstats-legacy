import React from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, FlexRowSpaceBetween, Blockies } from '../Common';
import TxTypeIcon from '../TxTypeIcon';
import { formatCurrency, getShortHash, capitalizeFirstLetter } from '../../utils'


const BlockOperations = ({ data }) => {

  const [allOperations, setAllOperations] = React.useState(data);
  const [tableData, setTableData] = React.useState(data.slice(0, 10));
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOperations);

  function fetchMoreOperations() {

    if (tableData.length != allOperations.length) {
      const sliceIndex = allOperations.length - tableData.length < 10
        ? allOperations.length
        : tableData.length + 10
      let newTableData = allOperations.slice(tableData.length, sliceIndex);
      setTableData(prevState => ([...prevState, ...newTableData]));
      setIsFetching(false);
    }
  }

  return (
    <Wrapper>
      <Card title={'Block Operations'}>
        <FlexRowSpaceBetween mb={10}>
          <TableHeader>From</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>To</TableHeader>
          <TableHeader>Amount</TableHeader>
          <TableHeader>Hash</TableHeader>
        </FlexRowSpaceBetween>

        {tableData.map((item, i) => {
          return (
            <FlexRowSpaceBetween key={i}>
              <TableCell>
                <Blockies hash={item.sender} />
                <HashLink to={`/account/${item.sender}`}>
                  {getShortHash(item.sender)}
                </HashLink>
              </TableCell>
              <TypeCell>
                <TxTypeIcon isSuccess={item.is_success} type={item.is_contract ? 'contract' : item.type} />
                {capitalizeFirstLetter(item.type)}
              </TypeCell>
              <TableCell>
                <Blockies hash={item.sender} />
                <HashLink to={`/account/${item.sender}`}>
                  {getShortHash(item.receiver)}
                </HashLink>
              </TableCell>
              <TableCell >
                {formatCurrency(item.volume)}
              </TableCell>
              <TableCell>
                <HashLink to={`/operation/${item.hash}`}>
                  {getShortHash(item.hash)}
                </HashLink>
              </TableCell>
            </FlexRowSpaceBetween>
          )
        })}

      </Card>
    </Wrapper>
  );
};

const HashLink = styled(Link)`
    color:#26B2EE
`;

const TableCell = styled.div`
    font-size:12px;
    width:25%;
    height: 25px;
`;
const TypeCell = styled(TableCell)`
    color: #fff;
`
const TableHeader = styled.div`
    font-size:12px;
    width:25%;
    color: rgba(255, 255, 255, 0.52);
    `;
const Wrapper = styled.div`
    min-width: 340px;
    flex:1.8;
`
export default BlockOperations;



