import React from "react";
import RecentFiles from "./MainComponents/RecentFiles/RecentFiles";
import Banner from "./MainComponents/Banner/Banner";
import ShareFilesTable from "../../Components/ShareFilesTable/ShareFilesTable";

export default function Main() {
  return (
    <>
      <Banner />
      <RecentFiles />
      <ShareFilesTable />
    </>
  );
}
