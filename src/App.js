import "./App.css";
import { Container } from "reactstrap";
import { Route } from "react-router-dom";
import BoardList from "./pages/BoardList";
import BoardView from "./pages/BoardView";
import BoardWrite from "./pages/BoardWrite";

function App() {
  return (
    <Container>
      <Route
        path={[
          "/",
          "/list",
          "/list/:page",
          "/list/:page:size:",
          "/list/:page:size:startDate:endDate:option:keyword",
        ]}
        exact
        component={BoardList}
      />
      <Route path="/view/:no" exact component={BoardView} />
      <Route path="/write" exact component={BoardWrite} />
    </Container>
  );
}

export default App;
