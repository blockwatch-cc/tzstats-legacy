import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import useKeyPress from '../../../hooks/useKeyPress';
import useLocalStorage from '../../../hooks/useLocalStorage';
import {
  getSearchType,
  capitalizeFirstLetter,
  getBakerHashByName,
  getProposalIdByName,
  findBakerName,
  findProposalName,
} from '../../../utils';
import Autocomplete from './Autocomplete';
import { Devices } from '../../Common';
import ContainerDimensions from 'react-container-dimensions';

const Searchbar = ({ history }) => {
  const [value, setValue] = React.useState('');
  const [suggestions, setSuggestion] = React.useState([]);
  const [isFocus, setIsFocus] = React.useState(false);
  const [isMouseEnter, setIsMouseEnter] = React.useState(false);
  const [enterPress, setKeyPressed] = useKeyPress(13);
  const [searchHistory, setHistory] = useLocalStorage('history', []);

  function saveSearch(value, type) {
    let newHistory = searchHistory.filter(r => r.value !== value);
    newHistory.unshift({ type: capitalizeFirstLetter(type), value: value });
    setHistory(newHistory);
  }

  const search = searchValue => {
    if (searchValue) {
      setKeyPressed(false);
      setValue('');
      setIsMouseEnter(true);
      setIsFocus(false);
      const proposalId = getProposalIdByName(searchValue);
      const bakerName = getBakerHashByName(searchValue);

      if (proposalId) {
        saveSearch(searchValue, 'election');
        history.push(`/election/${proposalId}`);
      } else if (bakerName) {
        saveSearch(searchValue, 'account');
        history.push(`/account/${bakerName}`);
      } else {
        let searchType = getSearchType(searchValue);
        saveSearch(searchValue, searchType);
        searchValue && history.push(`/${searchType}/${searchValue}`);
      }
    }
  };
  const handleOnChange = value => {
    if (value.length > 3) {
      const bakerName = findBakerName(value);
      const proposal = findProposalName(value);
      if (bakerName) {
        setSuggestion([{ type: 'Account', value: bakerName }]);
      } else if (proposal) {
        setSuggestion([{ type: 'Election', value: proposal }]);
      }
    }
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
                placeholder="Explore blocks, operations, accounts, elections, and cycles …"
              />
              <CleanInput onClick={e => setValue('')}>&#8855;</CleanInput>
            </SearchWrapper>
            <Autocomplete
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
  padding: 10px 0 20px 0;
  max-width: 900px;
  min-width: 900px;
  @media ${Devices.mobileL} {
    min-width: 380px;
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
