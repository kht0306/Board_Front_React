import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

const LoginModal = ({ no, onClose }) => {
  const history = useHistory();
  const valCnt = useRef(0);

  const confirmWriter = (e, writer, password) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const writerValid = formData.get("writerValid");
    const passwordValid = formData.get("passwordValid");

    axios({
      method: "get",
      url:
        "http://localhost:8080/board/validation/?no=" +
        no +
        "&writerValid=" +
        writerValid +
        "&passwordValid=" +
        passwordValid,
    })
      .then(function (res) {
        let count = res.data;
        if (count === 1) {
          onClose();
        } else {
          valCnt.current += 1;
          if (valCnt.current < 3) {
            alert("작성자 또는 비밀번호를 확인 후 다시 입력하세요.");
          } else {
            alert("작성자 검증을 3회 실패하여 초기화면으로 이동합니다.");
            valCnt.current = 0;
            history.push("/");
          }
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <div>
      <Modal isOpen={"true"}>
        <ModalHeader>게시글 정보 확인</ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => confirmWriter(e)}>
            <FormGroup>
              <table
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                }}
              >
                <tr>
                  <th>
                    <Label>작성자</Label>
                  </th>
                  <td>
                    <Input
                      type="text"
                      placeholder="작성자명"
                      name="writerValid"
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <Label>비밀번호</Label>
                  </th>
                  <td>
                    <Input
                      type="password"
                      placeholder="비밀번호"
                      name="passwordValid"
                    />
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td>
                    <Button
                      color="white"
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      취소
                    </Button>
                    &ensp;&ensp;
                    <Button color="dark" type="submit">
                      확인
                    </Button>
                  </td>
                </tr>
              </table>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default LoginModal;
