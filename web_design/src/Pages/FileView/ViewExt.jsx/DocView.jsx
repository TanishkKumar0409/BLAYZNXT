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
    <section className="bg-white p-3 rounded">
      <div
        className="doc-view-container shadow-sm rounded bg-light p-3"
        style={{ maxHeight: "500px" }}
      >
        {error && <div className="error-message">{error}</div>}
        <div className="file-content">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </section>
  );
}
