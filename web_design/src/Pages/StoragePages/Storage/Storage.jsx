import React from "react";
import InnerPagesBanner from "../../../Components/InnerPagesBanner/InnerPagesBanner";
import FileExplorer from "./StorageComponents/FileExplorer";
import Footer from "../../../Components/Footer/Footer";
import StroageAnalysis from "./StorageComponents/StroageAnalysis";

export default function Storage() {
  const username = JSON.parse(localStorage.getItem("user"));

  const BannerData = {
    icon: "hard-drive",
    heading: "Storage",
    para: "Manage and monitor your storage space effortlessly. Keep track of your files, optimize storage usage, and ensure smooth access to your important documents and data.",
  };

  return (
    <>
      <InnerPagesBanner BannerData={BannerData} />
      <FileExplorer username={username} />
      <StroageAnalysis />
      <Footer />
    </>
  );
}
