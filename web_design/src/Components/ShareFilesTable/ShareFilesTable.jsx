import React, { useEffect, useState } from "react";
import { API } from "../../Services/API/API";
import { Link, useLocation } from "react-router-dom";

export default function ShareFilesTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
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

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = await API.get(`/share/history/user/${username}`);
        setData(fetchData.data);
        setFilteredData(fetchData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [username]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleYearChange = (event) => {
    setYearFilter(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonthFilter(event.target.value);
  };

  const handleDayChange = (event) => {
    setDayFilter(event.target.value);
  };

  const filterData = () => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter((file) =>
        file.receiverEmail.toLowerCase().includes(searchQuery)
      );
    }

    if (yearFilter) {
      filtered = filtered.filter(
        (file) =>
          new Date(file.sharedAt).getFullYear() === parseInt(yearFilter, 10)
      );
    }

    if (monthFilter) {
      filtered = filtered.filter(
        (file) =>
          new Date(file.sharedAt).getMonth() + 1 === parseInt(monthFilter, 10)
      );
    }

    if (dayFilter) {
      filtered = filtered.filter(
        (file) => new Date(file.sharedAt).getDate() === parseInt(dayFilter, 10)
      );
    }

    return filtered;
  };

  const displayedData =
    path === "/main"
      ? filterData().slice(0, 5)
      : filterData().slice(0, visibleCount);

  return (
    <>
      <section>
        <div className="container py-5">
          <div className="row">
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

            <div className="col">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="dropdown w-100 text-end">
                  <button
                    className="btn btn-custom custom-btn text-light px-4"
                    type="button"
                    id="filterDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-funnel"></i> Filters
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-start p-3 shadow border-0"
                    aria-labelledby="filterDropdown"
                    style={{ zIndex: "998" }}
                  >
                    <li className="mb-3">
                      <label htmlFor="searchEmail" className="form-label">
                        Search by Receiver Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
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
                        className="form-select"
                        value={yearFilter}
                        id="YearSearch"
                        onChange={handleYearChange}
                      >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
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
                        className="form-select"
                        value={monthFilter}
                        id="MonthSearch"
                        onChange={handleMonthChange}
                      >
                        <option value="">Select Month</option>
                        {months.map((month, index) => (
                          <option key={index + 1} value={index + 1}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </li>
                    <li>
                      <label htmlFor="DaySearch" className="form-label">
                        Day
                      </label>
                      <select
                        className="form-select"
                        value={dayFilter}
                        id="DaySearch"
                        onChange={handleDayChange}
                      >
                        <option value="">Select Day</option>
                        {Array.from({ length: 31 }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover m-0 text-center">
                  <thead className="tableHeadCustom">
                    <tr>
                      <th>Id</th>
                      <th>Shared Date</th>
                      <th>Shared Time</th>
                      <th>Shared To</th>
                      <th>Shared Message</th>
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
                            {new Date(file.sharedAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td>
                            {new Date(file.sharedAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </td>
                          <td>{file.receiverEmail}</td>
                          <td>{file.message}</td>
                          <td>{file.fileName.length} Files</td>
                        </tr>
                      ))
                    )}
                    {data.length > 5 ? (
                      path === "/main" ? (
                        <tr>
                          <td colSpan={`6`}>
                            <Link
                              to={"/main/history"}
                              className="btn btn-custom custom-btn"
                            >
                              Show All
                            </Link>
                          </td>
                        </tr>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}

                    {data.length > 0
                      ? path !== "/main" && (
                          <tr>
                            <td colSpan={`6`}>
                              <div className="text-center">
                                <div className="btn-group">
                                  {visibleCount < filteredData.length && (
                                    <button
                                      className="btn btn-custom custom-btn"
                                      onClick={() =>
                                        setVisibleCount((prev) => prev + 10)
                                      }
                                    >
                                      Show More
                                    </button>
                                  )}
                                  {visibleCount > 10 && (
                                    <button
                                      className="btn btn-custom custom-btn"
                                      onClick={() =>
                                        setVisibleCount((prev) =>
                                          Math.max(prev - 10, 10)
                                        )
                                      }
                                    >
                                      Show Less
                                    </button>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
