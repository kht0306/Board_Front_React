import "./App.css";
import { Container } from "reactstrap";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import BoardList from "./pages/BoardList";
import BoardView from "./pages/BoardView";
import BoardWrite from "./pages/BoardWrite";

function App() {
  return (
    <Container>
      <Route path="/" exact={true} component={BoardList} />
      <Route path="/view/:no" exact={true} component={BoardView} />
      <Route path="/write" exact={true} component={BoardWrite} />
    </Container>
  );
}

export default App;
