import React, { useEffect, useState } from "react";
import { noFileAPI } from "../../../Services/API/API";

export default function Newsletter() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await noFileAPI.get("/user/newsletter/all");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const displayedData = data.slice(0, 5);
  const hasMoreData = data.length > displayedData.length;

  const DateTimeFormatter = (createdAt) => {
    const date = createdAt ? new Date(createdAt).toLocaleDateString() : "N/A";
    const time = createdAt
      ? new Date(createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "N/A";
    return { date, time };
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover w-100 h-100 text-nowrap align-middle rounded overflow-hidden">
          <thead className="text-center tableHeadCustom">
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Subscribed Date</th>
              <th>Subscribed Time</th>
            </tr>
          </thead>
          <tbody className="tableBodyCustom text-center">
            {displayedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center fw-bold fs-1">
                  No data available
                </td>
              </tr>
            ) : (
              displayedData.map((query, index) => {
                const { date, time } = DateTimeFormatter(query.createdAt);
                return (
                  <tr key={index}>
                    <td className="align-content-center">{index + 1}</td>
                    <td className="align-content-center">
                      {query.email || "N/A"}
                    </td>
                    <td className="align-content-center">{date}</td>
                    <td className="align-content-center">{time}</td>
                  </tr>
                );
              })
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
