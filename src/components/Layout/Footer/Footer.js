import React from 'react';
import styled from 'styled-components';
import Colors from '../../Common/Colors';
import { Link } from 'react-router-dom';
import { FlexRow } from '../../Common';

const Footer = () => (
  <Wrapper>
    <FlexRow width='100%' flex={1}>
      <Text>
        <LinkedText>
          <a target="_blank" rel="noopener noreferrer" href="https://tzstats.com/docs/api/index.html">API</a>
        </LinkedText>
      </Text>
      <Text>
        <LinkedText>
          <a target="_blank" rel="noopener noreferrer" href="https://tzstats.com/blog">Blog</a>
        </LinkedText>
      </Text>
      <Text>
        <Link to="/terms">Terms</Link>
      </Text>
      <Text>
        <Link to="/privacy">Privacy</Link>
      </Text>
    </FlexRow>
    <FlexRow width='100%' flex={1}>
      <Text>
        {'Contact us on '}
        <LinkedText>
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/tzstats">
            Twitter
          </a>
        </LinkedText>
        {' or '}
        <LinkedText>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/D5e98Hw">
            Discord
          </a>
        </LinkedText>
      </Text>
    </FlexRow>
    <FlexRow width='100%' flex={1}>
      <Text>
        {'Made by '}
        <LinkedText>
          <a target="_blank" rel="noopener" href="https://blockwatch.cc">
            Blockwatch Data
          </a>
        </LinkedText>
      </Text>
    </FlexRow>
  </Wrapper>
);
export default Footer;

const Wrapper = styled.div`
  color: ${Colors.LIGHT_GRAY5};
  font-size: 11px;
`;

const LinkedText = styled.span`
  color: #fff;
  cursor: pointer;
`;

const Text = styled.span`
  color: rgba(255, 255, 255, 0.52);
  padding-right: 15px;
  padding-bottom: 10px;
`;
