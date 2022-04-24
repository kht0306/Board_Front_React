import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ListTable from "../components/ListTable";
import ListTable_ver2 from "../components/ListTable_ver2";

const BoardList = ({ match }) => {
  const location = useLocation();
  useEffect(() => {}, [match, location]);
  return <ListTable match={match} />;
};

export default BoardList;
