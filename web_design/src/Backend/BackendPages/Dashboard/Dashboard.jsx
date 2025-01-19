import React from "react";
import InnerPagesBanner from "../../../Components/InnerPagesBanner/InnerPagesBanner";
import UsersTable from "../../BackendComponents/UsersTable/UsersTable";
import AdminTable from "../../BackendComponents/AdminTable/AdminTable";
import Query from "../../BackendComponents/Query/Query";
import SectionsData from "./DashboardData.json";
import Newsletter from "../../BackendComponents/Newsletter/Newsletter";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const componentMapping = {
    AdminTable: <AdminTable />,
    UsersTable: <UsersTable />,
    Query: <Query />,
    Newsletter: <Newsletter />,
  };

  return (
    <div>
      <InnerPagesBanner heading={`Dashboard`} />
      {SectionsData.map((section, index) => (
        <section className={`${section.bgColor} py-5`} key={index}>
          <div className="container">
            <div className="row">
              <h2
                className="text-center mb-4 mainHeading text-uppercase fw-bold"
                style={{ "--text": `'${section.title}'` }}
              >
                {section.title}
              </h2>
              <p className="px-5 text-center">{section.description}</p>
              <div className="col">{componentMapping[section.component]}</div>
              <div className="text-center">
                <Link
                  to={`/admin/dashboard/${section.link}`}
                  className="btn btn-deep"
                >
                  Show All
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
