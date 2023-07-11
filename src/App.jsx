import Main from './Pages/Main/Main';
import { ThemeProvider } from './providers/ThemeProvider';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Main />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
