import React from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, FlexRowSpaceBetween, Blockies, FlexColumn, DataBox } from '../../components/Common';
import { formatCurrency, getShortHash, capitalizeFirstLetter } from '../../utils';

const TestPage = () => {
  const [allOperations, setAllOperations] = React.useState(Array.from(Array(30).keys()));
  const [tableData, setTableData] = React.useState(Array.from(Array(50).keys()));
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOperations);

  function fetchMoreOperations() {
    setTableData(prevState => [...prevState, ...Array.from(Array(30).keys())]);
    setIsFetching(false);
  }

  return (
    <div style={{ color: 'black' }} tableData="list-group mb-2">
      {tableData.map((listItem, i) => (
        <div className="list-group-item">List Item {listItem} </div>
      ))}
    </div>
  );
};

const TxTypeIcon = styled.span`
  font-size: 14px;
  color: ${props => props.color};
  margin-right: 3px;
`;

const TableCell = styled.div`
  font-size: 12px;
  width: 25%;
  height: 25px;
`;
const TypeCell = styled(TableCell)`
  color: #fff;
`;
const TableHeader = styled.div`
  font-size: 12px;
  width: 25%;
  color: rgba(255, 255, 255, 0.52);
`;
const Wrapper = styled.div`
  min-width: 340px;
  flex: 1.8;
  margin: 0 5px;
  height: 500px;
`;
export default TestPage;
