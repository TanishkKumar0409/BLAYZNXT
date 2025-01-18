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
      <div className="container bg-light p-3 rounded">
        <h2>{data.root}</h2>
        <div style={{ maxHeight: "80vh", overflow: "auto" }} className="shadow">
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
                    className={`p-2`}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                );
              })}
          </Document>
        </div>
      </div>
    </>
  );
}
