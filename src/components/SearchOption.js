import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, InputGroup } from "reactstrap";

const SearchOption = ({ setBoardList, setPagingInfo }) => {
  const [searchHolder, setSearchHolder] = useState("전체 검색");
  const [dates, setDates] = useState({
    startDate: null,
    endDate: moment().format("YYYY-MM-DD"),
  });
  const { startDate, endDate } = dates;
  const firstDate = useRef();

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/board/firstLastDates",
    })
      .then(function (response) {
        firstDate.current = response.data[0].regDate;
        setDates({
          ...dates, //date를 얉은 복사 후 아래에서 set 처리하기(useState 변수 값 2개 선언했을 때 참고용)
          startDate: moment(response.data[0].regDate).format("YYYY-MM-DD"),
        });
      })
      .catch(function (error) {
        alert(error);
      });
  }, []);

  const date = new Date();

  const dateChanger = (e) => {
    if (e.target.value === "total") {
      setDates({
        startDate: firstDate.current, //안되는 포인트....
        endDate: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      }); //db에서 글 등록 가장빠른 일자 셋팅
    } else if (e.target.value === "toDay") {
      setDates({
        startDate:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        endDate: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      });
    } else if (e.target.value === "oneDay") {
      date.setDate(date.getDate() - 1);
      setDates({
        startDate:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        endDate: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      });
      date.setDate(date.getDate() + 1); // 버튼 클릭 시 계속 더해지기 때문에 초기화
    } else if (e.target.value === "twoDay") {
      date.setDate(date.getDate() - 2);
      setDates({
        startDate:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        endDate: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      });
      date.setDate(date.getDate() + 2); // 버튼 클릭 시 계속 더해지기 때문에 초기화
    } else if (e.target.value === "threeDay") {
      date.setDate(date.getDate() - 3);
      setDates({
        startDate:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        endDate: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      });
      date.setDate(date.getDate() + 3); // 버튼 클릭 시 계속 더해지기 때문에 초기화
    } else if (e.target.value === "oneWeek") {
      date.setDate(date.getDate() - 7);
      setDates({
        startDate:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        endDate: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      });
      date.setDate(date.getDate() + 7); // 버튼 클릭 시 계속 더해지기 때문에 초기화
    } else if (e.target.value === "oneMonth") {
      setDates({
        startDate:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10 ? "0" + date.getMonth() : date.getMonth()) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        endDate: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      });
    } else if (e.target.value === "threeMonth") {
      date.setMonth(date.getMonth() - 2);
      setDates({
        startDate:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10 ? "0" + date.getMonth() : date.getMonth()) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        endDate: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      });
      date.setMonth(date.getMonth() + 2); // 버튼 클릭 시 계속 더해지기 때문에 초기화
    } else if (e.target.value === "sixMonth") {
      date.setMonth(date.getMonth() - 5);
      setDates({
        startDate:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10 ? "0" + date.getMonth() : date.getMonth()) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        endDate: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      });
      date.setMonth(date.getMonth() + 5); // 버튼 클릭 시 계속 더해지기 때문에 초기화
    } else if (e.target.value === "oneYear") {
      date.setFullYear(date.getFullYear() - 1);
      setDates({
        startDate:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        endDate: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      });
      date.setFullYear(date.getFullYear() + 1); // 버튼 클릭 시 계속 더해지기 때문에 초기화
    }
  };

  const optionSelector = (e) => {
    if (e.target.value === "total") {
      setSearchHolder("전체 검색");
    } else if (e.target.value === "title") {
      setSearchHolder("제목 검색");
    } else if (e.target.value === "content") {
      setSearchHolder("내용 검색");
    }
  };

  const searchFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const option = formData.get("option");
    const keyword = formData.get("keyword");

    axios({
      method: "GET",
      url:
        "http://localhost:8080/board/list?startDate=" +
        startDate +
        "&endDate=" +
        endDate +
        "&option=" +
        option +
        "&keyword=" +
        keyword,
    })
      .then(function (response) {
        console.log(response);
        setBoardList(response.data.content);
        setPagingInfo(response.data);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <Form onSubmit={searchFormSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Input
          type="select"
          defaultValue="total"
          style={{ width: "10%" }}
          onChange={dateChanger}
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
          <option value="oneYear">1년</option>
        </Input>
        &ensp;
        <input
          name="startDate"
          type="date"
          value={startDate}
          onChange={(e) => {
            setDates(e.target.value);
          }}
          style={{ width: "25%" }}
        ></input>{" "}
        ~
        <input
          name="endDate"
          type="date"
          value={endDate}
          onChange={(e) => {
            setDates(e.target.value);
          }}
          style={{ width: "25%" }}
        ></input>
        &ensp;
        <InputGroup>
          <Input
            type="select"
            id="exampleCustomSelect"
            name="option"
            defaultValue="total"
            style={{ width: "10%" }}
            onChange={optionSelector}
          >
            <option value="total">전체</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
          </Input>
          <Input
            name="keyword"
            placeholder={searchHolder}
            style={{ width: "30%" }}
          />
          <Button type="reset">초기화</Button>&ensp;
          <Button type="submit">검색</Button>
        </InputGroup>
      </div>
      <br></br>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button>
          <Link to="/write" style={{ color: "white" }}>
            글쓰기
          </Link>
        </Button>
      </div>
    </Form>
  );
};

export default SearchOption;
