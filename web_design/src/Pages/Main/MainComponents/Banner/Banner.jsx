import React, { useState } from "react";
import DragAndDropBox from "./DragAndDropBox/DragAndDropBox";
import DownloadLink from "./DownloadLink/DownloadLink";

export default function Banner() {
  const [isSend, setIsSend] = useState(false);

  return (
    <section className="mainBanner">
      <div className="container">
        <div className="row flex-column-reverse flex-md-row align-items-center">
          <div className="col-md-6 text-white p-3 p-md-0">
            <div>
              <h2 className="fs-1 fw-bold mb-4">Easy File Upload & Sharing</h2>
              <p className="fs-5 textJustify pe-md-5">
                Upload and share your files effortlessly. Simply drag and drop
                your files here to start sharing them securely with others.
              </p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            {isSend ? (
              <DownloadLink />
            ) : (
              <DragAndDropBox onSend={() => setIsSend(true)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
