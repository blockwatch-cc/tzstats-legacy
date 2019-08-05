import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Card, FlexRowSpaceBetween, DataBox } from '../../Common'
import { getShortHash } from '../../../utils';
import { format } from 'd3-format';
import EmptyPeriod from "../EmptyPeriod/EmptyPeriod";

const ProposalPeriod = ({ proposal }) => {
    if (!proposal.proposals.length) {
        return <EmptyPeriod title={"1 No one proposal"} />
    }
    return (
        <Wrapper>
            <Card title={`1 ${'Athens'} proposal period complete`}>
                <FlexRowSpaceBetween mb={10}>
                    <TableHeader>Proposal</TableHeader>
                    <TableHeader>Hash</TableHeader>
                    <TableHeader>Source</TableHeader>
                    <TableHeader>Rolls</TableHeader>
                </FlexRowSpaceBetween>
                <TableBody>
                    {proposal.proposals.map((item, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>
                                    {i}
                                </TableCell>
                                <TableCell>
                                    {getShortHash(item.hash)}
                                </TableCell>
                                <TableCell>
                                    {getShortHash(item.source)}
                                </TableCell>
                                <TableCell>
                                    {item.rolls}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <FlexRowSpaceBetween>
                    <DataBox valueSize="14px" title="Participation Rolls"
                        value={proposal.turnout_rolls}
                    />
                    <div>
                        {`${(proposal.period_start_block)} / ${(proposal.period_end_block)}`}
                        <DataBox title="Start / End Block Heights" />
                    </div>
                </FlexRowSpaceBetween>
            </Card>
        </Wrapper>
    );
};
const TableBody = styled.div`
    height: 120px;
    overflow:scroll;
`;
const TableRow = styled(FlexRowSpaceBetween)`
&:hover {
    color: #26B2EE;
}
`

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
  font-size:14px;
`;

const TableCell = styled.div`
    font-size:12px;
    height: 25px;
    min-width: 35px;
`;
const TableHeader = styled.div`
    font-size:12px;
    color: rgba(255, 255, 255, 0.52);
`;


export default ProposalPeriod;

