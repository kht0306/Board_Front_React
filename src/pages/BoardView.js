import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import RegDate from "../components/RegDate";
import SortToAttachment from "../components/SortToAttachment";

const BoardView = ({ match }) => {
  const no = match.params.no;
  console.log(no);

  const [board, setBoard] = useState({
    sort: "",
    title: "",
    content: "",
    email: "",
    postcode: "",
    roadAddr: "",
    jibunAddr: "",
    detailAddr: "",
    refAddr: "",
    Attachment: "",
    writer: "",
    password: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/board/view/" + no, { method: "GET" }) //비동기 함수 fetch는 데이터를 요청하는 의미 (await async방법도 있음) GET은 디폴트 임으로 { method: "GET" } 생략가능
      .then((res) => res.json()) //프로미스 (1.페이지 태그가 작성되는 중간에 자료를 가지고 대기 했다가)
      .then((res) => {
        setBoard(res);
      });
  }, [no]);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">게시글 수정</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <SortToAttachment board={board} />
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              작성자
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="writer"
                placeholder="작성자명"
                defaultValue={board.writer}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              비밀번호
            </Label>
            <Col sm={10}>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                defaultValue={board.password}
              />
            </Col>
          </FormGroup>

          <RegDate board={board} />

          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button color="light">취소</Button>&ensp;&ensp;
              <Button color="dark">수정</Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BoardView;
