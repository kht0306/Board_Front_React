import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, Table } from "reactstrap";
import BelowOptions from "./BelowOptions";
import SearchOption from "./SearchOption";
import Tr from "./Tr";

const ListTable_ver2 = ({ match }) => {
  const [boardList, setBoardList] = useState([]);
  const [pagingInfo, setPagingInfo] = useState([]);
  const [pageCnt, setPageCnt] = useState();

  //함수 실행시 최초 한번 실행됨+상태값이 변할때 마다 변함
  useEffect(() => {
    fetch("http://localhost:8080/board/list", {
      method: "GET",
    }) //비동기 함수 fetch는 데이터를 요청하는 의미 (await async방법도 있음) GET은 디폴트 임으로 { method: "GET" } 생략가능
      .then((res) => res.json()) //프로미스 (1.페이지 태그가 작성되는 중간에 자료를 가지고 대기 했다가)
      .then((res) => {
        setBoardList(res); // 최초 초기화  (2. 다그려지면, setBoardList로 상태값의 변화를 줘서 다시 그림, 즉 값이 들어간 채로 나옴)
        setPagingInfo(res);
      });
  }, [match.params.page, pageCnt]); // []은 최초 한번만을 의미

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">게시글 목록</CardTitle>
        </CardHeader>
        <SearchOption />
        <Table>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>번호</th>
              <th style={{ width: "20%" }}>분류</th>
              <th style={{ width: "30%" }}>제목</th>
              <th style={{ width: "15%" }}>작성자</th>
              <th style={{ width: "15%" }}>등록일</th>
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
      />
    </div>
  );
};

export default ListTable_ver2;
