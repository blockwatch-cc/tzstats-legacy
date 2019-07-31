import React from 'react';
import styled from 'styled-components';


const TxTypeIcon = ({ type, fontSize = 14, isSuccess }) => {
  let color = isSuccess ? "#26B2EE" : "#FC6483"
  switch (type) {
    case 'transaction':
      return <Icon fontSize={fontSize} color={color}>&gt;</Icon>;
    case 'contract':
      return <Icon fontSize={fontSize} color={color}>&#9856;</Icon>;
    case 'unsuccessful':
      return <Icon fontSize={fontSize} color={color}>&gt;</Icon>;
    case 'endorsement':
      return <Icon fontSize={fontSize} color={color}>&#x2713;</Icon>;
    case 'delegation':
      return <Icon fontSize={fontSize} color={color}>&#8919;</Icon>;
    case 'double_baking_evidence':
      return <Icon fontSize={fontSize} color={color}>&asymp;</Icon>;
    case 'double_endorsement_evidence':
      return <Icon fontSize={fontSize} color={color}>&#8782;</Icon>;
    case 'seed_nonce_revelation':
      return <Icon fontSize={fontSize} color={color}>&#8847;</Icon>;
    case 'proposals':
      return <Icon fontSize={fontSize} color={color}>&#9661;</Icon>;
    case 'origination':
      return <Icon fontSize={fontSize} color={color}>&#9675;</Icon>;
    case 'ballot':
      return <Icon fontSize={fontSize} color={color}>&#9671;</Icon>;
    case 'activate_account':
      return <Icon fontSize={fontSize} color={color}>&#8943;</Icon>;
    case 'reveal':
      return <Icon fontSize={fontSize} color={color}>&#9672;</Icon>;
    default:
      return "";
  }

};

const Icon = styled.span`
    font-size: ${prop => prop.fontSize}px;
    font-weight: 300;
    color: ${prop => prop.color};
    margin-right: 3px;
`;

export default TxTypeIcon;
