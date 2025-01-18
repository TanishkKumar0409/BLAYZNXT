import React, { useEffect, useState } from "react";
import { noFileAPI } from "../../../Services/API/API";
import { toast } from "react-toastify";

export default function Query() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await noFileAPI.get("/user/contact/query");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const handleQueryDelete = async (id) => {
    try {
      const isDeleted = await noFileAPI.delete(`/user/contact/query/${id}`);
      const response = await noFileAPI.get("/user/contact/query");
      setData(response.data);
      toast.success(isDeleted.data.message);
    } catch (error) {
      console.error(error);
      toast.success(error.response.data.message);
    }
  };

  const displayedData = data.slice(0, 5);

  const hasMoreData = data.length > displayedData.length;

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover w-100 h-100 text-nowrap align-middle rounded overflow-hidden">
          <thead className="text-center tableHeadCustom">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="tableBodyCustom text-center">
            {displayedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center fw-bold fs-1">
                  No data available
                </td>
              </tr>
            ) : (
              displayedData.map((query, index) => (
                <tr key={index}>
                  <td className="align-content-center">{index + 1}</td>
                  <td className="align-content-center">
                    {query.name || "N/A"}
                  </td>
                  <td className="align-content-center">
                    {query.email || "N/A"}
                  </td>
                  <td className="align-content-center">
                    {query.contact || "N/A"}
                  </td>
                  <td className="align-content-center">
                    {query.subject || "N/A"}
                  </td>
                  <td className="align-content-center">
                    {query.message || "N/A"}
                  </td>
                  <td className="align-content-center">
                    <button
                      className="btn-custom custom-btn btn text-nowrap btn-sm"
                      onClick={() => handleQueryDelete(query._id)}
                    >
                      Delete Query
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {hasMoreData && (
        <div className="row">
          <div className="col text-center">
            <button className="btn custom-btn btn-custom">Show All</button>
          </div>
        </div>
      )}
    </>
  );
}
