import React from "react";
import { Button, Input, InputGroup } from "reactstrap";

const SearchOption = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      <Input
        type="select"
        id="exampleCustomSelect"
        name="customSelect"
        defaultValue="total"
        style={{ width: "10%" }}
      >
        <option value="total">전체</option>
        <option value="toDay">당일</option>
        <option value="oneDay">1일</option>
        <option value="twoDay">2일</option>
        <option value="threeDay">3일</option>
        <option value="oneWeek">1주일</option>
        <option value="oneMonth">1개월</option>
        <option value="threeMonth">3개월</option>
        <option value="sixMonth">6개월</option>
        <option value="oneRear">1년</option>
      </Input>
      &ensp;
      <input type="date" style={{ width: "25%" }}></input> ~
      <input type="date" style={{ width: "25%" }}></input>&ensp;
      <InputGroup>
        <Input
          type="select"
          id="exampleCustomSelect"
          name="customSelect"
          defaultValue="total"
          style={{ width: "5%" }}
        >
          <option value="total">전체</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
        </Input>
        <Input placeholder="Search for..." style={{ width: "60%" }} />
        <Button>초기화</Button>&ensp;
        <Button>검색</Button>
      </InputGroup>
    </div>
  );
};

export default SearchOption;
