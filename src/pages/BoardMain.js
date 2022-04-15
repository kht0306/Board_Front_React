import React from "react";
import { useParams } from "react-router-dom";
import { Route } from "react-router-dom";
import BoardList from "./BoardList";
import BoardView from "./BoardView";
import BoardWrite from "./BoardWrite";

const BoardMain = () => {
  const { match } = useParams();
  return (
    <>
      <Route path="/" component={BoardList} />
      <Route path="/view/:no" component={BoardView} />
      <Route path="/write" component={BoardWrite} />
    </>
  );
};

export default BoardMain;
