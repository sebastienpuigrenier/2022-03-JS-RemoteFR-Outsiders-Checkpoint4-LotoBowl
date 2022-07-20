import React, { useState, createContext } from "react";

const Context = createContext();

function Provider({ children }) {
  const [infoUser, setInfoUser] = useState({
    email: sessionStorage.getItem("email"),
    pseudo: sessionStorage.getItem("pseudo"),
  });

  // useEffect(() => {}, []);

  return (
    <Context.Provider
      value={{
        infoUser,
        setInfoUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}

const ExportContext = {
  Context,
  Provider,
};

export default ExportContext;
