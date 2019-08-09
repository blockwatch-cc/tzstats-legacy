import React from 'react';
import styled from 'styled-components';
import CustomCard from './Card';
import { Card, Elevation } from '@blueprintjs/core';

//todo remove?
const ClickableCard = props => {
  return (
    <ClickableBox onClick={props.handleClick} interactive={true} elevation={Elevation.ZERO}>
      <CustomCard title={props.title}>{props.children}</CustomCard>
    </ClickableBox>
  );
};
const ClickableBox = styled(Card)`
  padding: 0;
`;

export default ClickableCard;
