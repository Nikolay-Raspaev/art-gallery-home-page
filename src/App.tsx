import React from 'react';
import Main from './Pages/Main/Main';
import { ThemeProvider } from './providers/ThemeProvider';
import { FilterProvider } from './providers/FilterProvider';

const App = () => (
  <ThemeProvider>
    <FilterProvider>
      <Main />
    </FilterProvider>
  </ThemeProvider>
);

export default App;
