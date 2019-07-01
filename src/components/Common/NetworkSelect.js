import React, { Component } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

class NetworkSelect extends Component {
  renderItem(item, { modifiers }) {
    return <MenuItem active={modifiers.active} disabled={modifiers.disabled} text={`${item.name}`} key={item.rank} />;
  }

  render() {
    const { items, item, icon } = this.props;

    const buttonText = `${item.name}`;

    return (
      <Select
        items={items}
        filterable={false}
        itemRenderer={this.renderItem}
        noResults={<MenuItem disabled text="No results." />}
        popoverProps={{ minimal: true }}
      >
        <Button icon={item.icon ? item.icon : icon} text={buttonText} righticonname="double-caret-vertical" />
      </Select>
    );
  }
}

export default NetworkSelect;
