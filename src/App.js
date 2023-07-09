import "./styles/App.css";
import Main from "./Pages/Main/Main";
import { ThemeProvider } from "./providers/ThemeProvider";
import Layout from "./components/Layout";

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Main></Main>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
