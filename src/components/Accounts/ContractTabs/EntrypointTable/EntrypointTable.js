import React from 'react';
import styled from 'styled-components';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails, Value } from '../../../Common';

function isString(v) {
  return typeof v === 'string' || v instanceof String;
}

const EntrypointTable = ({ token, contract }) => {
  const ep = token.script.entrypoints;
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={3}>Id</TableHeaderCell>
        <TableHeaderCell width={70}>Entrypoint</TableHeaderCell>
        <TableHeaderCell width={10}>Branch</TableHeaderCell>
        <TableHeaderCell width={10} justify="flex-end">Call Stats</TableHeaderCell>
      </TableHeader>
      <TableBody height="calc(100vh - 450px)">
        {
          Object.values(ep).sort((a,b) => a.id-b.id).map((e, i) => {
            return (
              <TableRow key={i}>
                <TableCell width={3}><TableDetails>{e.id}</TableDetails></TableCell>
                <TableCell width={70}><CallTpl entry={e} /></TableCell>
                <TableCell width={10}>{e.branch||'(root)'}</TableCell>
                <TableCell width={10} justify="flex-end">
                  <Value value={contract.call_stats[e.id]} />
                </TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
    </>
  );
};

const CallTpl = ({ entry }) => {
  return (
    <FunWrapper>
      <Fname>{entry.call}</Fname> (
      {
        Object.keys(entry.type)
        .sort((a,b) => parseInt(a.split('@')[0])-parseInt(b.split('@')[0]))
        .map((key, i, arr) => {
          return (
            <Farg key={i}>
              <Varname>{key.split('@')[1]||key.split('@')[0]}</Varname>:&nbsp;
              <Typname title={JSON.stringify(entry.type[key],null,2)}>{isString(entry.type[key])?entry.type[key]:'object'}</Typname>
            </Farg>
          );
        })
      }
      )
    </FunWrapper>
  );
};

const FunWrapper = styled.div`
  white-space: normal;
  word-wrap: normal;
  flex-grow: 1;
  flex-shrink: 2;
  flex-basis: 100%;
`;

const Fname = styled.span`
  color: #fff;
`;

const Farg = styled.span`
  &:not(:last-child):after {
    content: ", ";
  }
`;

const Varname = styled.span`
  color: #59C1FF;
`;

const Typname = styled.span`
  color: #FF72EC;
`;

export default EntrypointTable;
