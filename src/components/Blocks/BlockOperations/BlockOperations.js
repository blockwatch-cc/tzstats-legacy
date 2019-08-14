import React from 'react';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getBlockOperations } from '../../../services/api/tz-stats';
import { Card, FlexRowSpaceBetween, Blockies } from '../../Common';
import TxTypeIcon from '../../Common/TxTypeIcon';
import { formatCurrency, getShortHash, getShortHashOrBakerName, capitalizeFirstLetter } from '../../../utils';

const BlockOperations = ({ block, txType }) => {
  const [operations, setOperations] = React.useState([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOperations, 'block-operations');

  async function fetchMoreOperations() {
    if (!txType) {
      const newOperations = await getBlockOperations({
        height: block.height,
        offset: operations.length - 1,
        limit: 20,
        type: txType,
      });
      if (newOperations.length) {
        setOperations(prevState => [...prevState, ...newOperations]);
      }
      setIsFetching(false);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let operations = await getBlockOperations({
        height: block.height,
        limit: txType ? block.n_ops : 20,
        offset: 0,
        type: txType,
      });

      setOperations(operations);
    };

    fetchData();
  }, [block.height, block.n_ops, txType]);

  return (
    <Wrapper>
      <Card title={'Block Operations'}>
        <FlexRowSpaceBetween mb={10}>
          <TableHeader>From</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>To</TableHeader>
          <TableHeader>Amount</TableHeader>
          <TableHeader>Fee</TableHeader>
          <TableHeader>Hash</TableHeader>
        </FlexRowSpaceBetween>
        <TableBody id={'block-operations'}>
          {operations.length ? (
            operations.map((item, i) => {
              return (
                <FlexRowSpaceBetween key={i}>
                  <TableCell>
                    <Blockies hash={item.sender} />
                    <Link to={`/account/${item.sender}`}>{getShortHashOrBakerName(item.sender)}</Link>
                  </TableCell>
                  <TypeCell>
                    <TxTypeIcon isSuccess={item.is_success} type={item.is_contract ? 'contract' : item.op_type} />
                    {capitalizeFirstLetter(item.op_type)}
                  </TypeCell>
                  <TableCell>
                    {item.receiver ? (
                      <>
                        <Blockies hash={item.receiver} />
                        <Link to={`/account/${item.receiver}`}>{getShortHashOrBakerName(item.receiver)}</Link>
                      </>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{item.volume ? formatCurrency(item.volume) : '-'}</TableCell>
                  <TableCell>{item.fee ? formatCurrency(item.fee) : '-'}</TableCell>
                  <TableCell>
                    <Link to={`/operation/${item.op_hash}`}>{getShortHash(item.op_hash)}</Link>
                  </TableCell>
                </FlexRowSpaceBetween>
              );
            })
          ) : (
            <NoOperations>No one operation found :(</NoOperations>
          )}
        </TableBody>
      </Card>
    </Wrapper>
  );
};
const NoOperations = styled.div`
  margin: 80px auto;
  text-align: center;
  color: #858999;
`;
const TableBody = styled.div`
  height: 200px;
  overflow: scroll;
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
  margin-top: 20px;
`;
export default BlockOperations;
