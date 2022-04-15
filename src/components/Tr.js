import React from "react";
import { Link } from "react-router-dom";

const Tr = (props) => {
  const { no, sort, title, writer, regDate, attachment_flag } = props.board;
  return (
    <tr>
      <td>{no}</td>
      <td>{sort}</td>
      <td>
        <Link to={"/view/" + no}>{title}</Link>
      </td>
      <td>{writer}</td>
      <td>{regDate}</td>
      <td>{attachment_flag}</td>
    </tr>
  );
};

export default Tr;
