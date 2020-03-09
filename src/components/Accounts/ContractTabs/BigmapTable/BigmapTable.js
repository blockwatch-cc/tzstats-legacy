import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  getHashOrBakerName,
  formatValue,
  isSimpleType,
  isAddressType,
  // isContainerType,
  isString,
  isArray,
  isObject,
  isBool,
  isNumber,
  isDefined,
  isAddress,
  isCode,
  f,
  fp,
  j,
  utf8ArrayToStr,
  fromHexString,
} from '../../../../utils';
import {
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableCellMinMax,
  TableDetails,
  NoDataFound,
  Spinner } from '../../../Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';

const init = { table: [], isLoaded: false, id: null, eof: false };

const BigmapTable = ({ token, bigmapid }) => {
  const [data, setData] = React.useState(init);
  useInfiniteScroll(fetchMore, 'bigmap_'+bigmapid);

  async function fetchMore() {
    if (data.eof) { return; }
    await token.more(bigmapid);
    setData({
      table: token.bigmaps[bigmapid].values,
      isLoaded: true,
      id: bigmapid,
      eof: token.bigmaps[bigmapid].eof,
    });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      await token.more(bigmapid);
      setData({
        table: token.bigmaps[bigmapid].values,
        isLoaded: true,
        id: bigmapid,
        eof: token.bigmaps[bigmapid].eof,
      });
    };
    fetchData();
    return function cleanup() {
      setData({...init});
    };
  }, [bigmapid, token]);

  return <BigmapTableTpl data={data} token={token} bigmapid={bigmapid} />;
};

