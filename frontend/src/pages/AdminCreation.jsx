import React, { useState } from "react";

import AdminCreationJournee from "@components/AdminCreation/AdminCreationJournee";
import AdminCreationMatch from "@components/AdminCreation/AdminCreationMatch";

import "@styles/AdminCreation.css";

function AdminCreation() {
  const [update, setUpdate] = useState(false);
  const handleUpdate = () => {
    setUpdate(!update);
  };

  return (
    <>
      <AdminCreationJournee update={update} handleUpdate={handleUpdate} />
      <AdminCreationMatch update={update} />
    </>
  );
}

export default AdminCreation;
