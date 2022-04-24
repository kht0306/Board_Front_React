import React, { useEffect, useRef, useState } from "react";
// import DaumPostcode from "react-daum-postcode";
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
  InputGroup,
  Label,
} from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import LoginModal from "../util/LoginModal";
import axios from "axios";

const id = "daum-postcode"; // script가 이미 rending 되어 있는지 확인하기 위한 ID
const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const BoardView = ({ match }) => {
  const history = useHistory();
  const [board, setBoard] = useState({
    no: "",
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

  const [attachments, setAttahments] = useState([]);

  const location = useLocation();
  useEffect(() => {}, [match, location]);

  const [postNum, setPostNum] = useState();
  const [roadAddress, setRoadAddress] = useState();
  const [jibunAddress, setJibunAddress] = useState();
  const [extraAddress, setExtraAddress] = useState();
  const [detailAddress, setDetailAddress] = useState();
  const [deleteKeys, setDeleteKeys] = useState([]);

  // 모달 상태값
  const [show, setShow] = useState(true);

  const postcodeRef = (useRef < HTMLDivElement) | (null > null);

  const postCodeFinder = () => {
    setPostNum("");
    setRoadAddress("");
    setJibunAddress("");
    setExtraAddress("");
    setDetailAddress("");

    window.daum.postcode.load(() => {
      const postcode = new window.daum.Postcode({
        oncomplete: function (data) {
          let fullAddress = data.address;
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

  const no = match.params.no;
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const [radioButton, setRadioButton] = useState();
  const changeRadio = (e) => {
    setRadioButton(e.target.value);
  };

  useEffect(() => {
    if (!show) {
      fetch("http://localhost:8080/board/view/" + no, { method: "GET" }) //비동기 함수 fetch는 데이터를 요청하는 의미 (await async방법도 있음) GET은 디폴트 임으로 { method: "GET" } 생략가능
        .then((res) => res.json()) //프로미스 (1.페이지 태그가 작성되는 중간에 자료를 가지고 대기 했다가 태그가 다 렌더링되면 아래 then 호출)
        .then((res) => {
          setBoard(res); // 실제 저장값 불러오는 시점
          setRadioButton(res.sort);
          setPostNum(res.postcode);
          setRoadAddress(res.roadAddr);
          setJibunAddress(res.jibunAddr);
          setExtraAddress(res.refAddr);
          setDetailAddress(res.detailAddr);
        });

      fetch("http://localhost:8080/board/attachment/" + no, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          setAttahments(res);
        });
    }
  }, [show, no]);

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

  const modifySubmit = (e) => {
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
    const deleteNums = new Set(deleteKeys);
    const delAno = [...deleteNums];
    formData.append("delAno", delAno);

    axios({
      method: "put",
      url: "http://localhost:8080/board/modify/",
      data: formData,
    })
      .then(function (response) {
        alert(response.data); // 글 작성 성공 메시지 표출
        history.push("/"); // 이전 페이지로 이동처리(기존 파라미터 포함)
      })
      .catch(function (error) {
        alert(error);
      });
  };

  //첨부파일 삭제시 기존 첨부파일 버튼 삭제됨
  const getDelAno = (e) => {
    console.log(e.target.value);
    setDeleteKeys([...deleteKeys, Number(e.target.value)]);
    setAttahments(
      attachments.filter(
        (attachment) => attachment.ano !== Number(e.target.value)
      )
    );
  };

  //게시글 삭제여부
  const deletrConfirm = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      console.log("삭제할 게시글 번호= " + board.no);
      axios({
        method: "delete",
        url: "http://localhost:8080/board/delete/" + board.no,
      })
        .then(function (response) {
          alert(response.data);
          history.push("/");
        })
        .catch(function (error) {
          alert(error);
        });
    } else {
      return;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">게시글 수정</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={modifySubmit}>
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
                  <FormGroup check>
                    <Label check>
                      <Input
                        name="sort"
                        type="radio"
                        value="라이프"
                        onChange={changeRadio}
                        checked={radioButton === "라이프" ? true : false}
                      />
                      라이프
                    </Label>
                  </FormGroup>
                  &ensp;&ensp;
                  <FormGroup check>
                    <Label check>
                      <Input
                        name="sort"
                        type="radio"
                        value="스페셜리포트"
                        onChange={changeRadio}
                        checked={radioButton === "스페셜리포트" ? true : false}
                      />
                      스페셜리포트
                    </Label>
                  </FormGroup>
                  &ensp;&ensp;
                  <FormGroup check>
                    <Label check>
                      <Input
                        name="sort"
                        type="radio"
                        value="비하인드스토리"
                        onChange={changeRadio}
                        checked={
                          radioButton === "비하인드스토리" ? true : false
                        }
                      />
                      비하인드스토리
                    </Label>
                  </FormGroup>
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
                <Input type="hidden" name="no" defaultValue={board.no} />
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
                    name="postcode"
                    placeholder="우편번호"
                    defaultValue={postNum}
                    style={{ width: "130px" }}
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
                  defaultValue={roadAddress}
                />
              </Col>
              <Col md={3}>
                <Input
                  type="text"
                  name="jibunAddr"
                  placeholder="지번 주소"
                  defaultValue={jibunAddress}
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
                  defaultValue={detailAddress}
                />
              </Col>
              <Col md={3}>
                <Input
                  type="text"
                  name="refAddr"
                  placeholder="참고 주소"
                  defaultValue={extraAddress}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                첨부파일
              </Label>
              <Col sm={10}>
                <Input
                  type="file"
                  name="attachment"
                  multiple
                  onChange={files}
                />
                {attachments.map((board) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                    key={board.no}
                  >
                    <Input
                      key={board.no}
                      value={board.orgName}
                      readOnly
                      style={{
                        width: "50%",
                      }}
                    />
                    <Button
                      key={board.ano}
                      value={board.ano}
                      onClick={getDelAno}
                    >
                      x
                    </Button>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                ></div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                작성자
              </Label>
              <Col sm={3}>
                <Input
                  type="text"
                  name="writer"
                  placeholder="작성자명"
                  defaultValue={board.writer}
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                비밀번호
              </Label>
              <Col sm={3}>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  defaultValue={board.password}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                등록일
              </Label>
              <Col sm={3}>
                <Input type="text" value={board.regDate} readOnly />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button color="danger" onClick={deletrConfirm}>
                  삭제
                </Button>
                &ensp;&ensp;
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
                  수정
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
      {show && <LoginModal no={no} onClose={() => setShow(false)} />}
    </>
  );
};
export default BoardView;
