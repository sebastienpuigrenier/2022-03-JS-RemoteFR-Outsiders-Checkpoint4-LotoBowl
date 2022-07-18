import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "@pages/Home";

import "@styles/App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const { ??? } = useContext(ExportContext.Context);
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
