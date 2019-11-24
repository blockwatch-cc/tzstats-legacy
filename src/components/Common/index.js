import styled from 'styled-components';
import { Devices, Sizes } from './Variables';
import {
  Box,
  InlineBox,
  TextBox,
  DividerBox,
  Row,
  Column,
  RowSpace,
  Flex,
  FlexItem,
  FlexRow,
  FlexColumn,
  FlexColumnWrap,
  FlexRowWrap,
  FlexRowSpaceBetween,
  FlexColumnSpaceBetween,
  FlexRowSpaceAround,
  FlexColumnSpaceAround,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableDetails,
  TwoCardInline,
  Tabs,
  Tab,
} from './Box';
import { LinkIcon } from './Controls';
import { Value } from './DataBox';

export { default as CurrencySelect } from './CurrencySelect';
export { default as IntervalSelect } from './IntervalSelect';

export { default as Card } from './Card';
export { default as ClickableCard } from './ClickableCard';
export { default as DataBox } from './DataBox';
export { default as Spinner } from './CenteredSpinner';
export { default as Blockies } from './Blockies';
export { default as CopyHashButton } from './CopyHashButton';
export { default as HashedBox } from './HashedBox';
export { default as Centered } from './Centered';
export { default as EmptyData } from './EmptyData';
export { default as CurrentCoordinate } from './CurrentCoordinate';
export { default as Tag } from './Tag';
export { default as CopyButton } from './CopyButton';
export { default as NoDataFound } from './NoDataFound';
export { default as NotFound } from './NotFound';
export { default as Error } from './Error';
export {
  Box,
  InlineBox,
  TextBox,
  DividerBox,
  Row,
  Column,
  RowSpace,
  Flex,
  FlexItem,
  FlexRow,
  FlexColumn,
  FlexRowWrap,
  FlexColumnWrap,
  FlexColumnSpaceBetween,
  FlexRowSpaceAround,
  FlexRowSpaceBetween,
  FlexColumnSpaceAround,
  LinkIcon,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableDetails,
  Value,
  TwoCardInline,
  Devices,
  Sizes,
  Tabs,
  Tab,
};

//Todo replace it
export const TabRow = styled(FlexRow)`
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
  margin-bottom: 20px;
`;

export const TabButton = styled.div`
  height: 24px;
  font-size: 12px;
  padding: 4px 14px;
  border: 1px solid #6f727f;
  background-color: ${props => (props.active ? '#525566' : '#424553')};
  cursor: pointer;
`;

export const Title = styled.div`
  height: 20px;
`;

export const EmptyBlock = styled.div`
  width: ${prop => prop.width || '100%'};
  @media ${Devices.mobileL} {
    ${props => props.hideOnMobile && 'display: none;'}
  }
`;
