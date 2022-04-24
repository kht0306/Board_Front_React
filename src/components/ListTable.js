import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, Table } from "reactstrap";
import BelowOptions from "./BelowOptions";
import SearchOption from "./SearchOption";
import Tr from "./Tr";

const ListTable = ({ match }) => {
  const [boardList, setBoardList] = useState([]);
  const [pagingInfo, setPagingInfo] = useState([]);
  const [pageCnt, setPageCnt] = useState();
  const [sortRule, setSortRule] = useState("no,desc");
  // const [firstDay, setFirstDay] = useState();
  // const [lasttDay, setLastDay] = useState();

  useEffect(() => {
    // axios({
    //   method: "GET",
    //   url: "http://localhost:8080/board/firstLastDates",
    // })
    //   .then(function (response) {
    //      setFirstDay(response.data[0].regDate);
    //      setLastDay(response.data[1].regDate);
    //   })
    //   .catch(function (error) {
    //     alert(error);
    //   });

    fetch(
      "http://localhost:8080/board/list?" +
        match.params.page +
        "&size=" +
        pageCnt +
        "&sort=" +
        sortRule,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setBoardList(res.content);
        setPagingInfo(res);
      });
  }, [match.params.page, pageCnt, sortRule]);

  //번호 누를 때 정렬처리
  const sortingByNo = () => {
    const listSortingByNo = [...boardList];
    if (listSortingByNo[0].no > listSortingByNo[1].no) {
      setSortRule("no,asc");
    } else if (listSortingByNo[0].no < listSortingByNo[1].no) {
      setSortRule("no,desc");
    }
  };

  //날짜 누를 때 정렬처리(원래 이렇게 하면 되나 현재 db날짜 데이터가 시간을 표시 하지 않아서 비교처리가 안됨....)
  // const sortingByRegDate = () => {
  //   const listSortingByRegDate = [...boardList];
  //   let prevRegDate = new Date(listSortingByRegDate[0].regDate);
  //   let afterRegDate = new Date(listSortingByRegDate[1].regDate);
  //   if (prevRegDate > afterRegDate) {
  //     setSortRule("no,asc");
  //   } else if (prevRegDate < afterRegDate) {
  //     setSortRule("no,desc");
  //   }
  // };

  const sortingByRegDate = () => {
    const listSortingByNo = [...boardList];
    if (listSortingByNo[0].no > listSortingByNo[1].no) {
      setSortRule("no,asc");
    } else if (listSortingByNo[0].no < listSortingByNo[1].no) {
      setSortRule("no,desc");
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">게시글 목록</CardTitle>
        </CardHeader>
        <SearchOption
          setBoardList={setBoardList}
          setPagingInfo={setPagingInfo}
        />
        <Table>
          <thead>
            <tr>
              <th style={{ width: "10%" }} onClick={sortingByNo}>
                번호⇳
              </th>
              <th style={{ width: "20%" }}>분류</th>
              <th style={{ width: "30%" }}>제목</th>
              <th style={{ width: "15%" }}>작성자</th>
              <th style={{ width: "15%" }} onClick={sortingByRegDate}>
                등록일⇳
              </th>
              <th style={{ width: "10%" }}>파일첨부</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map(
              (
                board // board는 임의로 내가 지은 변수명임 key={board.no} 중 no는 넘어오는 객체이름 인듯? //board={board}은 props로 넘기는 거임
              ) => (
                <Tr match={match} key={board.no} board={board} /> //반복되는 <Tr> 컴포넌트가 각 unique한 key를 넣어야 나중에 boardList수정시 해당부분만 다시 그릴 수 있음 (리액트 정책)
              )
            )}
          </tbody>
        </Table>
      </Card>
      <BelowOptions
        pagingInfo={pagingInfo}
        match={match}
        setBoardList={setBoardList}
        setPagingInfo={setPagingInfo}
        setPageCnt={setPageCnt}
        sortRule={sortRule}
      />
    </div>
  );
};
export default ListTable;
