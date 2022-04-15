import React from "react";
import ListTable from "../components/ListTable";

const BoardList = ({ match }) => {
  return (
    <div>
      <ListTable match={match} />
    </div>
  );
};

export default BoardList;
