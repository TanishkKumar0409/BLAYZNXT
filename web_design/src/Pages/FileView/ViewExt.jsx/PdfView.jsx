import React, { useState } from "react";
import { Document, Page } from "react-pdf";

export default function PdfView({ data }) {
  const [numPages, setNumPage] = useState();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPage(numPages);
  }
  const APIurl = process.env.REACT_APP_API;

  return (
    <>
      <div className="container p-3">
        <div className="row justify-content-center">
          <div className="col-md-8 shadow-sm rounded p-0 overflow-hidden">
            <div style={{ maxHeight: "60vh", overflow: "auto" }}>
              <Document
                file={`${APIurl}${data.filePath}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.apply(null, Array(numPages))
                  .map((x, i) => i + 1)
                  .map((page, index) => {
                    return (
                      <Page
                        key={index}
                        pageNumber={page}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    );
                  })}
              </Document>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
