import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { backerAccounts } from '../../config/backer-accounts';
import { FlexRow, DataBox } from '../Common';
import useKeyPress from "../../hooks/useKeyPress"
import useLocalStorage from "../../hooks/useLocalStorage"


const Searchbar = ({ history }) => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [enterPress, setKeyPressed] = useKeyPress(13);
  const [suggestions, setSuggestions] = useLocalStorage('suggestions');

  const search = (searchValue) => {
    setKeyPressed(false)

    if (searchValue.length === 36) {
      setSuggestions([{ type: "Account", value: searchValue }, ...suggestions])
      searchValue && history.push(`/account/${searchValue}`);
    }
    else if (searchValue[0] === 'B' || parseInt(searchValue)) {
      setSuggestions([{ type: "Block", value: searchValue }, ...suggestions])
      searchValue && history.replace(`/block/${searchValue}`)
    }
    else if (searchValue[0] === 'o') {
      setSuggestions([{ type: "Operation", value: searchValue }, ...suggestions])
      searchValue && history.push(`/operation/${searchValue}`);
    }
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        {enterPress && search(value)}
        <SearchInput
          type="text"
          value={value || ''}
          onChange={e => setValue(e.target.value)}
          onMouseEnter={e => setIsFocus(true)}
          onFocus={e => setIsFocus(true)}
          onBlur={e => setIsFocus(false)}
          placeholder="Explore blocks, operations, accounts, elections, and cycles …"
        />
      </SearchWrapper>
      {isFocus && suggestions.length &&
        <AutocompleteWrapper onMouseLeave={e => setIsFocus(false)}>
          <Title>Recent History</Title>
          {
            suggestions.map((item) => {

              return (
                <AutocompleteItem onClick={e => search(item.value)}>
                  <TypeSearch>
                    {item.type}
                  </TypeSearch>
                  {item.value}
                </AutocompleteItem>
              )
            })
          }
        </AutocompleteWrapper>
      }
    </SearchContainer>
  );
};

const Title = styled.div`
    color: rgba(255, 255, 255, 0.52);
    font-size: 10px;
    margin: 10px;
    `;

const AutocompleteItem = styled(FlexRow)`
  padding:10px;
  &:hover {
      opacity: 0.8;
      cursor:pointer;
      background: #424552;
    }
  `

const TypeSearch = styled.div`
      width: 150px;
  `;
const AutocompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  position:absolute;
  top:62px;
  height:220px;
  z-index:1000;
  overflow: scroll;
  opacity:0.95;
  width:inherit;
  border-radius: 3px;
  margin-top: 1px;
  font-size: 12px;
  background-color: #262830;
  
  `;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
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

export default withRouter(Searchbar);
