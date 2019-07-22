import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../Common';
import { format } from 'd3-format';
import VolumeChart from './VolumeChart';

const VolumeHistory = props => {
  const data = [
    {
      id: 'input',
      color: '#1af3f9',
      data: [
        {
          x: 'plane',
          y: 123,
        },
        {
          x: 'helicopter',
          y: 191,
        },
        {
          x: 'boat',
          y: 28,
        },
        {
          x: 'train',
          y: 74,
        },
        {
          x: 'subway',
          y: 14,
        },
        {
          x: 'bus',
          y: 297,
        },
        {
          x: 'car',
          y: 275,
        },
        {
          x: 'moto',
          y: 45,
        },
        {
          x: 'bicycle',
          y: 273,
        },
        {
          x: 'horse',
          y: 107,
        },
        {
          x: 'skateboard',
          y: 182,
        },
        {
          x: 'others',
          y: 183,
        },
      ],
    },
    {
      id: 'output',
      color: '#83899B',
      data: [
        {
          x: 'plane',
          y: 240,
        },
        {
          x: 'helicopter',
          y: 108,
        },
        {
          x: 'boat',
          y: 187,
        },
        {
          x: 'train',
          y: 170,
        },
        {
          x: 'subway',
          y: 103,
        },
        {
          x: 'bus',
          y: 92,
        },
        {
          x: 'car',
          y: 286,
        },
        {
          x: 'moto',
          y: 42,
        },
        {
          x: 'bicycle',
          y: 261,
        },
        {
          x: 'horse',
          y: 34,
        },
        {
          x: 'skateboard',
          y: 113,
        },
        {
          x: 'others',
          y: 183,
        },
      ],
    },
  ];
  return (
    <Card title={'Trades volumes (30d)'}>
      <Content>
        <div style={{ flex: 1, height: 150, width: 300 }}>
          <VolumeChart data={data} />
        </div>

        <Column>
          <DataBox>
            {`${format(',')((1000).toFixed())}ꜩ`}
            <Title>In-flow</Title>
          </DataBox>
          <DataBox>
            {`${format(',')((1000).toFixed())}ꜩ`}
            <Title>Out-flow</Title>
          </DataBox>
        </Column>
      </Content>
    </Card>
  );
};
const DataBox = styled.div`
  justify-content: space-between;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Title = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
`;

export default VolumeHistory;
