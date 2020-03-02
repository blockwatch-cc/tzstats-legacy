import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getHashOrBakerName } from '../../../../utils';
import {
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableCellMinMax,
  TableDetails,
  NoDataFound } from '../../../Common';

const isSimpleType = typ => ['int','nat','mutez','bool'].indexOf(typ) > -1;
const isAddressType = typ => ['key_hash','address','contract'].indexOf(typ) > -1;
// const isContainerType = typ => ['list','set','map','big_map'].indexOf(typ) > -1;
const isString = val => typeof val === 'string' || val instanceof String;
const isArray = val => Array.isArray(val);
const isObject = val => typeof val === 'object' && val !== null && !isArray(val);
// const isBool = val => typeof val === "boolean";
// const isNumber = val => !isNaN(parseFloat(val)) && !isNaN(val - 0)
const isDefined = val => typeof val !== 'undefined';
// const isAddress = val => isString(val) && val.length === 36;
const isCode = val => isArray(val) && val.length && isDefined(val[0].prim);


function f(v, pos) {
  return v.split('@')[pos];
}

function fp(v, pos) {
  return parseInt(f(v,pos));
}

function j(v) {
  return isObject(v)||isArray(v)?JSON.stringify(v,null,2):undefined;
}

const StorageTable = ({ token, contract }) => {
  const rows = flattenStorage(token);
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={3}>#</TableHeaderCell>
        <TableHeaderCell width={47}>Key/Type</TableHeaderCell>
        <TableHeaderCell width={50}>Content</TableHeaderCell>
      </TableHeader>
      <TableBody height="calc(100vh - 450px)">
      {
        rows && rows.length ? (
          rows.map((row, i) => {
            return (
              <TableRow key={i}>
                <TableCell width={3}><TableDetails>{row.c}</TableDetails></TableCell>
                <TableCell width={47} pl={row.l*15}><KeyType label={row.k} value={row.kt} /></TableCell>
                { isCode(row.v) ? (
                  <TableCellMinMax width={50}>
                    <CodeWrapper>
                      <PreWrapper>
                        <Value type={row.vt} value={row.v} />
                      </PreWrapper>
                    </CodeWrapper>
                  </TableCellMinMax>
                  ) : (
                  <TableCell width={50}>
                    <KVWrapper>
                      <Value type={row.vt} value={row.v} />
                    </KVWrapper>
                  </TableCell>
                  )
                }
              </TableRow>
            );
          })
        ) : (
          <NoDataFound />
        )
      }
      </TableBody>
    </>
  );
};

function flattenStorage(token) {
  const store = token.storage.value;
  const typ = token.script.storage_type;
  return (store&&typ)?flatten(typ, store, 0, 1, token):[];
}

// render objects
//  c - row counter
//  l - indent level
//  k - key name
//  kt - key type
//  v - value
//  vt - value type
function flatten(typ, value, level, counter, token) {
  let res = [];
  var vkeys, tkeys;
  // be resilient against simple/packed data where tye is 'bytes' and
  // value may be an object or array
  if (isObject(value)) {
    vkeys = Object.keys(value).sort((a,b) => fp(a,0)-fp(b,0));
  } else {
    res.push({
      c: counter,
      l: level,
      k: '0',
      kt: f(typ,2) || f(typ,1) || typ,
      v: value,
      vt: typ,
    });
    return res;
  }
  if (isObject(typ)) {
    tkeys = Object.keys(typ).sort((a,b) => fp(a,0)-fp(b,0));
  } else {
    res.push({
      c: counter,
      l: level,
      k: '0',
      kt: f(typ,2) || f(typ,1) || typ,
      v: value,
      vt: typ,
    });
    return res;
  }
  tkeys.forEach((key, i) => {
    let val = value[vkeys[i]];
    const ktyp = f(key,2) || ( isString(val) ? val : f(key,1) );
    switch (ktyp) {
    case 'big_map':
      res.push({
        c: counter,
        l: level,
        k: key,
        kt: ktyp,
        v: isObject(val)?token.id:val,
        vt: 'int',
      });
      counter++;
      break;
    case 'map':
      // add 'n entries' line
      res.push({
        c: counter,
        l: level,
        k: key,
        kt: typ[key],
        v: Object.keys(val).length,
        vt: 'counter',
      });
      counter++;
      // unwrap elements
      Object.keys(val).forEach((k,i) => {
        // nested maps / objects
        if (isObject(val[k])) {
          // add 'n entries' line
          res.push({
            c: counter,
            l: level+1,
            k: k,
            kt: typ[key]['0'],
            v: Object.keys(val[k]).length,
            vt: 'counter',
          });
          counter++;
          // recurse and append
          let rec = flatten(typ[key]['1'], val[k], level+2, counter, token);
          counter += rec.length;
          res.push(...rec);
        } else {
          res.push({
            c: counter,
            l: level+1,
            k: k,
            kt: null, // typ[key]['0'],
            v: val[k],
            vt: typ[key]['1'],
          });
          counter++;
        }
      });
      break;
    case 'set':
    case 'list':
      // add 'n entries' line
      res.push({
        c: counter,
        l: level,
        k: key,
        kt: typ[key],
        v: Object.keys(val).length,
        vt: 'counter',
      });
      counter++;
      // unwrap elements, val is an Array
      val.forEach((e,i) => {
        // nested maps / objects
        if (isObject(e)) {
          // recurse and append
          let rec = flatten(typ[key], e, level+1, counter, token);
          counter += rec.length;
          res.push(...rec);
        } else {
          res.push({
            c: counter,
            l: level+1,
            k: i.toString(),
            kt: null,
            v: e,
            vt: typ[key],
          });
          counter++;
        }
      });
      break;
    case 'lambda':
      res.push({
        c: counter,
        l: level,
        k: key,
        kt: typ[key],
        v: val,
        vt: ktyp,
      });
      counter++;
      break;
    default:
      // nested maps / objects
      if (isObject(val)) {
        // add 'n entries' line
        res.push({
          c: counter,
          l: level,
          k: key,
          kt: typ[key],
          v: Object.keys(val).length,
          vt: 'counter',
        });
        counter++;
        // recurse and append
        let rec = flatten(typ[key], val, level+1, counter, token);
        counter += rec.length;
        res.push(...rec);
      } else {
        res.push({
          c: counter,
          l: level,
          k: key,
          kt: typ[key],
          v: val,
          vt: typ[key],
        });
        counter++;
      }
    }
  });
  return res;
}

