import React from "react";
import RecentFiles from "./MainComponents/RecentFiles/RecentFiles";
import Footer from "../../Components/Footer/Footer";
import Banner from "./MainComponents/Banner/Banner";
import ShareFilesTable from "../../Components/ShareFilesTable/ShareFilesTable";

export default function Main() {
  return (
    <>
      <Banner />
      <RecentFiles />
      <ShareFilesTable />
      <Footer />
    </>
  );
}
