import React from 'react';
import { Provider } from 'react-redux';
import Main from './pages/Main/Main';
import { ThemeProvider } from './providers/ThemeProvider';
import { FilterProvider } from './providers/FilterProvider';
import { store } from './store';

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <FilterProvider>
        <Main />
      </FilterProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