const KeyType = ({ label, value }) => {
  const typ = f(label,2) || (isString(value) ? value : f(label,1));
  let name = f(label,1) || f(label,0);
  if (name === typ) {
    name = f(label,0);
  }
  switch (typ) {
  case 'big_map':
  case 'map':
    return (
      <>
        <Var>{name}</Var>:&nbsp;
        <Typ>{typ}</Typ>&nbsp;{'{'}&nbsp;
        <Typ title={j(value['0'])}>
          { isString(value['0'])?value['0']:'object' }
        </Typ>
        &nbsp;=>&nbsp;
        <Typ title={j(value['1'])}>
          { isString(value['1'])?value['1']:'object' }
        </Typ>
        &nbsp;{'}'}
      </>
    );
  case 'set':
  case 'list':
    return (
      <>
        <Var>{name}</Var>:&nbsp;
        <Typ>{typ}</Typ>&nbsp;{'{'}&nbsp;
        <Typ title={j(value['0'])}>
          { isString(value['0'])?value['0']:'object' }
        </Typ>
        &nbsp;{'}'}
      </>
    );
  case 'lambda':
    return (
      <>
        <Var>{name}</Var>:&nbsp;
        <Typ title={j(value)}>{typ}</Typ>
      </>
    );
  default:
    return ((isAddressType(typ) || !typ) && name.length === 36) ? (
      <Link to={`/${name}`}><Var>{name}</Var></Link>
    ) : (
      <>
        <Var>{name}</Var>{typ&&':'}&nbsp;
        <Typ>{typ}</Typ>
      </>
    );
  }
};

const Value = ({ type, value }) => {
  // const typ = f(label,2) || f(label,1) || type; // type is either third part or second
  // console.log(label, keytype, value, typ);
  switch (type) {
  case 'lambda':
    return <Code>{j(value)}</Code>;
  case 'bool':
    return <Simple>{value.toString()}</Simple>;
  case 'counter':
    return <Hint>{value} {value!==1?'entries':'entry'}</Hint>
  case 'key_hash': case 'address': case 'contract':
    return <Link to={`/${value}`}><Var>{getHashOrBakerName(value)}</Var></Link>;
  default:
    return isSimpleType(type) ? (
      <Simple>{value}</Simple>
    ) : (
      <Var title={j(value)}>{value}</Var>
    );
  }
};

// const ListArg = styled.span`
//   &:not(:last-child):after {
//     content: ",";
//     padding-right: 4px;
//   }
// `;

const CodeWrapper = styled.div`
  margin: 0;
  line-height: 0;
  position: relative;
  background: #494c5e;
  border-top: 20px solid #3a3d4a;
  border-left: 1px solid #3a3d4a;
  border-right: 1px solid #3a3d4a;
  border-bottom: 1px solid #3a3d4a;
  // display: flex;
  // flex-basis: 100%;
  // flex-shrink: 0;
  // flex: 1;
  width: 100%;
  &:before{
    content: 'Code';
    color: #999;
    position: absolute;
    top: -10px;
    left: 6px;
  }
`;

const PreWrapper = styled.pre`
  line-height: 1;
  margin: 0;
  padding: 5px;
  overflow: auto;
  // display: flex;
  // flex-basis: 100%;
  // flex-shrink: 0;
  // flex: 1;
`;

const Code = styled.code`
  padding: 2px 0;
  margin: 0;
  color: #59C1FF;
  white-space: pre;
  line-height: 1;
  font-family: courier,sans-serif;
`;

const KVWrapper = styled.div`
  white-space: normal;
  display: block;
`;

const Var = styled.span`
  color: #59C1FF;
`;

const Typ = styled.span`
  color: #FF72EC;
`;

const Simple = styled.span`
  color: #64E165;
`;

const Hint = styled.span`
  color: #999;
  font-style: italic;
`;

export default StorageTable;
