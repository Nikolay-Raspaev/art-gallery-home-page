import Main from './Pages/Main/Main';
import { ThemeProvider } from './providers/ThemeProvider';

const App = () => (
  <ThemeProvider>
    <Main />
  </ThemeProvider>
);

export default App;
