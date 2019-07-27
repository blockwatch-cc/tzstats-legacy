import React from 'react';
import styled from 'styled-components';
import { Card, FlexRowSpaceBetween, Blockies } from '../Common';
import { formatCurrency, getShortHash, capitalizeFirstLetter } from '../../utils'
import { toDataUrl } from 'blockies';


const getTypeIcon = (type) => {
  switch (type) {
    case 'transaction':
      return <TxTypeIcon color="#26B2EE">&#8827;</TxTypeIcon>;
    case 'unsuccessful':
      return <TxTypeIcon color="#FC6483">&#8827;</TxTypeIcon>;
    case 'endorsement':
      return <TxTypeIcon color="#FC6483">&#x2713;</TxTypeIcon>;
    case 'delegation':
      return <TxTypeIcon color="#FC6483">&#8919;</TxTypeIcon>;
    default:
      return "";
  }
}

const BlockOperations = ({ block }) => {

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

        {block.ops.map((item) => {
          return (
            <FlexRowSpaceBetween>
              <TableCell>
                <Blockies hash={item.sender} />
                <Link>{getShortHash(item.sender)}</Link>
              </TableCell>
              <TypeCell>
                {getTypeIcon(item.type)}
                {capitalizeFirstLetter(item.type)}
              </TypeCell>
              <TableCell>
                <Blockies hash={item.sender} />
                <Link>{getShortHash(item.receiver)}</Link>
              </TableCell>
              <TableCell >
                {formatCurrency(item.volume)}
              </TableCell>
              <TableCell>
                <Link>{getShortHash(item.hash)}</Link>
              </TableCell>
            </FlexRowSpaceBetween>
          )
        })}

      </Card>
    </Wrapper>
  );
};
const Link = styled.a`
color:#26B2EE
`
const TxTypeIcon = styled.span`
    font-size:14px;
    color: ${props => props.color};
    margin-right: 3px;
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
        margin: 0 5px;
    `
export default BlockOperations;



