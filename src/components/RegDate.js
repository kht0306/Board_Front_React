import React from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";

const RegDate = ({ board }) => {
  return (
    <div>
      <FormGroup row>
        <Label sm={2} className="text-sm-right">
          등록일
        </Label>
        <Col sm={2}>
          <Input type="text" value={board.regDate} readOnly />
        </Col>
      </FormGroup>
    </div>
  );
};

export default RegDate;
