import Main from "./Pages/Main/Main";
import "./styles/App.css";
import {useEffect, useState} from "react";

const App = () => {
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
    return (
        <Main isThemeLight={isThemeLight} handleThemeChange={handleThemeChange}/>
    );
};

export default App;
