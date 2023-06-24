import { useRoutes, Outlet, BrowserRouter } from "react-router-dom";
import Main from "./Pages/Main/Main";
import "./styles/App.css";

function Router(props) {
  return useRoutes(props.rootRoute);
}

function App() {
  const routes = [{ index: true, element: <Main /> }];
  const links = routes.filter((route) => route.hasOwnProperty("label"));
  const rootRoute = [{ path: "/", element: render(links), children: routes }];

  function render(links) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Router rootRoute={rootRoute} />
    </BrowserRouter>
  );
}

export default App;
