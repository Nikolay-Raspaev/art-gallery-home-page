import Main from "./Pages/Main/Main";
import { useRoutes, Outlet, BrowserRouter } from "react-router-dom";
import "./styles/App.css";

function Router(props) {
  return useRoutes(props.rootRoute);
}

function App() {
  const routes = [
    { index: true, element: <Main /> },
    { path: "art-gallery-home-page/paintings", element: <Main /> },
  ];
  const rootRoute = [{ path: "/", children: routes }];
  return (
    <BrowserRouter>
      <Router rootRoute={rootRoute} />
    </BrowserRouter>
  );
}

export default App;
