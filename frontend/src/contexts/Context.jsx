import React, { useState, createContext, useEffect } from "react";

import img001 from "@assets/001.png";
import img002 from "@assets/002.png";
import img003 from "@assets/003.png";
import img004 from "@assets/004.png";
import img005 from "@assets/005.png";
import img006 from "@assets/006.png";
import img007 from "@assets/007.png";

const Context = createContext();

function Provider({ children }) {
  const [infoUser, setInfoUser] = useState({
    email: sessionStorage.getItem("email"),
    pseudo: sessionStorage.getItem("pseudo"),
    isadmin: sessionStorage.getItem("isadmin"),
  });
  const [footerImg, setFooterImg] = useState("");
  const [isVisible, setIsVisilbe] = useState(false);

  const rdnImg = Math.floor(Math.random() * 7);
  useEffect(() => {
    switch (rdnImg) {
      case 1:
        setFooterImg(img001);
        break;
      case 2:
        setFooterImg(img002);
        break;
      case 3:
        setFooterImg(img003);
        break;
      case 4:
        setFooterImg(img004);
        break;
      case 5:
        setFooterImg(img005);
        break;
      case 6:
        setFooterImg(img006);
        break;
      case 7:
        setFooterImg(img007);
        break;
      default:
        setFooterImg(img001);
    }
  }, []);

  const handleShowMenu = (boolean) => {
    setIsVisilbe(boolean);
  };

  return (
    <Context.Provider
      value={{
        infoUser,
        setInfoUser,
        footerImg,
        isVisible,
        handleShowMenu,
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