const BigmapTableTpl = ({ data, token, bigmapid }) => {
  const typ = token.bigmaps[bigmapid].meta.type;
  let rows = flattenBigmap(typ, data.table);
  // console.log(rows);
  return (
    <>
      <TableHeader>
        <TableHeaderCell width={3}>#</TableHeaderCell>
        <TableHeaderCell width={37}>Key</TableHeaderCell>
        <TableHeaderCell width={50}>Value</TableHeaderCell>
        <TableHeaderCell width={10}>Last Update</TableHeaderCell>
      </TableHeader>
      <TableBody id={'bigmap_'+bigmapid} height="calc(100vh - 450px)">
      {
        data.isLoaded && data.id === bigmapid ? (
          rows && rows.length ? (
            rows.map((row, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={3}><TableDetails>{row.c?row.c:''}</TableDetails></TableCell>
                  <TableCell width={37} pl={row.l*15}><KeyType label={row.k} value={row.kt} /></TableCell>
                    { isCode(row.v) ? (
                      <TableCellMinMax width={50}>
                        <CodeWrapper>
                          <PreWrapper>
                            <Value type={row.vt} value={row.v} utf8={token.config.utf8} />
                          </PreWrapper>
                        </CodeWrapper>
                      </TableCellMinMax>
                      ) : (
                      <TableCell width={50}>
                        <KVWrapper>
                          <Value type={row.vt} value={row.v} utf8={token.config.utf8} />
                        </KVWrapper>
                      </TableCell>
                      )
                    }
                  <TableCell width={10}>{row.lv?(<Link to={`/${row.ln}`}>{formatValue(row.lv)}</Link>):''}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <NoDataFound />
          )
        ) : (
          <Spinner />
      )}
      </TableBody>
    </>
  );
};

// Note: no type available for unpacked values: must take from obj props
function flattenBigmap(typ, entries) {
  let res = [];
  entries.forEach((e, i) => {
    let val = isDefined(e.value_unpacked) ? e.value_unpacked : e.value;

    if (isObject(val)) {
      // render key for complex value
      res.push({
        c: i+1,
        l: 0,
        k: e.key_pretty||e.key, // TODO: handle unpacked keys
        kt: typ.key_type,
        v: Object.keys(val).length,
        vt: 'counter',
        ln: e.meta.block,
        lv: e.meta.height,
      });

      // console.log("Object", val);

      // render complex value
      res.push(...flatten(typ.value_type, val, 1));

    } else {
      // render simple key and value
      res.push({
        c: i+1,
        l: 0,
        k: e.key_pretty||e.key, // TODO: handle unpacked keys
        kt: typ.key_type,
        v: val,
        vt: typ.value_type,
        ln: e.meta.block,
        lv: e.meta.height,
      });
    }
  });
  return res;
}

// render objects
//  c - row counter
//  l - indent level
//  k - key name
//  kt - key type
//  v - value
//  vt - value type
//  l  - link (update block hash)
//  lv - link value (update block height)
function flatten(typ, value, level) {
  let res = [];
  var vkeys, tkeys;
  // be resilient against simple/packed data where type is 'bytes' and
  // value may be an object or array
  if (isObject(value)) {
    vkeys = Object.keys(value).sort((a,b) => fp(a,0)-fp(b,0));
  } else {
    vkeys = ['#'];
    value = {'#': value};
  }
  if (isObject(typ)) {
    tkeys = Object.keys(typ).sort((a,b) => fp(a,0)-fp(b,0));
  } else {
    tkeys = vkeys;
  }
  tkeys.forEach((key, i) => {
    let val = value[vkeys[i]];
    const ktyp = f(key,2) || ( isString(val) ? val : f(key,1) );
      // console.log("Value", ktyp, typ[key], val);
    switch (ktyp) {
    case 'map':
      // add 'n entries' line
      res.push({
        l: level,
        k: key,
        kt: typ[key],
        v: Object.keys(val).length,
        vt: 'counter',
      });
      // unwrap elements
      Object.keys(val).forEach((k,i) => {
        // nested maps / objects
        if (isObject(val[k])) {
          // add 'n entries' line
          res.push({
            l: level+1,
            k: k,
            kt: typ[key]['0'],
            v: Object.keys(val[k]).length,
            vt: 'counter',
          });
          // recurse and append
          let rec = flatten(typ[key]['1'], val[k], level+2);
          res.push(...rec);
        } else {
          res.push({
            l: level+1,
            k: k,
            kt: null, // typ[key]['0'],
            v: val[k],
            vt: typ[key]['1'],
          });
        }
      });
      break;
    case 'set':
    case 'list':
      // add 'n entries' line
      res.push({
        l: level,
        k: key,
        kt: typ[key],
        v: Object.keys(val).length,
        vt: 'counter',
      });
      // unwrap elements, val is an Array
      val.forEach((e,i) => {
        // nested maps / objects
        if (isObject(e)) {
          // recurse and append
          res.push({
            l: level+1,
            k: i.toString(),
            kt: null,
            v: Object.keys(e).length,
            vt: 'counter',
          });
          let rec = flatten(typ[key], e, level+2);
          res.push(...rec);
        } else {
          res.push({
            l: level+1,
            k: i.toString(),
            kt: null,
            v: e,
            vt: typ[key],
          });
        }
      });
      break;
    case 'lambda':
      res.push({
        l: level,
        k: key,
        kt: typ[key],
        v: value,
        vt: ktyp,
      });
      break;
    // case 'bytes':
    //   //
    //   break;
    default:
      // nested maps / objects
      if (isObject(val)) {
        // add 'n entries' line
        res.push({
          l: level,
          k: key,
          kt: typ[key],
          v: Object.keys(val).length,
          vt: 'counter',
        });
        // recurse and append
        let rec = flatten(typ[key], val, level+1);
        res.push(...rec);
      } else {
        res.push({
          l: level,
          k: key,
          kt: typ[key],
          v: val,
          vt: typ[key]||f(key,1),
        });
      }
    }
  });
  return res;
}

const KeyType = ({ label, value }) => {
  const typ = f(label,2) || (isString(value) ? value : f(label,1));
  let name = f(label,1) || f(label,0);
  if (name === 'option' || name === typ ) {
    name = f(label,0);
  }
  switch (typ) {
  case 'big_map':
  case 'map':
    // guard against undefined key types (ie. when handling unpacked data)
    let kt = isObject(value)?value['0']:typ;
    let vt = isObject(value)?value['1']:'?';
    return (
      <KVWrapper>
        <Var>{name}</Var>:&nbsp;
        <Typ>{typ}</Typ>&nbsp;{'{'}&nbsp;
        <Typ title={j(kt)}>
          { isString(kt)?kt:'object' }
        </Typ>
        &nbsp;=>&nbsp;
        <Typ title={j(vt)}>
          { isString(vt)?vt:'object' }
        </Typ>
        &nbsp;{'}'}
      </KVWrapper>
    );
  case 'set':
  case 'list':
    // guard against undefined key types (ie. when handling unpacked data)
    let v = isObject(value)?value['0']:'?';
    return (
      <KVWrapper>
        <Var>{name}</Var>:&nbsp;
        <Typ>{typ}</Typ>&nbsp;{'{'}&nbsp;
        <Typ title={j(v)}>
          { isString(v)?v:'object' }
        </Typ>
        &nbsp;{'}'}
      </KVWrapper>
    );
  case 'lambda':
    return (
      <KVWrapper>
        <Var>{name}</Var>:&nbsp;
        <Typ>{typ}</Typ>&nbsp;
        <Typ title={j(value)}>[...]</Typ>
      </KVWrapper>
    );
  case 'or':
    return (
      <KVWrapper>
        <Var>{name}</Var>:&nbsp;
        <Typ>{typ}</Typ>
        ({
          Object.values(value).map((v,i) => {
            return (<ListArg key={i}><Typ title={j(v)}>{isString(v)?v:'object'}</Typ></ListArg>);
          })
        })
      </KVWrapper>
    );
  default:
    return ((isAddressType(typ) || !typ) && name.length === 36) ? (
      <Link to={`/${name}`}><Var>{getHashOrBakerName(name)}</Var></Link>
    ) : (
      <KVWrapper>
        <Var>{name}</Var>{typ&&':'}&nbsp;
        <Typ>{typ}</Typ>
      </KVWrapper>
    );
  }
};

const Value = ({ type, value, utf8 }) => {
  if (value === null) {
    type = 'null';
  }
  switch (type) {
  case 'key_hash': case 'address': case 'contract':
    return <Link to={`/${value}`}><Var>{getHashOrBakerName(value)}</Var></Link>;
  case 'lambda':
    return <Code>{j(value)}</Code>;
  case 'bool':
    return <Simple>{value.toString()}</Simple>;
  case 'counter':
    return <Hint>{value} {value!==1?'entries':'entry'}</Hint>
  case 'null':
    return <Hint>null</Hint>
  case 'bytes':
    // data may be unpacked and untyped, so we have to detect type from
    // javascript type
    switch (true) {
    case isCode(value):
      return <Code>{j(value)}</Code>;
    case isArray(value):
      return (
        <>
        [
          {
            value.map((e, i) => {
              return (<ListArg key={i}>{value}</ListArg>)
            })
          }
        ]
        </>
      );
    case isBool(value) || isNumber(value):
      return <Simple>{value.toString()}</Simple>;
    case utf8 && isString(value) && /^[0-9A-F]+$/i.test(value):
      try {
        const utf8 = utf8ArrayToStr(fromHexString(value));
        // console.log("HEX->UTF-8", value, utf8);
        return <Simple>{utf8}</Simple>;
      }
      catch(e) {
        return <Simple>{value}</Simple>;
      }
    case isAddress(value):
      return <Link to={`/${value}`}><Var>{getHashOrBakerName(value)}</Var></Link>;
    default:
      return <Simple>{value}</Simple>;
    }
  default:
    return isSimpleType(type) ? (
      <Simple>{value}</Simple>
    ) : (
      <Var title={j(value)}>{value}</Var>
    );
  }
};

const ListArg = styled.span`
  &:not(:last-child):after {
    content: ",";
    padding-right: 4px;
  }
`;

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
  max-width: 420px;
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
  word-wrap: anywhere;
  max-height: 200px;
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
  word-wrap: anywhere;
  display: flex;
  flex-grow: 1;
  flex-shrink: 2;
  flex-basis: 100%;
`;

const Var = styled.span`
  color: #59C1FF;
`;


const Typ = styled.span`
  color: #FF72EC;
  white-space: nowrap;
`;

const Simple = styled.span`
  color: #64E165;
`;

const Hint = styled.span`
  color: #999;
  font-style: italic;
`;

export default BigmapTable;
