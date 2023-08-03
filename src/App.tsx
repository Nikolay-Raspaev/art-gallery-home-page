import React, { useEffect } from 'react';
import Main from './pages/Main/Main';
import { useTypedSelector } from './store/hooks/useTypedSelector';
import './App.scss';

const App = () => {
  const { isLightTheme } = useTypedSelector((state) => state.theme);
  const theme = isLightTheme ? 'light' : 'dark';

  useEffect(() => {
    document.body.classList.add(theme);
    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);
  return <Main />;
};

export default App;
