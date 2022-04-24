import { Input, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BelowOptions = ({
  pagingInfo,
  setPagingInfo,
  setBoardList,
  match,
  setPageCnt,
  sortRule,
}) => {
  const nowPage = pagingInfo.number;
  const pageBlock = 10; // 페이징 넘버들의 갯수 1-10  11-20  21-30
  const totalPage = pagingInfo.totalPages;
  const lastPage = totalPage - 1;

  //이전 페이지 로직 처리
  let previousPage = nowPage - 1;
  previousPage = previousPage <= 0 ? 0 : nowPage - 1;

  //다음 페이지 로직 처리
  let nextPage = nowPage + 1;
  nextPage = nextPage >= totalPage ? totalPage - 1 : nowPage + 1;

  // 페이지 블락 시작지점(1, 11, 21, 31....)
  const startBlockPage = parseInt(nowPage / pageBlock) * pageBlock + 1;

  // 페이지 블락 종료지점(10, 20, 30, 40....)
  let endBlockPage = startBlockPage + pageBlock - 1;
  endBlockPage = totalPage < endBlockPage ? totalPage : endBlockPage;

  //게시글 갯수 변동 함수*** 아직 미완성
  // const [boardCnt, setBoardCnt] = useState(20);
  // useEffect(() => {

  // });

  const changeBoardCount = (e) => {
    setPageCnt(e.target.value);
  };

  const pagesBlocks = () => {
    const pageNumbers = [];
    for (let i = startBlockPage; i <= endBlockPage; i++) {
      const j = i - 1;

      if (nowPage + 1 === i) {
        pageNumbers.push(
          <PaginationItem key={i} disabled>
            <Link to={"/list/page=" + j} disabled>
              <PaginationLink key={i} disabled>
                {i}
              </PaginationLink>
            </Link>
          </PaginationItem>
        );
      } else {
        pageNumbers.push(
          <PaginationItem key={i}>
            <Link to={"/list/page=" + j}>
              <PaginationLink key={i}>{i}</PaginationLink>
            </Link>
          </PaginationItem>
        );
      }
    }
    return pageNumbers;
  };

  //처음 버튼 처리
  const firstButton = () => {
    if (nowPage === undefined || nowPage === 0) {
      return (
        <PaginationItem disabled>
          <Link to={"/list/page=" + 0} disabled>
            <PaginationLink className="first" disabled>
              처음
            </PaginationLink>
          </Link>
        </PaginationItem>
      );
    } else
      return (
        <PaginationItem>
          <Link to={"/list/page=" + 0}>
            <PaginationLink className="first">처음</PaginationLink>
          </Link>
        </PaginationItem>
      );
  };

  //이전 버튼 처리
  const previousButton = () => {
    if (nowPage === undefined || nowPage === 0) {
      return (
        <PaginationItem disabled>
          <Link to={"/list/page=" + previousPage} disabled>
            <PaginationLink className="previous" disabled>
              이전
            </PaginationLink>
          </Link>
        </PaginationItem>
      );
    } else
      return (
        <PaginationItem>
          <Link to={"/list/page=" + previousPage}>
            <PaginationLink className="previous">이전</PaginationLink>
          </Link>
        </PaginationItem>
      );
  };

  //다음 버튼 처리
  const nextButton = () => {
    if (pagingInfo.last) {
      return (
        <PaginationItem disabled>
          <Link to={"/list/page=" + nextPage} disabled>
            <PaginationLink className="next" disabled>
              다음
            </PaginationLink>
          </Link>
        </PaginationItem>
      );
    } else {
      return (
        <PaginationItem>
          <Link to={"/list/page=" + nextPage}>
            <PaginationLink className="next">다음</PaginationLink>
          </Link>
        </PaginationItem>
      );
    }
  };

  //끝 버튼 처리
  const lastButton = () => {
    if (pagingInfo.last) {
      return (
        <PaginationItem disabled>
          <Link to={"/list/page=" + lastPage} disabled>
            <PaginationLink className="last" disabled>
              끝
            </PaginationLink>
          </Link>
        </PaginationItem>
      );
    } else {
      return (
        <PaginationItem>
          <Link to={"/list/page=" + lastPage}>
            <PaginationLink className="last">끝</PaginationLink>
          </Link>
        </PaginationItem>
      );
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      <Input
        type="select"
        name="customSelect"
        defaultValue="20"
        style={{ width: "5%", height: "30px" }}
        onChange={changeBoardCount}
      >
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="60">60</option>
        <option value="80">80</option>
        <option value="100">100</option>
      </Input>
      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
      <Pagination aria-label="Page navigation example">
        {firstButton()}
        {previousButton()}
        {pagesBlocks()}
        {nextButton()}
        {lastButton()}
      </Pagination>
      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
      <div style={{ width: "5%" }}>{pagingInfo.totalElements}</div>
    </div>
  );
};

export default BelowOptions;
