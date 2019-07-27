import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { backerAccounts } from '../../config/backer-accounts';

const Searchbar = ({ history }) => {
  const [value, setValue] = useState('');
  const searchClick = () => {

    if (value.length === 36)
      value && history.push(`/account/${value}`);
    else if (value.length === 51)
      value && history.push(`/block/${value}`);
    else
      value && history.push(`/block/${backerAccounts[0]}`);
  };
  return (
    <SearchContainer>
      <SearchWrapper>
        <SearchInput
          type="text"
          value={value || ''}
          onChange={e => setValue(e.target.value)}
          placeholder="Explore by name or account hash"
        />
        <SearchButton className="search-button" type="button" value="Explore" onClick={searchClick} />
      </SearchWrapper>
    </SearchContainer>
  );
};
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0 20px 0;
`;
const SearchWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  padding: 4px;
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.42);
  background-color: #30313b;
  align-content: flex-end;
`;
const SearchInput = styled.input`
  padding: 8px 16px;
  flex-grow: 1;
  font-size: 16px;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.52);
  background: transparent;
  border: none;
  outline: none;
`;
const SearchButton = styled.input`
  border: 0;
  padding: 4px 32px;
  background-color: #4ab4cb;
  letter-spacing: 0.04em;
  border-radius: 3px;
  text-transform: uppercase;
  color: #fff;
  line-height: 24px;
  cursor: pointer;
`;

export default withRouter(Searchbar);
