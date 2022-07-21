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
    <div className="match-list-container">
      <AdminCreationJournee update={update} handleUpdate={handleUpdate} />
      <AdminCreationMatch update={update} />
    </div>
  );
}

export default AdminCreation;
