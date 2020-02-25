import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from './index';
import {
  formatCurrency,
  formatValue,
  formatDayTime,
  formatDay,
  formatTime,
  isUndefined,
  getShortHashOrBakerName,
  timeAgo,
} from '../../utils';

//Todo refactoring
const DataBox = ({
  value,
  title,
  valueType,
  valueOpts,
  type = '',
  valueSize = 1,
  titleSize = 0.75,
  ta = 'left',
  ml = '0',
  mr = '0',
}) => {
  switch (type) {
    case 'title-bottom':
      return (
        <Wrapper ta={ta} ml={ml} mr={mr} size={valueSize}>
          {title && (valueType && !value) ? (
            <Title size={titleSize}>
              <Value type={valueType} value={title} {...valueOpts} />
            </Title>
          ) : (
            <Title size={titleSize}>{title}</Title>
          )}
          {value !== undefined && <Value type={valueType} value={value} size={valueSize} />}
        </Wrapper>
      );
    case 'value-as-title':
      return (
        <Wrapper ta={ta} ml={ml} mr={mr} size={valueSize}>
          {title}
          {value !== undefined && (
            <Title size={titleSize}>
              <Value type={valueType} value={value} {...valueOpts} size={valueSize} />
            </Title>
          )}
        </Wrapper>
      );
    case 'horizontal-value-as-title':
      return (
        <Wrapper ta={ta} ml={ml} mr={mr} size={valueSize}>
          <Flex justifyContent="space-between" alignItems="center">
            {<div style={{ paddingRight: '20px' }}>{title}</div>}
            {value !== undefined && (
              <Title size={titleSize}>
                <Value type={valueType} value={value} {...valueOpts} size={valueSize} />
              </Title>
            )}
          </Flex>
        </Wrapper>
      );
    case 'inline':
      return (
        <Wrapper ta={ta} ml={ml} mr={mr} fontSize={valueSize}>
          {title && <InlineTitle fontSize={titleSize}>{title}</InlineTitle>}
          {value !== undefined && <Value type={valueType} value={value} {...valueOpts} fontSize={valueSize} />}
        </Wrapper>
      );
    default:
      return (
        <Wrapper ta={ta} ml={ml} mr={mr} size={valueSize}>
          {value !== undefined && <Value type={valueType} value={value} {...valueOpts} size={valueSize} />}
          {title && <Title size={titleSize}>{title}</Title>}
        </Wrapper>
      );
  }
};

let re = /^(.*)\.([^ ]*)( .*)?$/;

export const Value = ({
  type = 'value-full',
  value,
  prec,
  sym,
  prefix = '',
  suffix = '',
  digits = 4,
  round = false,
  dim = true,
  zero = null,
  fontSize = 12,
  ...props
}) => {
  if (value === 0 && zero) {
    return zero;
  }
  if (round) {
    value = Math.round(value);
  }
  if (prec !== undefined) {
    value = value.toFixed(prec);
  }
  let res = '';
  switch (type) {
    case 'plain':
      return (<ValueWrapper {...props}>{value}</ValueWrapper>);
    case 'text':
      return (<ValueWrapper {...props}>{[prefix, value, suffix].join('')}</ValueWrapper>);
    case 'address':
      return (
        <ValueWrapper {...props}>
          <Link to={`/$value`}>{getShortHashOrBakerName(value)}</Link>
        </ValueWrapper>
      );
    case 'ago':
      res = timeAgo.format(new Date(value));
      break;
    case 'datetime':
      res = formatDayTime(value, 1, 1);
      break;
    case 'date':
      res = formatDay(value);
      break;
    case 'time':
      res = formatTime(value);
      break;
    case 'currency':
      sym = isUndefined(sym) ? 'XTZ' : sym;
      if (!!digits) {
        res = formatCurrency(value, ',.' + digits + 'f');
      } else {
        res = formatCurrency(value, ',');
      }
      break;
    case 'currency-short':
      sym = isUndefined(sym) ? 'XTZ' : sym;
      // res = formatCurrency(value, '~s');
      res = formatCurrency(value, ',');
      break;
    case 'currency-flex':
      sym = isUndefined(sym) ? 'XTZ' : sym;
      res = formatCurrency(value, ',.' + digits + 'r');
      break;
    case 'currency-full':
      sym = isUndefined(sym) ? 'XTZ' : sym;
      res = formatCurrency(value.toFixed(6), ',');
      break;
    case 'currency-usd':
      if (!!digits) {
        res = formatValue(value, '$,.' + digits + 's');
      } else {
        res = formatValue(value, '$,.2f');
      }
      break;
    case 'value-short':
      res = formatValue(Math.round(value), '.' + digits + 's');
      break;
    case 'percent':
      switch (true) {
        case value === 0.0 && zero:
          res = zero;
          break;
        case value * 100 < 1 && !prec:
          res = '< 1%';
          break;
        default:
          res = formatValue(value, '.' + digits + '%');
      }
      break;
    default:
      if (!value && zero) {
        res = zero;
      } else {
        res = formatValue(value, ',');
      }
  }
  let arr = re.exec(res);
  return arr && arr.length ? (
    <ValueWrapper {...props}>
      {`${prefix}${arr[1]}`}
      {dim ? <Dim>.{arr[2]}</Dim> : '.' + arr[2]}
      {arr[3]}
      {' '}
      {sym}
      {suffix}
    </ValueWrapper>
  ) : (
    <ValueWrapper {...props}>
      {res}
      {' '}
      {sym}
      {suffix}
    </ValueWrapper>
  );
};

export const Dim = styled.span`
  opacity: 0.5;
`;

const Wrapper = styled.div`
  font-size: ${props => props.size + 'rem'};
  text-align: ${props => props.ta};
  margin-left: ${props => (props.ml || 0) + 'rem'};
  margin-right: ${props => (props.mr || 0) + 'rem'};
  padding: ${props => (props.pad || 0) + 'rem'};
  opacity: ${props => props.opacity || 1};
  white-space: nowrap;
`;

const ValueWrapper = styled.span`
  font-size: ${props => props.size};
  text-align: ${props => props.ta};
  margin-left: ${props => (props.ml || 0) + 'rem'};
  margin-right: ${props => (props.mr || 0) + 'rem'};
  padding: ${props => (props.pad || 0) + 'rem'};
  opacity: ${props => props.opacity || 1};
  white-space: nowrap;
`;

const Title = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: ${props => props.size + 'rem'};
`;

const InlineTitle = styled.span`
  color: rgba(255, 255, 255, 0.52);
  font-size: ${props => props.fontSize};
  margin-right: 15px;
`;



export default DataBox;
