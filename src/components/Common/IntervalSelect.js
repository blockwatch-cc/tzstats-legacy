import React, { Component } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import styled from 'styled-components';

class IntervalSelect extends Component {
  renderItem(item, { modifiers }) {
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        text={`Last ${item.interval} days`}
        key={item.rank}
      />
    );
  }

  render() {
    const { items, item } = this.props;

    const buttonText = `Last ${item.interval} days`;

    return (
      <Select
        items={items}
        filterable={false}
        itemRenderer={this.renderItem}
        noResults={<MenuItem disabled text="No results." />}
        popoverProps={{ minimal: true }}
      >
        <StyledSelect rightIcon="chevron-down" text={buttonText} righticonname="double-caret-vertical" />
      </Select>
    );
  }
}
const StyledSelect = styled(Button)`
  .bp3-button {
    box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 -1px 0 rgba(16, 22, 26, 0.1) !important;
    background-color: black !important;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0)) !important;
    color: #fff !important;
  }
`;

export default IntervalSelect;
