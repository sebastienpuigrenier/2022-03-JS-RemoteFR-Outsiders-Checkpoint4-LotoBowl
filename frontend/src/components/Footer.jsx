import React, { useContext } from "react";

import ExportContext from "../contexts/Context";

import "./Footer.css";

function Footer() {
  const { footerImg } = useContext(ExportContext.Context);

  return (
    <footer className="footer-container">
      <div>
        <img src={footerImg} alt="sponsor du jour" />
      </div>
    </footer>
  );
}

export default Footer;
