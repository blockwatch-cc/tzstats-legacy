import React from 'react';
import styled from 'styled-components';
import { formatCurrency, formatValue } from '../../utils';

const DataBox = ({ value, title, type, isBottom = true, isFixed = true, prefix = ',' }) => {
    return (
        isBottom ?
            <Wrapper>
                {value && <Value type={type}
                    value={value}
                    isFixed={isFixed}
                    isBottom={isBottom}
                    prefix={prefix} />
                }
                {title && <Title>{title}</Title>}
            </Wrapper>
            :
            <Wrapper>
                {title && <Title>{title}</Title>}
                {value && <Value type={type}
                    value={value}
                    isFixed={isFixed}
                    isBottom={isBottom}
                    prefix={prefix} />
                }
            </Wrapper>
    )
};
const Value = ({ type, value }) => {

    switch (type) {
        case 'currency-fixed':
            return formatCurrency(value.toFixed(), ',');
        case 'currency-short':
            return formatCurrency(value, '.2s');
        case 'currency-full':
            return formatCurrency(value, ',');
        case 'currency-usd-full':
            return formatValue(value, '$,');
        case 'currency-usd-fixed':
            return formatValue(value.toFixed(), '$,');
        case 'currency-usd-short':
            return '$' + formatValue(value.toFixed(), '.2s');
        default:
            return formatValue(value.toFixed(), ',')
    }
}

const Wrapper = styled.div``;
const Title = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
`;

export default DataBox;
