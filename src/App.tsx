import React from "react";
import "./App.css";
import Main from "./page/Main/Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main />
        <ToastContainer
          theme={'colored'}
          position={'bottom-left'}
          draggable={false}
          autoClose={3000}
        />
      </Provider>
    </div>
  );
}

export default App;
