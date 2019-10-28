import React from 'react';
import styled from 'styled-components';
import { FlexRow } from './index';
import { Tz } from './Tz';
import { formatCurrency, formatValue, formatDayTime, formatDay, formatTime, isUndefined } from '../../utils';

//Todo refactoring
const DataBox = ({
  value,
  title,
  valueType,
  valueOpts,
  type = '',
  valueSize = 1.25,
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
          <FlexRow justifyContent="space-between" alignItems="center">
            {<div style={{ paddingRight: '10px' }}>{title}</div>}
            {value !== undefined && (
              <Title size={titleSize}>
                <Value type={valueType} value={value} {...valueOpts} size={valueSize} />
              </Title>
            )}
          </FlexRow>
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
  type,
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
    case 'text':
      return [prefix, value, suffix].join('');
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
      sym = isUndefined(sym) ? 'ꜩ' : sym;
      if (!!digits) {
        res = formatCurrency(value, '.' + digits + 's');
      } else {
        res = formatCurrency(value, ',');
      }
      break;
    case 'currency-short':
      sym = isUndefined(sym) ? 'ꜩ' : sym;
      res = formatCurrency(value, '~s');
      break;
    case 'currency-flex':
      sym = isUndefined(sym) ? 'ꜩ' : sym;
      res = formatCurrency(value, ',.' + digits + 'r');
      break;
    case 'currency-full':
      sym = isUndefined(sym) ? 'ꜩ' : sym;
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
    case 'value-full':
      if (!value && zero) {
        res = zero;
      } else {
        res = formatValue(value, ',');
      }
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
        res = formatValue(Math.round(value), ',');
      }
  }
  let arr = re.exec(res);
  return arr && arr.length ? (
    <ValueWrapper {...props}>
      {`${prefix}${arr[1]}`}
      {dim ? <Dim>.{arr[2]}</Dim> : '.' + arr[2]}
      {arr[3]}
      {arr[3] ? '' : ' '}
      {sym === 'ꜩ' ? <Tz fontSize={fontSize} /> : sym}
      {suffix}
    </ValueWrapper>
  ) : (
    <ValueWrapper {...props}>
      {res}
      {res.match(/.*[MkGmµ]$/) ? '' : ' '}
      {sym === 'ꜩ' ? <Tz fontSize={fontSize} /> : sym}
      {suffix}
    </ValueWrapper>
  );
};

export const Dim = styled.small`
  opacity: 0.7;
  font-size: 85%;
  font-weight: 200;
`;

const Wrapper = styled.span`
  font-size: ${props => props.size + 'rem'};
  text-align: ${props => props.ta};
  margin-left: ${props => (props.ml || 0) + 'rem'};
  margin-right: ${props => (props.mr || 0) + 'rem'};
  padding: ${props => (props.pad || 0) + 'rem'};
  opacity: ${props => props.opacity || 1};
  white-space: nowrap;
`;

const ValueWrapper = styled.span`
  font-size: ${props => props.fontSize};
  text-align: ${props => props.ta};
  margin-left: ${props => (props.ml || 0) + 'px'};
  margin-right: ${props => (props.mr || 0) + 'px'};
  white-space: nowrap;
`;

const Title = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: ${props => props.size + 'rem'};
`;

export default DataBox;
