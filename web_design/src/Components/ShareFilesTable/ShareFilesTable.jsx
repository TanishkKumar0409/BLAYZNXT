import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../Services/API/API";
import { Link, useLocation } from "react-router-dom";

export default function ShareFilesTable() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [linkStatusFilter, setLinkStatusFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  const location = useLocation();
  const path = location.pathname;
  const username = JSON.parse(localStorage.getItem("user"));
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("en", { month: "long" })
  );

  const getData = useCallback(async () => {
    try {
      const fetchData = await API.get(`/share/history/user/${username}`);
      setData(fetchData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [username]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSearch = (event) =>
    setSearchQuery(event.target.value.toLowerCase());

  const handleYearChange = (event) => setYearFilter(event.target.value);
  const handleMonthChange = (event) => setMonthFilter(event.target.value);
  const handleDayChange = (event) => setDayFilter(event.target.value);
  const handleLinkStatusChange = (event) =>
    setLinkStatusFilter(event.target.value);

  const filterData = () => {
    return data.filter((file) => {
      const matchesSearch =
        !searchQuery || file.receiverEmail.toLowerCase().includes(searchQuery);
      const matchesYear =
        !yearFilter ||
        new Date(file.sharedAt).getFullYear() === parseInt(yearFilter, 10);
      const matchesMonth =
        !monthFilter ||
        new Date(file.sharedAt).getMonth() + 1 === parseInt(monthFilter, 10);
      const matchesDay =
        !dayFilter ||
        new Date(file.sharedAt).getDate() === parseInt(dayFilter, 10);
      const matchesStatus =
        !linkStatusFilter || file.deleteStatus === linkStatusFilter;

      return (
        matchesSearch &&
        matchesYear &&
        matchesMonth &&
        matchesDay &&
        matchesStatus
      );
    });
  };

  const displayedData =
    path === "/main"
      ? filterData().slice(0, 5)
      : filterData().slice(0, visibleCount);

  const uniqueStatuses = Array.from(
    new Set(data.map((item) => item.deleteStatus))
  );

  return (
    <section>
      <div className={`container ${path !== "/main/history" && "py-5"}`}>
        <div className="row textDeep">
          {path !== "/main/history" && (
            <>
              <h2
                className="text-center mb-4 mainHeading text-uppercase fw-bold"
                style={{ "--text": "'Shared History'" }}
              >
                Shared History
              </h2>
              <p className="px-5 text-center">
                View the history of shared files, keeping track of all documents
                shared with others for easy reference and management.
              </p>
            </>
          )}

          <div className="col">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="dropdown w-100 text-end">
                <button
                  className="btn btn-deep rounded-end-0"
                  onClick={getData}
                >
                  Refresh
                </button>
                <button
                  className="btn btn-deep rounded-start-0 text-light px-4"
                  type="button"
                  id="filterDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filters
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-start textDeep fw-bold p-3 shadow border-0"
                  aria-labelledby="filterDropdown"
                  style={{ zIndex: "998" }}
                >
                  <li className="mb-3">
                    <label htmlFor="searchEmail" className="form-label">
                      Search by Receiver Email
                    </label>
                    <input
                      type="text"
                      className="form-control border-deep"
                      placeholder="Enter email"
                      value={searchQuery}
                      onChange={handleSearch}
                      id="searchEmail"
                    />
                  </li>
                  <li className="mb-3">
                    <label htmlFor="YearSearch" className="form-label">
                      Year
                    </label>
                    <select
                      className="form-select border-deep"
                      value={yearFilter}
                      id="YearSearch"
                      onChange={handleYearChange}
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} className="textDeep" value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="mb-3">
                    <label htmlFor="MonthSearch" className="form-label">
                      Month
                    </label>
                    <select
                      className="form-select border-deep"
                      value={monthFilter}
                      id="MonthSearch"
                      onChange={handleMonthChange}
                    >
                      <option value="">Select Month</option>
                      {months.map((month, index) => (
                        <option
                          key={index + 1}
                          className="textDeep"
                          value={index + 1}
                        >
                          {month}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="mb-3">
                    <label htmlFor="DaySearch" className="form-label">
                      Day
                    </label>
                    <select
                      className="form-select border-deep"
                      value={dayFilter}
                      id="DaySearch"
                      onChange={handleDayChange}
                    >
                      <option value="">Select Day</option>
                      {Array.from({ length: 31 }, (_, index) => (
                        <option
                          key={index + 1}
                          className="textDeep"
                          value={index + 1}
                        >
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="mb-3">
                    <label htmlFor="statusSearch" className="form-label">
                      Link Status
                    </label>
                    <select
                      className="form-select border-deep"
                      value={linkStatusFilter}
                      id="statusSearch"
                      onChange={handleLinkStatusChange}
                    >
                      <option value="">Select Status</option>
                      {uniqueStatuses.map((status, index) => (
                        <option key={index} className="textDeep" value={status}>
                          {status === "PENDING" ? "Active" : "Expired"}
                        </option>
                      ))}
                    </select>
                  </li>
                </ul>
              </div>
            </div>

            <div className="table-responsive shadow-sm rounded">
              <table className="table table-hover m-0 text-center">
                <thead className="tableHeadCustom text-nowrap">
                  <tr>
                    <th>Id</th>
                    <th>Shared Date</th>
                    <th>Shared Time</th>
                    <th>Shared To</th>
                    <th>Shared Message</th>
                    <th>Link Status</th>
                    <th>File Shared</th>
                  </tr>
                </thead>
                <tbody className="tableBodyCustom">
                  {displayedData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center fw-bold fs-1">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    displayedData.map((file, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(file.sharedAt).toLocaleDateString("en-GB")}
                        </td>
                        <td>
                          {new Date(file.sharedAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>{file.receiverEmail}</td>
                        <td>{file.message}</td>
                        {file.deleteStatus === "PENDING" && (
                          <td>
                            <span className="d-block bg-success-subtle text-success p-2 rounded">
                              Active
                            </span>
                          </td>
                        )}
                        {file.deleteStatus === "DELETED" && (
                          <td>
                            <span className="d-block bg-danger-subtle text-danger p-2 rounded">
                              Expired
                            </span>
                          </td>
                        )}
                        <td>{file.fileName.length} Files</td>
                      </tr>
                    ))
                  )}
                  {data.length > 5 && path === "/main" && (
                    <tr>
                      <td colSpan="7">
                        <Link to="/main/history" className="btn btn-deep">
                          Show All
                        </Link>
                      </td>
                    </tr>
                  )}
                  {data.length > 10 && path === "/main/history" && (
                    <tr
                      className={`${
                        data.length === displayedData.length && "d-none"
                      } ${data.length < 10 && "d-none"}`}
                    >
                      <td colSpan="7" className="text-center">
                        <button
                          className={`btn btn-deep `}
                          onClick={() => setVisibleCount(visibleCount + 10)}
                        >
                          Load More
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
