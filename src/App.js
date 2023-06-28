import Main from "./Pages/Main/Main";
import Layout from "./compnents/UI/Layout/Layout";
import ThemeProvider from "./providers/ThemeProviders";
import "./styles/App.css";

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
