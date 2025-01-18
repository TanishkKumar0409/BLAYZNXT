import React from "react";
import ShareFilesTable from "../../Components/ShareFilesTable/ShareFilesTable";
import Footer from "../../Components/Footer/Footer";
import InnerPagesBanner from "../../Components/InnerPagesBanner/InnerPagesBanner";

export default function History() {
  const BannerData = {
    icon: "share-from-square",
    heading: "Shared History",
    para: "Explore your complete file-sharing history, track shared files, and view recipient details with ease.",
  };

  return (
    <>
      <InnerPagesBanner BannerData={BannerData} />
      <section className="py-5">
        <div className="container">
          <ShareFilesTable />
        </div>
      </section>
      <Footer />
    </>
  );
}
