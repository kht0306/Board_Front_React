/* eslint-disable no-restricted-globals */
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import DaumPostcode from "react-daum-postcode";
// import { Router } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
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

const id = "daum-postcode"; // script가 이미 rending 되어 있는지 확인하기 위한 ID
const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const BoardWrite = ({ match }) => {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {}, [match, location]);

  const [postNum, setPostNum] = useState();
  const [roadAddress, setRoadAddress] = useState();
  const [jibunAddress, setJibunAddress] = useState();
  const [extraAddress, setExtraAddress] = useState();

  //const postcodeRef = (useRef < HTMLDivElement) | (null > null);

  const postCodeFinder = () => {
    setPostNum("");
    setRoadAddress("");
    setJibunAddress("");
    setExtraAddress("");

    window.daum.postcode.load(() => {
      const postcode = new window.daum.Postcode({
        oncomplete: function (data) {
          //let fullAddress = data.address;
          let extraAddress = "";

          if (data.addressType === "R") {
            if (data.bname !== "") {
              extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
              extraAddress +=
                extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            //fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
          }
          setPostNum(data.zonecode);
          setRoadAddress(data.roadAddress);
          setExtraAddress(extraAddress);
          if (data.autoJibunAddress.length === 0) {
            setJibunAddress(data.jibunAddress);
          } else if (data.jibunAddress.length === 0) {
            setJibunAddress(data.autoJibunAddress);
          }
        },
      });
      postcode.open();
    });
  };

  useEffect(() => {
    const isAlready = document.getElementById(id);

    if (!isAlready) {
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      document.body.append(script);
    }
  }, []);

  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const pwdRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  let fileExtArr = []; // 첨부파일 확장자 배열

  const files = (e) => {
    let file = "";
    fileExtArr = [];
    file = e.target.files;

    //첨부파일 확장자만 획득
    for (let i = 0; i < file.length; i++) {
      fileExtArr.push(
        file[i].name.substring(file[i].name.lastIndexOf(".") + 1)
      );
    }
  };

  const writeSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // form 태그의 하위 태그의 모든 값을 가져옴
    if (
      formData.get("title").length > 0 &&
      formData.get("title").length <= 100
    ) {
    } else {
      return alert("제목은 100자 이내로 작성해 주세요.");
    }

    if (formData.get("content").length > 0) {
    } else {
      return alert("내용을 작성해 주세요.");
    }

    if (
      formData.get("email").length > 0 &&
      emailRegex.test(formData.get("email"))
    ) {
    } else {
      return alert("형식에 알맞은 이메일 주소를 입력해 주세요.");
    }

    if (
      formData.get("postcode").length > 0 &&
      formData.get("roadAddr").length > 0 &&
      formData.get("jibunAddr").length > 0
    ) {
    } else {
      return alert("우편번호 찾기 버튼을 통해 주소를 모두 입력해 주세요.");
    }

    if (
      formData.get("writer").length > 0 &&
      formData.get("writer") !== "admin" &&
      formData.get("writer") !== "관리자"
    ) {
    } else {
      return alert("작성자는 admin과 관리자를 제외한 이름을 입력해 주세요.");
    }

    if (
      formData.get("password").length > 0 &&
      pwdRegex.test(formData.get("password"))
    ) {
    } else {
      return alert(
        "비밀번호는 8자리 이상(영어 대소문자, 특수문자, 숫자 중 3가지 포함)으로 입력해 주세요."
      );
    }

    if (fileExtArr.length > 0) {
      for (let i = 0; i < fileExtArr.length; i++) {
        if (
          fileExtArr[i].toUpperCase() === "jpg".toUpperCase() ||
          fileExtArr[i].toUpperCase() === "bmp".toUpperCase() ||
          fileExtArr[i].toUpperCase() === "pptx".toUpperCase() ||
          fileExtArr[i].toUpperCase() === "xlsx".toUpperCase() ||
          fileExtArr[i].toUpperCase() === "hwp".toUpperCase()
        ) {
        } else {
          return alert(
            "첨부파일은 jpg, bmp, pptx, xlsx, hwp만 등록 가능합니다."
          );
        }
      }
    }
    axios({
      method: "post",
      url: "http://localhost:8080/board/write",
      data: formData,
    })
      .then(function (response) {
        alert(response.data); // 글 작성 성공 메시지 표출
        history.push("/");
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">게시글 등록</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={writeSubmit}>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              분류
            </Label>
            <Col
              sm={10}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <FormGroup check>
                <Label check>
                  <Input
                    name="sort"
                    type="radio"
                    value="라이프"
                    defaultChecked
                  />
                  라이프
                </Label>
              </FormGroup>
              &ensp;&ensp;
              <FormGroup check>
                <Label check>
                  <Input name="sort" type="radio" value="스페셜리포트" />{" "}
                  스페셜리포트
                </Label>
              </FormGroup>
              &ensp;&ensp;
              <FormGroup check>
                <Label check>
                  <Input name="sort" type="radio" value="비하인드스토리" />{" "}
                  비하인드스토리
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              제목
            </Label>
            <Col sm={10}>
              <Input type="text" name="title" placeholder="제목(100자)" />
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
                textareaName="content" //form 전송시 사용되는 tag name 설정방법
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
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              이메일
            </Label>
            <Col sm={3}>
              <Input type="text" name="email" placeholder="이메일" />
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
                  name="postcode"
                  placeholder="우편번호"
                  style={{ width: "130px" }}
                  value={postNum}
                />
                &ensp;&ensp;
                <Button
                  color="light"
                  style={{ width: "130px" }}
                  onClick={postCodeFinder}
                >
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
                value={roadAddress}
              />
            </Col>
            <Col md={3}>
              <Input
                type="text"
                name="jibunAddr"
                placeholder="지번 주소"
                value={jibunAddress}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} className="text-sm-right"></Label>
            <Col md={3}>
              <Input type="text" name="detailAddr" placeholder="상세 주소" />
            </Col>
            <Col md={3}>
              <Input
                type="text"
                name="refAddr"
                placeholder="참고 주소"
                value={extraAddress}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              첨부파일
            </Label>
            <Col sm={10}>
              <Input type="file" name="attachment" onChange={files} multiple />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              작성자
            </Label>
            <Col sm={3}>
              <Input type="text" name="writer" placeholder="작성자명" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              비밀번호
            </Label>
            <Col sm={3}>
              <Input type="password" name="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button
                color="light"
                onClick={() => {
                  history.goBack();
                }}
              >
                취소
              </Button>
              &ensp;&ensp;
              <Button color="dark" type="submit">
                등록
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};
export default BoardWrite;
