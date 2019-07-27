import React from 'react';
import Pagination from "../Common/Pagination";
import styled from 'styled-components';


const Table = (props) => {
    return (
        <Wrapper>
            <Header>{props.columns.map((column, colIndex) => {
                return (
                    <HeaderCell key={colIndex} className={column.classes}>
                        <span>{column.header}</span>
                    </HeaderCell>
                );
            })}
            </Header>
            {props.loading && <div>Loading</div>}
            {!props.loading &&
                <>
                    {props.rows.length > 0 &&
                        props.rows.map((row, rowIndex) =>
                            (<Row key={rowIndex}>
                                {props.columns.map((column, index) => (
                                    <RowCell
                                        key={index}
                                        className={column.classes}>
                                        {
                                            column.cell(row)
                                        }
                                    </RowCell>))}
                            </Row>)
                        )}
                    {props.rows.length > 0
                        && props.showPagination
                        && props.onPageClick
                        && props.pageSize
                        && props.visiblePagesCount
                        && (<Pagination
                            offset={props.offset}
                            totalItemsCount={props.totalItemsCount}
                            pageSize={props.pageSize}
                            onPageClick={props.onPageClick}
                            visiblePagesCount={props.visiblePagesCount}
                        />
                        )}
                    {props.rows.length === 0 &&
                        <EmptyBox >
                            {props.emptyResultMessage}
                        </EmptyBox>
                    }
                </>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 12px 0px;
    border-bottom: 1px solid #f2f256;
`;
const HeaderCell = styled.div`
    padding: 0px 8px;
    flex: 0 0;
    color: #f26256;
    font-size: 10;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 16px;
`;

const Row = styled.div`
width: 100%;
padding: 12px 0px;
display: flex;
flex-direction: row;
align-items: center;
font-size: 14;
border-bottom: 1px solid #f19;
`;

const RowCell = styled.div`
    padding: 0px 8px;
    flex: 0 0;
    color: #f26256;
    font-size: 10;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 16px;
`;
const EmptyBox = styled.div`
height: 200px;
text-align: center;
display: inline-block;
vertical-align: middle;
line-height: 200px;
color: #f24141;
font-size: 16;
`;


export default Table;
