import React from 'react';
import styled from 'styled-components';
import { Card, FlexRow, NoDataFound, DataBox, Spiner } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { getHashOrBakerName } from '../../../utils';
import { timeFormat } from 'd3-time-format';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails } from '../../Common';
import StakingLiveTotal from '../StakingLiveTotal';

const StakingBakerInfo = () => {
  const [isBakerTab, setIsBakerTab] = React.useState(true);
  const [data, setData] = React.useState({ table: [], isLoaded: false });
  const [, setIsFetching] = useInfiniteScroll(fetchMoreOperations, 'account-votes');

  const testTableData = [
    { name: 'Erich Maria', fee: 14, efficiency: 15, luck: 152, share: 14, time: new Date() },
    { name: 'Denzel Vashington', fee: 14, efficiency: 17, luck: 112, share: 18, time: new Date() },
  ];

  async function fetchMoreOperations() {}

  React.useEffect(() => {
    const fetchData = async () => {
      setData({ table: [], isLoaded: true });
    };
    fetchData();
    return function cleanup() {
      setData({
        table: [],
        isLoaded: false,
      });
    };
  }, []);

  return (
    <Wrapper>
      <Card title="">
        <FlexRow mb={30}>
          <Button active={isBakerTab} onClick={e => setIsBakerTab(true)}>
            Bakers
          </Button>
          <Button active={!isBakerTab} onClick={e => setIsBakerTab(false)}>
            Lifetime Totals
          </Button>
        </FlexRow>
        {isBakerTab ? (
          <>
            <TableHeader>
              <TableHeaderCell width={5}>No</TableHeaderCell>
              <TableHeaderCell width={20}>Name</TableHeaderCell>
              <TableHeaderCell width={10}>Fee</TableHeaderCell>
              <TableHeaderCell width={10}>Efficiency</TableHeaderCell>
              <TableHeaderCell width={10}>Luck</TableHeaderCell>
              <TableHeaderCell width={15}>Staking Capacity</TableHeaderCell>
              <TableHeaderCell width={20}>Cumulative Share</TableHeaderCell>
              <TableHeaderCell width={10}>Baking Since</TableHeaderCell>
            </TableHeader>
            {data.isLoaded ? (
              <TableBody id={'account-votes'}>
                {testTableData.length ? (
                  testTableData.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell width={5}>
                          <TableDetails>{i + 1}</TableDetails>
                        </TableCell>
                        <TableCell width={20}>{getHashOrBakerName(item.name)}</TableCell>
                        <TableCell width={10}>{item.fee}%</TableCell>
                        <TableCell width={10}>{item.efficiency}%</TableCell>
                        <TableCell width={10}>{item.luck}%</TableCell>
                        <TableCell width={15}>
                          <HorizontalProgressBar
                            height={10}
                            settings={[{ percent: 75, color: '#418BFD' }, { percent: 25, color: '#858999' }]}
                          />
                        </TableCell>
                        <TableCell width={20}>
                          25%
                          <BarWrapper>
                            <HorizontalProgressBar
                              height={10}
                              settings={[
                                { percent: 15, color: '#396975' },
                                { percent: 5, color: 'linear-gradient(45deg, #17E5EB 0%, #1AF9FF 100%);' },
                                { percent: 80, color: '#858999' },
                              ]}
                            />
                          </BarWrapper>
                          14%
                        </TableCell>
                        <TableCell width={10}>
                          <DataBox title={timeFormat('%b %d, %H:%M')(item.time)} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <NoDataFound />
                )}
              </TableBody>
            ) : (
              <TableBody>
                <Spiner />
              </TableBody>
            )}
          </>
        ) : (
          <StakingLiveTotal />
        )}
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;
const BarWrapper = styled.div`
  margin: 0 5px;
  width: 100%;
`;
const Button = styled.div`
  height: 24px;
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid #6f727f;
  background-color: ${props => (props.active ? '#525566' : '#424553')};
  cursor: pointer;
`;

export default StakingBakerInfo;
