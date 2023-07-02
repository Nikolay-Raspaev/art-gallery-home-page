import Main from "./Pages/Main/Main";
import { useRoutes, BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import {useEffect, useState} from "react";

function Router(props) {
  return useRoutes(props.rootRoute);
}

function App() {

  const [isThemeLight, setIsThemeLight] = useState(true);
  const handleThemeChange = (newTheme) => {
    setIsThemeLight(newTheme);
    saveThemeToLocalStorage(newTheme);
  };
  const saveThemeToLocalStorage = (isLight) => {
    localStorage.setItem("isLight", isLight);
  };

  const loadThemeFromLocalStorage = () => {
    const storedIsLight = localStorage.getItem("isLight");
    setIsThemeLight(storedIsLight === "true");
  };

  useEffect(() => {
    loadThemeFromLocalStorage();
  }, []);

  const routes = [
    { path: "art-gallery-home-page/paintings", element: <Main isThemeLight={isThemeLight} handleThemeChange={handleThemeChange}/> },
    { path: "art-gallery-home-page", element: <Main isThemeLight={isThemeLight} handleThemeChange={handleThemeChange}/> },
  ];
  const rootRoute = [{ path: "/", children: routes }];
  return (
    <BrowserRouter>
      <Router rootRoute={rootRoute} />
    </BrowserRouter>
  );
}

export default App;
