import React from "react";

import AdminCreationJournee from "@components/AdminCreation/AdminCreationJournee";
import AdminCreationMatch from "@components/AdminCreation/AdminCreationMatch";

import "@styles/AdminCreation.css";

function AdminCreation() {
  return (
    <>
      <AdminCreationJournee />
      <AdminCreationMatch />
    </>
  );
}

export default AdminCreation;
