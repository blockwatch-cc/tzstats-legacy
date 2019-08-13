import React from 'react';
import styled from 'styled-components';

const Pagination = props => {
  const { offset, totalItemsCount, pageSize, visiblePagesCount, onPageClick } = props;
  const pagesTotal = Math.ceil(totalItemsCount / pageSize);
  let currentPageNum = Math.floor(offset / pageSize);

  let firstDisabled = currentPageNum <= 0;
  let lastDisabled = currentPageNum >= pagesTotal - 1;

  let prevDisabled = currentPageNum <= 0;
  let nextDisabled = currentPageNum >= pagesTotal - 1;

  let firstShownPage = 0;
  if (pagesTotal > visiblePagesCount) {
    firstShownPage = currentPageNum - Math.floor(visiblePagesCount / 2);
    firstShownPage = firstShownPage < 0 ? 0 : firstShownPage;
  }

  let showPagesCount =
    pagesTotal - firstShownPage < visiblePagesCount ? pagesTotal - firstShownPage : visiblePagesCount;
  let pages = Object.keys(new Int8Array(showPagesCount)).map(n => Number(n) + firstShownPage);

  return (
    <Wrapper aria-label="Page navigation">
      <Content>
        <First className={firstDisabled ? 'inactive' : ''}>
          <PageLink caria-label="First" onClick={() => !firstDisabled && onPageClick(0)}>
            &laquo;
          </PageLink>
        </First>
        <Previous className={prevDisabled ? 'inactive' : ''}>
          <PageLink aria-label="Previous" onClick={() => !prevDisabled && onPageClick(currentPageNum - 1)}>
            &lsaquo;
          </PageLink>
        </Previous>
        {pages.map((pageNum, index) => {
          return (
            <Page
              key={index}
              className={currentPageNum === pageNum ? 'active' : ''}
              onClick={() => onPageClick(pageNum)}
            >
              <PageLink>{pageNum + 1}</PageLink>
            </Page>
          );
        })}
        <Next className={nextDisabled ? 'inactive' : ''}>
          <PageLink aria-label="Next" onClick={() => !nextDisabled && onPageClick(currentPageNum + 1)}>
            &rsaquo;
          </PageLink>
        </Next>
        <Last className={lastDisabled ? 'inactive' : ''}>
          <PageLink aria-label="Last" onClick={() => !lastDisabled && onPageClick(pagesTotal - 1)}>
            &raquo;
          </PageLink>
        </Last>
      </Content>
    </Wrapper>
  );
};

const Content = styled.div`
  display: flex;
  justify-content: left;
  margin: 20px 0px;
`;

const PageItem = styled.li`
  min-width: 24px;
  height: 24px;
  text-align: center;
  margin: 0px 8px;
`;
const PageLink = styled.span`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0px 4px;
  text-decoration: unset;
  line-height: 24px;
  &:focus {
    box-shadow: none;
  }
`;
const First = styled(PageItem)``;

const Previous = styled(PageItem)``;

const Next = styled(PageItem)``;

const Last = styled(PageItem)``;
const Page = styled(PageItem)``;

const Wrapper = styled.nav``;

export default Pagination;

// .pagination {
//     display: flex;
//     justify-content: left;
//     margin: 20px 0px;

//     .page-item {
//         min-width: 24px;
//         height: 24px;
//         text-align: center;
//         margin: 0px 8px;
//         .page-link {
//             background-color: transparent;
//             border: none;
//             cursor: pointer;
//             padding: 0px 4px;
//             text-decoration: unset;
//             line-height: 24px;
//         }

//         .page-link:focus {
//             box-shadow: none;
//         }

//         &.inactive {
//             .page-link {
//                 color: $color-dark-light;
//             }
//         }

//         &.active {
//             border-radius: 2px;
//             background-color: $color-dark;
//             .page-link {
//                 color: $color-white;
//                 z-index: initial;
//             }
//         }
//     }
// }
