import Main from "./Pages/Main/Main";
import { BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import {ThemeProvider} from "./providers/ThemeProvider";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter basename="/">
      <ThemeProvider>
        <Layout>
          <Main/>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
