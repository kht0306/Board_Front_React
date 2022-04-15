import React, { useEffect, useState } from "react";
import { Input, Pagination, PaginationItem, PaginationLink } from "reactstrap";

const BelowOptions = ({ pagingInfo }) => {
  const [list, setList] = useState([]);

  const pageArray = [];
  const [nowPage, setNowPage] = useState(pagingInfo.number); // 현재 페이지
  const [pageBlock, setPageBlock] = useState(pagingInfo.numberOfElements); // 페이지 블락
  const [totalPage, setTotalPage] = useState(pagingInfo.totalPages); // 전체 페이지
  const [startBlockPage, setStartBlockPage] = useState(
    (nowPage / pageBlock) * pageBlock + 1
  ); // 페이지 블락 시작지점
  let endBlockPage = startBlockPage + pageBlock - 1;
  endBlockPage = totalPage < endBlockPage ? totalPage : endBlockPage;

  useEffect(() => {
    for (let i = startBlockPage; i <= endBlockPage; i++) {
      console.log(startBlockPage);
      pageArray.push(i);
    }
    setList(pageArray);
  }, [pagingInfo]);

  const goThePage = () => {};

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      <Input
        type="select"
        id="exampleCustomSelect"
        name="customSelect"
        defaultValue="20"
        style={{ width: "10%" }}
      >
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="60">60</option>
        <option value="80">80</option>
        <option value="100">100</option>
      </Input>

      <Pagination>
        <PaginationItem>
          <PaginationLink previous />
        </PaginationItem>
        {list.map((el) => (
          <PaginationItem>
            <PaginationLink onClick={goThePage} key={el}>
              {el}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink next />
        </PaginationItem>
      </Pagination>

      <div style={{ width: "5%" }}>1</div>
    </div>
  );
};

export default BelowOptions;
