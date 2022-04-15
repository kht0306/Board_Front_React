import React, { useRef } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";

const SortToAttachment = ({ board }) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  console.log(board);
  console.log(board.roadAddr);

  return (
    <div>
      <FormGroup row>
        <Label sm={2} className="text-sm-right">
          분류
        </Label>
        <Col sm={10}>
          <InputGroup
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <InputGroupText>
              <Input
                addon
                type="radio"
                aria-label="Radio for following text input"
                name="sort"
                value="라이프"
              />
              라이프
            </InputGroupText>
            &ensp;&ensp;
            <InputGroupText>
              <Input
                addon
                type="radio"
                aria-label="Radio for following text input"
                name="sort"
                value="스페셜리포트"
              />
              스페셜리포트
            </InputGroupText>
            &ensp;&ensp;
            <InputGroupText>
              <Input
                addon
                type="radio"
                aria-label="Radio for following text input"
                name="sort"
                value="비하인드스토리"
              />
              비하인드스토리
            </InputGroupText>
          </InputGroup>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2} className="text-sm-right">
          제목
        </Label>
        <Col sm={10}>
          <Input
            type="text"
            name="title"
            placeholder="제목(100자)"
            defaultValue={board.title}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2} className="text-sm-right">
          내용
        </Label>
        <Col sm={10}>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="7bx2p2d2wf909jn6h54pibghlh0jwbqrpu8b1fwcsczioyhk"
            initialValue={board.content}
            init={{
              branding: false,
              menubar: false,
              height: 300,
              plugins:
                "autolink image lists hr anchor wordcount codesample media table contextmenu",
              toolbar:
                "undo redo | styleselect | bold italic underline strikethrough | bullist numlist outdent indent | link image media table codesample",
              toolbar_mode: "floating",
              tinycomments_mode: "embedded",
              forced_root_block: false,
            }}
            name="content"
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2} className="text-sm-right">
          이메일
        </Label>
        <Col sm={3}>
          <Input
            type="text"
            name="email"
            placeholder="이메일"
            defaultValue={board.email}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2} className="text-sm-right">
          주소
        </Label>

        <Col md={10}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Input
              type="text"
              name="zip"
              placeholder="우편번호"
              defaultValue={board.postcode}
              style={{ width: "130px" }}
            />
            &ensp;&ensp;
            <Button color="light" style={{ width: "130px" }}>
              우편번호 찾기
            </Button>
          </div>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2} className="text-sm-right"></Label>
        <Col md={3}>
          <Input
            type="text"
            name="roadAddr"
            placeholder="도로명 주소"
            defaultValue={board.roadAddr}
          />
        </Col>
        <Col md={3}>
          <Input
            type="text"
            name="jibunAddr"
            placeholder="지번 주소"
            defaultValue={board.jibunAddr}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2} className="text-sm-right"></Label>
        <Col md={3}>
          <Input
            type="text"
            name="detailAddr"
            placeholder="상세 주소"
            defaultValue={board.detailAddr}
          />
        </Col>
        <Col md={3}>
          <Input
            type="text"
            name="refAddr"
            placeholder="참고 주소"
            defaultValue={board.refAddr}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label sm={2} className="text-sm-right">
          첨부파일
        </Label>
        <Col sm={10}>
          <Input type="file" name="attachemnt" multiple />
        </Col>
      </FormGroup>
    </div>
  );
};

export default SortToAttachment;
