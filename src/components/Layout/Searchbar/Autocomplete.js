import React from 'react';
import styled from 'styled-components';
import { Row, RowSpace } from '../../Common';

const Autocomplete = ({
  searchHistory,
  suggestions,
  isFocus,
  onMouseLeave,
  onMouseEnter,
  handleSearch,
  cleanSearchHistory,
  width,
  filter,
}) => {
  const filteredHistory = searchHistory.filter(item => {
    return item.value.startsWith(filter) || (item.key && item.key.startsWith(filter));
  });
  return (
    isFocus && (filteredHistory.length > 0 || suggestions.length > 0) && (
      <Wrapper width={width} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
        {suggestions.map((item, i) => {
          return (
            <AutocompleteItem key={i} onClick={e => handleSearch(item.value, item.type, item.key)}>
              <TypeSearch>{item.type}</TypeSearch>
              {item.value}
              <Dim>{item.key}</Dim>
            </AutocompleteItem>
          );
        })}
        {filteredHistory.length ? (
          <>
          <RowSpace>
            <Title>Recent History</Title>
            <CleanButton onClick={e => cleanSearchHistory()}>Clear History</CleanButton>
          </RowSpace>
          {filteredHistory.map((item, i) => {
            return (
              <AutocompleteItem key={i} onClick={e => handleSearch(item.value, item.type.toLowerCase(), item.key)}>
                <TypeSearch>{item.type}</TypeSearch>
                {item.value}
                <Dim>{item.key}</Dim>
              </AutocompleteItem>
            );
          })}
          </>
        ):''}
      </Wrapper>
    )
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 220px;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 55px;
  width: ${props => props.width}px;
  border-radius: 3px;
  margin-top: 1px;
  font-size: 12px;
  background-color: #262830;
`;
const CleanButton = styled.div`
  font-size: 10px;
  margin: 3px;
  padding: 3px 5px;
  cursor: pointer;
  background: #424552;
`;
const Dim = styled.div`
  color: rgba(255, 255, 255, 0.52);
  padding-left: 10px;
`;

const Title = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  margin: 10px;
`;

const AutocompleteItem = styled(Row)`
  padding: 10px;
  &:hover {
    cursor: pointer;
    background: #424552;
  }
`;
const TypeSearch = styled.div`
  width: 150px;
  text-transform: capitalize;
`;

export default Autocomplete;
