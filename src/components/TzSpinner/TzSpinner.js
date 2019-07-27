import React from 'react';
import SegmentedProgressbar from './SegmentedProgressbar.js';
import styled from 'styled-components';


const NetworkCircle = props => {
    return (<Container style={{ width: '200px', height: '200px' }}>
        <SegmentedProgressbar percentage={50} />
    </Container>)
}

const Container = styled.div`
  /* ... */
`;


export default NetworkCircle;
