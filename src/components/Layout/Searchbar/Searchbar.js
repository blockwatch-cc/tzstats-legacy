import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import useKeyPress from '../../../hooks/useKeyPress';
import useLocalStorage from '../../../hooks/useLocalStorage';
import {
  searchBakers,
  searchProposals,
  getHashType,
} from '../../../utils';
import Autocomplete from './Autocomplete';
import { Devices } from '../../Common';
import { useGlobal } from 'reactn';
import ContainerDimensions from 'react-container-dimensions';

const Searchbar = ({ history }) => {
  const [chain] = useGlobal('chain');
  const [value, setValue] = React.useState('');
  const [suggestions, setSuggestion] = React.useState([]);
  const [isFocus, setIsFocus] = React.useState(false);
  const [isMouseEnter, setIsMouseEnter] = React.useState(false);
  const [enterPress, setKeyPressed] = useKeyPress(13);
  const [searchHistory, setHistory] = useLocalStorage('history', []);

  function saveSearch(value, type, key) {
    let newHistory = searchHistory.filter(r => r.value !== value);
    newHistory.unshift({ type: type, value: value, key: key });
    setHistory(newHistory);
  }

  const reset = () => {
    setKeyPressed(false);
    setValue('');
    setIsMouseEnter(false);
    setIsFocus(false);
    setSuggestion([]);
  };

  const search = (value, type, key) => {
    // strip comma from value
    value = value.replace(/,/g,'');
    if (!value) { return; }
    type = type || getHashType(key||value, 1) || (!isNaN(parseInt(value))?'block':null);
    if (!type) { return; }
    saveSearch(value, type, key);
    reset();
    switch (type) {
    case 'cycle':
      history.push('/cycle/'+value);
      break;
    case null:
      return;
    default:
      history.push('/'+(key||value));
    }
  };
  const handleOnChange = value => {
    const number = parseInt(value);
    let res = [];
    if (value.length > 3 && isNaN(number)) {
      const type = getHashType(value);
      switch (type) {
      case 'account':
        // account by hash
        res.push(...searchBakers(value).map(b => { return { type: type, value: b.name, key: b.key}; }));
        break;
      case 'block':
        // block by hash
        res.push({ type: type, value: value});
        break;
      case 'operation':
        // op by hash
        res.push({ type: type, value: value });
        break;
      case 'protocol':
        // proto/election by hash
        const prop = searchProposals(value);
        if (prop.length) {
          res.push({ type: type, value: prop[0].name, key: prop[0].key });
        } else {
          res.push({ type: type, value: value });
        }
        break;
      default:
        // text may be baker or election name
        res.push(...searchBakers(value).map(b => { return { type: 'account', value: b.name, key: b.key}; }));
        res.push(...searchProposals(value).map(b => { return { type: 'protocol', value: b.name, key: b.key}; }));
      };
    } else if (number <= chain.cycle) {
      res.push({ type: 'block', value: value }, { type: 'cycle', value });
    } else if (number <= chain.height) {
      res.push({ type: 'block', value: value });
    }
    setSuggestion(res);
    setValue(value);
  };

  return (
    <SearchContainer>
      <ContainerDimensions>
        {({ width, height }) => (
          <>
            <SearchWrapper>
              {enterPress && search(value)}
              <SearchInput
                type="text"
                value={value || ''}
                onChange={e => handleOnChange(e.target.value)}
                onFocus={e => setIsFocus(true)}
                onBlur={e => !isMouseEnter && setIsFocus(false)}
                placeholder="Explore blocks, operations, accounts, elections, and cycles"
              />
              {value?<CleanInput onClick={e => setValue('')}>&#8855;</CleanInput>:<></>}
            </SearchWrapper>
            <Autocomplete
              filter={value}
              width={width}
              searchHistory={searchHistory}
              isFocus={isFocus}
              suggestions={suggestions}
              handleSearch={search}
              cleanSearchHistory={e => setHistory([])}
              onMouseLeave={e => setIsMouseEnter(false)}
              onMouseEnter={e => setIsMouseEnter(true)}
            />
          </>
        )}
      </ContainerDimensions>
    </SearchContainer>
  );
};
const CleanInput = styled.div`
  background: #30313b;
  font-size: 25px;
  padding: 0 5px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  max-width: 900px;
  min-width: 900px;
  @media ${Devices.mobileL} {
    min-width: 300px;
  }
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
