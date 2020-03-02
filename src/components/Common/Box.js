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

export const RowSpace = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${textAlign}
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${border}
  ${width}
  ${height}
  ${minWidth}
  ${minHeight}
  ${zIndex}
`;

export const Row = styled(Box)`
  display: flex;
  flex-direction: row;
  position: relative;
  ${textAlign}
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${border}
  ${width}
  ${height}
  ${minWidth}
  ${minHeight}
  ${zIndex}
`;

export const Column = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  ${textAlign}
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${border}
  ${width}
  ${height}
  ${minWidth}
  ${minHeight}
  ${zIndex}
`;

export const Flex = styled(Box)`
  display: flex;
  ${alignItems}
  ${alignSelf}
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
  ${textAlign}
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${border}
  ${width}
  ${height}
  ${minWidth}
  ${minHeight}
  & > * {
    margin-top: 10px;
    margin-right: 10px;
  }
  @media ${Devices.mobileL} {
    flex-wrap: wrap;
  }
`;

export const FlexColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  ${textAlign}
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${border}
  ${width}
  ${height}
  ${minWidth}
  ${minHeight}
  margin-top: -10px;
  & > * {
    margin-top: 10px;
  }
`;

export const FlexColumnSpaceBetween = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  ${textAlign}
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${border}
  ${minWidth}
  ${minHeight}
  margin-top: -10px;
  & > * {
    margin-top: 10px;
  }
`;

export const FlexColumnSpaceAround = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  ${textAlign}
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flex}
  ${border}
  ${minWidth}
  ${minHeight}
  margin-top: -10px;
  & > * {
    margin-top: 10px;
  }
`;

export const FlexRowWrap = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${minWidth}
  ${width}
  ${minHeight}
  ${height}
  margin-top: -10px;
  & > * {
    margin-top: 10px;
    margin-right: 10px;
  }
`;

export const FlexColumnWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
`;

export const FlexRowSpaceBetween = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${minWidth}
  ${minHeight}
  ${height}
  ${flex}
  ${zIndex}
  margin-top: -10px;
  & > * {
    margin-top: 10px;
    margin-right: 10px;
  }
  @media ${Devices.mobileL} {
    flex-wrap: wrap;
  }
`;

export const FlexRowSpaceAround = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  ${alignItems}
  ${alignContent}
  ${alignSelf}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  margin-top: -10px;
  & > * {
    margin-top: 10px;
    margin-right: 10px;
  }
  @media ${Devices.mobileL} {
    flex-wrap: wrap;
  }
`;

export const FlexItem = styled.div`
  ${flex}
  ${justifySelf}
  ${alignSelf}
`;

export const TableBody = styled.div`
  height: ${props => props.height || '200px'};
  min-height: 120px;
  overflow-y: auto;
  overflow-x: auto;
`;

export const TableHeader = styled(RowSpace)`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.52);
  margin-bottom: 5px;
  justify-content: space-between;
`;

export const TableHeaderCell = styled.div`
  flex-basis: ${props => props.width}%;
  flex-grow: 1;
  justify-content: ${props => props.justify||'flex-start'};
  padding: 3px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
  // min-width: max-content;


export const TableRow = styled(RowSpace)`
  justify-content: space-between;
  line-height: 20px;
  flex-basis: 100%;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const TableCell = styled.div`
  font-size: 12px;
  flex-basis: ${props => props.width}%;
  flex-grow: 1;
  justify-content: ${props => props.justify||'flex-start'};
  padding: 4px 5px;
  padding-left: ${props => props.pl?props.pl:'4'}px;
  white-space: ${props => props.whitespace||'nowrap'};
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const TableCellMinMax = styled.div`
  font-size: 12px;
  flex-basis: ${props => props.width}%;
  min-width: ${props => props.width}%;
  max-width: ${props => props.width}%;
  flex-grow: 1;
  justify-content: ${props => props.justify||'flex-start'};
  padding: 4px 5px;
  padding-left: ${props => props.pl?props.pl:'4'}px;
  white-space: ${props => props.whitespace||'nowrap'};
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

  // min-width: max-content;

export const TableDetails = styled.span`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const TwoCardInline = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-left: -5px;
  margin-right: -5px;
`;

export const Tabs = styled.div`
  background: #4c4f5f;
  display: flex;
  font-size: 13px;
  font-weight: 400;
  height: 40px;
  min-height: 40px;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
  margin-left: -30px;
  margin-top: -20px;
  margin-bottom: 20px;
  margin-right: -20px;
  width: calc(100% + 60px);
  @media ${Devices.mobileL} {
    margin-left: -15px;
    margin-top: -15px;
    width: calc(100% + 30px);
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

export const Tab = styled.div`
  border: 1px solid transparent;
  line-height: 1;
  outline: 0;
  padding: 12px 15px;
  height: 100%;
  position: relative;
  cursor: pointer;

  color: ${props => (props.active ? '#fff' : '#aaa')};
  border-top-left-radius: ${props => (props.active ? 2 : 0)}px;
  border-top-right-radius: ${props => (props.active ? 2 : 0)}px;
  border-color: ${props => (props.active ? '#444755 #444755 transparent' : 'transparent')};
  background-color: ${props => (props.active ? '#444755' : '#4c4f5f')};
`;
