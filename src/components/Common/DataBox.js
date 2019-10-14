import React from 'react';
import styled from 'styled-components';
import { FlexRow } from './index';
import { formatCurrency, formatValue, formatDayTime, formatDay, formatTime, isUndefined } from '../../utils';

//Todo refactoring
const DataBox = ({
  value,
  title,
  valueType,
  valueOpts,
  type = '',
  valueSize = '18px',
  titleSize = '10px',
  ta = 'left',
  ml = '0',
  mr = '0',
}) => {
  switch (type) {
    case 'title-bottom':
      return (
        <Wrapper ta={ta} ml={ml} mr={mr} fontSize={valueSize}>
          {title && (valueType && !value) ? (
            <Title fontSize={titleSize}>
              <Value type={valueType} value={title} {...valueOpts}/>
            </Title>
          ) : (
            <Title fontSize={titleSize}>{title}</Title>
          )}
          {value !== undefined && <Value type={valueType} value={value} />}
        </Wrapper>
      );
    case 'value-as-title':
      return (
        <Wrapper ta={ta} ml={ml} mr={mr} fontSize={valueSize}>
          {title}
          {value !== undefined && (
            <Title fontSize={titleSize}>
              <Value type={valueType} value={value} {...valueOpts}/>
            </Title>
          )}
        </Wrapper>
      );
    case 'horizontal-value-as-title':
      return (
        <Wrapper ta={ta} ml={ml} mr={mr} fontSize={valueSize}>
          <FlexRow justifyContent="space-between" alignItems="center">
            {<div style={{ paddingRight: '10px' }}>{title}</div>}
            {value !== undefined && (
              <Title fontSize={titleSize}>
                <Value type={valueType} value={value} {...valueOpts} />
              </Title>
            )}
          </FlexRow>
        </Wrapper>
      );

    default:
      return (
        <Wrapper ta={ta} ml={ml} mr={mr} fontSize={valueSize}>
          {value !== undefined && <Value type={valueType} value={value} {...valueOpts} />}
          {title && <Title fontSize={titleSize}>{title}</Title>}
        </Wrapper>
      );
  }
};

let re = /^(.*)\.([^ ]*)( .*)?$/;

export const Value = ({ type, value, prec, sym, prefix='', suffix = '', digits = 4, round = false, dim = true, zero = null }) => {
  if (value === 0 && zero) { return zero; }
  if (round) { value = Math.round(value); }
  if (prec !== undefined) { value = value.toFixed(prec); }
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
      if (!!digits) {
        res = formatCurrency(value, '.'+digits+'s', sym);
      } else {
        res = formatCurrency(value, ',', sym);
      }
      break;
    case 'currency-short':
      res = formatCurrency(value, '~s', sym);
      break;
    case 'currency-flex':
      res = formatCurrency(value, ',.'+digits+'r', sym);
      break;
    case 'currency-full':
      res = formatCurrency(value.toFixed(6), ',', isUndefined(sym)?'ꜩ':sym);
      break;
    case 'currency-usd':
      if (!!digits) {
        res = formatValue(value, '$,.'+digits+'s');
      } else {
        res = formatValue(value, '$,.2f');
      }
      break;
    case 'value-short':
      res = formatValue(Math.round(value), '.'+digits+'s');
      break;
    case 'value-full':
      res = formatValue(value, ',');
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
        res = formatValue(value, '.'+digits+'%');
      }
      break;
    default:
      res = formatValue(Math.round(value), ',');
  }
  if (!dim) {
    return [prefix, res, suffix].join('');
  }
  let arr = re.exec(res);
  return ( (arr && arr.length) ? (
    <Wrapper>{`${prefix}${arr[1]}`}<Dim>.{arr[2]}</Dim>{arr[3]} {suffix}</Wrapper>
  ) : res + suffix
  );
};

const Dim = styled.small`
  opacity: 0.7;
  font-size: 85%;
  font-weight: 200;
`

const Wrapper = styled.div`
  font-size: ${props => props.fontSize};
  text-align: ${props => props.ta};
  margin-left: ${props => props.ml + 'px'};
  margin-right: ${props => props.mr + 'px'};
  white-space: nowrap;
`;
const Title = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: ${props => props.fontSize};
`;

export default DataBox;
