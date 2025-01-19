import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InnerPagesBanner from "../../../Components/InnerPagesBanner/InnerPagesBanner";
import AdminTable from "../../BackendComponents/AdminTable/AdminTable";
import UsersTable from "../../BackendComponents/UsersTable/UsersTable";
import Query from "../../BackendComponents/Query/Query";
import Newsletter from "../../BackendComponents/Newsletter/Newsletter";
import Data from "./AdminPagesData.json";

export default function Admin() {
  const { type } = useParams();
  const navigate = useNavigate();

  const content = useMemo(() => Data, []);

  const pageData = content[type] || {};

  useEffect(() => {
    if (!content[type]) navigate("/");
  }, [type, navigate, content]);

  const TableComponent =
    type === "info"
      ? AdminTable
      : type === "user"
      ? UsersTable
      : type === "query"
      ? Query
      : type === "newsletter"
      ? Newsletter
      : null;

  const getHeaidng = (value) => {
    switch (value) {
      case "info":
        return "All Admins";

      case "user":
        return "All Users";

      case "query":
        return "All Queries";

      case "newsletter":
        return "All Newsletters";

      default:
        return "Unkonwn";
    }
  };

  return (
    <div>
      {pageData.icon && (
        <>
          <InnerPagesBanner heading={getHeaidng(type)} />
          <section className="bg-light py-5">
            <div className="container">
              <div className="row">
                <h2
                  className="text-center mb-4 mainHeading text-uppercase fw-bold"
                  style={{ "--text": `'${pageData.mainHeading}` }}
                >
                  {pageData.mainHeading}
                </h2>
                <p className="px-5 text-center">{pageData.sectionPara}</p>
                <div className="col">
                  {TableComponent && <TableComponent />}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
