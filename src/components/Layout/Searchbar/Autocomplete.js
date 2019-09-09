import React from 'react';
import styled from 'styled-components';
import { FlexRow, FlexRowSpaceBetween } from '../../Common';

const Autocomplete = ({
  searchHistory,
  suggestions,
  isFocus,
  onMouseLeave,
  onMouseEnter,
  handleSearch,
  cleanSearchHistory,
  width,
}) => {
  return (
    isFocus &&
    searchHistory.length > 0 && (
      <Wrrapper width={width} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
        {suggestions.map((item, i) => {
          return (
            <AutocompleteItem key={i} onClick={e => handleSearch(item.value, item.type)}>
              <TypeSearch>{item.type}</TypeSearch>
              {item.value}
            </AutocompleteItem>
          );
        })}
        <FlexRowSpaceBetween>
          <Title>Recent History</Title>
          <CleanButton onClick={e => cleanSearchHistory()}>Clean History</CleanButton>
        </FlexRowSpaceBetween>

        {searchHistory.map((item, i) => {
          return (
            <AutocompleteItem key={i} onClick={e => handleSearch(item.value)}>
              <TypeSearch>{item.type}</TypeSearch>
              {item.value}
            </AutocompleteItem>
          );
        })}
      </Wrrapper>
    )
  );
};
const Wrrapper = styled.div`
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

const Title = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  margin: 10px;
`;

const AutocompleteItem = styled(FlexRow)`
  padding: 10px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
    background: #424552;
  }
`;
const TypeSearch = styled.div`
  width: 150px;
`;

export default Autocomplete;
