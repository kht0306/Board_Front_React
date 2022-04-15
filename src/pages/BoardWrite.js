import React from "react";
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
import SortToAttachment from "../components/SortToAttachment";

const BoardWrite = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">게시글 등록</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <SortToAttachment />
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              작성자
            </Label>
            <Col sm={10}>
              <Input type="text" name="writer" placeholder="작성자명" />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              비밀번호
            </Label>
            <Col sm={10}>
              <Input type="password" name="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button color="light">취소</Button>&ensp;&ensp;
              <Button color="dark">등록</Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BoardWrite;
