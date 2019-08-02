import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexRow, FlexRowSpaceBetween } from '../Common';

const Autocomplete = ({ suggestions, isFocus, onMouseLeave, onMouseEnter, handleSearch, cleanSuggestions }) => {

  return (

    (isFocus && suggestions.length > 0) &&
    <Wrrapper onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
      <FlexRowSpaceBetween>
        <Title>Recent History</Title>
        <CleanButton onClick={e => cleanSuggestions()}>
          Clean History
        </CleanButton>
      </FlexRowSpaceBetween>

      {
        suggestions.map((item, i) => {

          return (
            <AutocompleteItem key={i} onClick={e => handleSearch(item.value)}>
              <TypeSearch>
                {item.type}
              </TypeSearch>
              {item.value}
            </AutocompleteItem>
          )
        })
      }
    </Wrrapper>
  )
};
const Wrrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  position:absolute;
  top:62px;
  max-height:220px;
  z-index:1000;
  overflow: scroll;
  opacity:0.95;
  width:inherit;
  border-radius: 3px;
  margin-top: 1px;
  font-size: 12px;
  background-color: #262830;
`;
const CleanButton = styled.div`
  font-size: 10px;
  margin: 3px;
  padding: 3px 5px;
  cursor:pointer;
  background: #424552;
`;

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

export default Autocomplete;
