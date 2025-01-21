import React, { useState, useEffect } from "react";
import mammoth from "mammoth";
import * as XLSX from "xlsx";

export default function DocView({ data }) {
  const [htmlContent, setHtmlContent] = useState("");
  const [error, setError] = useState("");

  const APIurl = process.env.REACT_APP_API;
  const fileUrl = `${APIurl}${data.filePath}`;
  const fileExtension = data.filePath.split(".").pop().toLowerCase();

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = () => {
          if (fileExtension === "docx") {
            mammoth
              .convertToHtml({ arrayBuffer: reader.result })
              .then((result) => {
                setHtmlContent(result.value);
              })
              .catch((err) => {
                setError("Error parsing Word document:", err);
              });
          } else if (fileExtension === "xlsx") {
            const workbook = XLSX.read(reader.result, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const html = XLSX.utils.sheet_to_html(worksheet);
            setHtmlContent(html);
          } else if (fileExtension === "pptx") {
            const googleSlidesUrl = `https://docs.google.com/presentation/d/${data.filePath
              .split("/")
              .pop()}/embed`;
            setHtmlContent(
              `<iframe src="${googleSlidesUrl}" width="100%" height="600px" frameborder="0"></iframe>`
            );
          } else {
            setError("Unsupported file type");
          }
        };

        reader.readAsArrayBuffer(blob);
      } catch (error) {
        setError("Error fetching file.");
        console.error(error);
      }
    };

    fetchFileContent();
  }, [fileUrl, fileExtension, data.filePath]);

  return (
    <section className="container">
      <div className="row justify-content-center p-md-4">
        <div className="col-md-9">
          <div
            className="doc-view-container shadow-sm p-2 rounded"
            style={{ maxHeight: "60vh" }}
          >
            {error && (
              <div className="text-danger fs-1 fw-bold text-center">
                {error}
              </div>
            )}
            <div className="file-content p-2">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
