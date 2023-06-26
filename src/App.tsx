import "./App.css";
import PageHome from "./pages/home";
import { Provider } from "react-redux";
import store from "./stores";

function App() {
  return (
    <>
      <Provider store={store}>
        <PageHome />
      </Provider>
    </>
  );
}

export default App;
