import React from "react";
import InnerPagesBanner from "../../../Components/InnerPagesBanner/InnerPagesBanner";
import FileExplorer from "./StorageComponents/FileExplorer";
import StroageAnalysis from "./StorageComponents/StroageAnalysis";

export default function Storage() {
  const username = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <InnerPagesBanner heading={`Storage`} />
      <FileExplorer username={username} />
      <StroageAnalysis />
    </>
  );
}
