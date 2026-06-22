import Router from "./routing/Router.jsx";
import TasksPage from "../pages/TasksPage";
import TaskPage from "../pages/TaskPage";
import "./styles";

const App = () => {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": () => <div>Страница не найдена</div>,
  };
  return <Router routes={routes} />;
};

export default App;
