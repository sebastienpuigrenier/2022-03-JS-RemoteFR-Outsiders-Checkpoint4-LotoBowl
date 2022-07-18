import React, { createContext } from "react";

const Context = createContext();

function Provider({ children }) {
  // const [infoUser, setInfoUser] = useState({});

  // useEffect(() => {}, []);

  return <Context.Provider value={{}}>{children}</Context.Provider>;
}

const ExportContext = {
  Context,
  Provider,
};

export default ExportContext;
