import React from 'react';
import { Card, FlexRowSpaceBetween, DataBox } from '../../Common'
import styled from 'styled-components';
import _ from 'lodash';
import { proposals } from '../../../config/proposals'
import { Link } from 'react-router-dom';

const ElectionHistory = ({ electionHistory, currentElection }) => {

    const periodMap = { proposal: 1, testing_vote: 2, testing: 3, promotion_vote: 4 }
    return (
        <Wrapper>
            <Card title="Election History" >
                <FlexRowSpaceBetween>
                    {electionHistory.map((item, i) => {

                        return (
                            <ElectionBoxWrapper key={i} >
                                <ElectionBox
                                    to={`/election/${item.row_id}`}
                                    iscurrent={`${item.row_id === currentElection.election_id}`}
                                >
                                    {
                                        (new Array(periodMap[item.last_voting_period])).fill(0).map((item, i) => <PeriodBox key={i} />)
                                    }

                                </ElectionBox>
                                <DataBox
                                    title={proposals[item.proposal]
                                        ? proposals[item.proposal].name
                                        : <span>&nbsp;</span>} />
                            </ElectionBoxWrapper>
                        )
                    })}
                </FlexRowSpaceBetween>
            </Card>

        </Wrapper>
    );
};
const ElectionBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ElectionBox = styled(Link)`
    width:25px;
    height:25px;
    background-color: #646876;
    display:flex;
    flex-direction:row;
    flex-wrap: wrap;
    margin-bottom:5px;
    cursor:pointer;
    &:hover{
        border: 1px solid #fff;
      }
    border: 1px solid ${props => props.iscurrent === 'true' ? '#fff' : '#424553'};
`
const PeriodBox = styled.div`
    background: linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%);
    width:11.5px;
    height:11.5px;
`;

const Wrapper = styled.div`
    flex: 1;
    min-width: 340px;
`;


export default ElectionHistory;

