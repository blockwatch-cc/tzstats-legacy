import styled from 'styled-components';
import {
  space,
  width,
  fontSize,
  color,
  textAlign,
  alignItems,
  alignContent,
  justifyContent,
  flexBasis,
  flexDirection,
  flex,
  flexWrap,
  justifySelf,
  alignSelf,
  height,
  border,
  minWidth,
  minHeight,
  zIndex,
} from 'styled-system';

import { Divider } from '@blueprintjs/core';

import { Devices } from './Variables';

export const Box = styled.div`
  ${space}
  ${width}
  ${height}
  ${color}

  @media ${Devices.mobileS} {
    ${props => props.hideOnMobileS && 'display: none !important;'}
  }

  @media ${Devices.mobileM} {
    ${props => props.hideOnMobileM && 'display: none !important;'}
  }

  @media ${Devices.mobileL} {
    ${props => props.hideOnMobile && 'display: none !important;'}
  }

  @media ${Devices.tablet} {
    ${props => props.hideOnTablet && 'display: none !important;'}
  }
`;

export const InlineBox = styled.span`
  ${space}
  ${width}
  ${height}
  ${color}

  @media ${Devices.mobileS} {
    ${props => props.hideOnMobileS && 'display: none;'}
  }

  @media ${Devices.mobileM} {
    ${props => props.hideOnMobileM && 'display: none;'}
  }

  @media ${Devices.mobileL} {
    ${props => props.hideOnMobile && 'display: none;'}
  }

  @media ${Devices.tablet} {
    ${props => props.hideOnTablet && 'display: none;'}
  }
`;

export const DividerBox = styled(Divider)`
  ${space}
  ${width}
  ${height}
  ${color}
`;

export const TextBox = styled(Box)`
  ${fontSize}
  ${textAlign}
  ${justifySelf}
  ${alignSelf}
`;

export const Flex = styled(Box)`
  display: flex;
  ${alignItems}
  ${justifyContent}
  ${alignContent}
  ${flexWrap}
  ${flexBasis}
  ${flexDirection}
`;

export const FlexRow = styled(Box)`
  display: flex;
  flex-direction: row;
  position: relative;
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${width}
  ${height}
`;

export const FlexColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  ${textAlign}
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${border}
  ${minWidth}
  ${minHeight}
`;

export const FlexColumnSpaceBetween = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  ${textAlign}
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${border}
  ${minWidth}
  ${minHeight}
  `;

export const FlexColumnSpaceAround = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  ${textAlign}
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${border}
  ${minWidth}
  ${minHeight}
  `;

export const FlexRowWrap = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${minWidth}
  ${width}
  ${minHeight}
  ${height}
`;

export const FlexColumnWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
`;

export const FlexRowSpaceBetween = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${minWidth}
  ${minHeight}
  ${height}
  ${flex}
  ${zIndex}
`;

export const FlexRowSpaceAround = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
`;

export const FlexItem = styled.div`
  ${flex}
  ${justifySelf}
  ${alignSelf}
`;

export const TableBody = styled.div`
  height: ${props => props.height || 200}px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const TableHeader = styled(FlexRowSpaceBetween)`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.52);
  margin-bottom: 5px;
`;

export const TableHeaderCell = styled.div`
  width: ${props => props.width}%;
  padding: 3px 5px;
`;

export const TableRow = styled(FlexRowSpaceBetween)`
  line-height: 20px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const TableCell = styled.div`
  font-size: 12px;
  width: ${props => props.width}%;
  padding: 4px 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TableDetails = styled.span`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TwoCardInline = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-left: -5px;
  margin-right: -5px;
`;
