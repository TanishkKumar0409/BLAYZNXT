import React from "react";
import ShareFilesTable from "../../Components/ShareFilesTable/ShareFilesTable";
import InnerPagesBanner from "../../Components/InnerPagesBanner/InnerPagesBanner";

export default function History() {
  return (
    <>
      <InnerPagesBanner heading={`Shared History`} />
      <section className="py-5">
        <div className="container">
          <ShareFilesTable />
        </div>
      </section>
    </>
  );
}
