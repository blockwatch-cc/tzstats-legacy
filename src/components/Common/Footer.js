import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Colors from './Colors';
import { Devices } from './Variables';
import Indent from './Indent';
import { faDiscord } from '../Common/Icons/faDiscord';
import { faGithub } from '../Common/Icons/faGithub';
import { faMedium } from '../Common/Icons/faMedium';

const Footer = () => (
  <Wrapper>
    <LinksWrapper className="content">
      <List>
        <HeadListItem>About</HeadListItem>
        <NormalListItem>
          <LinkText>TzStats</LinkText>
        </NormalListItem>
        <NormalListItem>
          <LinkText>FAQ</LinkText>
        </NormalListItem>
      </List>
      <List>
        <HeadListItem>Links</HeadListItem>
        <NormalListItem>
          <FontAwesomeIcon icon={faDiscord} />
          <Indent />
          <LinkText>Discord</LinkText>
        </NormalListItem>
        <NormalListItem>
          <FontAwesomeIcon icon={faMedium} />
          <Indent />
          <LinkText>Medium</LinkText>
        </NormalListItem>
        <NormalListItem>
          <FontAwesomeIcon icon={faGithub} />
          <Indent />
          <LinkText>Github</LinkText>
        </NormalListItem>
      </List>
      <List>
        <HeadListItem>Contact</HeadListItem>
        <NormalListItem>Support: support@tzstats.com</NormalListItem>
        <NormalListItem />
      </List>
    </LinksWrapper>
  </Wrapper>
);
export default Footer;

const Wrapper = styled.div.attrs({
  className: 'footer',
})`
  background-color: ${Colors.DARK_GRAY4};
  width: 100%;
  color: ${Colors.LIGHT_GRAY5};
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), 0 0 0 rgba(16, 22, 26, 0), 0 -1px 1px rgba(16, 22, 26, 0.4);
`;
const LinksWrapper = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;

  @media ${Devices.mobileL} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const List = styled.ul`
  @media ${Devices.mobileL} {
    display: flex;
    flex-direction: column;

    align-self: flex-start;
    padding-inline-start: 0px;
  }
`;

const NormalListItem = styled.li`
  margin: 10px auto;

  @media ${Devices.mobileL} {
    margin: 10px 0px;
    display: flex;
    align-self: flex-start;
  }
`;

const HeadListItem = styled.li`
  color: ${Colors.GRAY2};
`;
const LinkText = styled.a``;
