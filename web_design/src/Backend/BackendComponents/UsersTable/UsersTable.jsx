import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { noFileAPI } from "../../../Services/API/API";
import { toast } from "react-toastify";

export default function UsersTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await noFileAPI.get("/user/all");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBlock = async (username) => {
    const confirmation = window.confirm(
      `Are you sure you want to block/unblock ${username}?`
    );
    if (!confirmation) {
      toast.info("Action canceled");
      return;
    }

    try {
      const blockingResponse = await noFileAPI.put(`/user/block/${username}`);
      toast.success(blockingResponse.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  const handlePromote = async (username) => {
    const confirmation = window.confirm(
      `Are you sure you want to promote ${username}?`
    );
    if (!confirmation) {
      toast.info("Promotion canceled");
      return;
    }

    try {
      const promoteResponse = await noFileAPI.put(`/user/promote/${username}`);
      toast.success(promoteResponse.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };

  const isDisabled = (user) => user.status === "BLOCKED";

  // Extract unique statuses dynamically from the data
  const uniqueStatuses = [...new Set(data.map((user) => user.status))];

  const filteredData = data.filter(
    (user) =>
      (user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.contact.toString().includes(search)) &&
      (status ? user.status === status : true)
  );

  const displayedData =
    location.pathname === "/admin/dashboard"
      ? filteredData.slice(0, 5)
      : filteredData;

  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              className="form-control border-deep textDeep"
              placeholder="Search by username, name, email, or contact"
              value={search}
              id="searchUser"
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              name="status"
              className="form-control border-deep fw-bold"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              {uniqueStatuses.map((statusOption) => (
                <option
                  key={statusOption}
                  className="textDeep fw-bold"
                  value={statusOption}
                >
                  {statusOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover w-100 h-100 text-nowrap align-middle rounded overflow-hidden">
          <thead className="text-center tableHeadCustom">
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Status</th>
              <th>View</th>
              <th>Promote</th>
              <th>Block/Unblock</th>
            </tr>
          </thead>
          <tbody className="tableBodyCustom">
            {displayedData.length > 0 ? (
              displayedData.map((user, index) => (
                <tr key={index}>
                  <td className="align-content-center">{index + 1}</td>
                  <td className="align-content-center">{user.username}</td>
                  <td className="align-content-center">{user.name}</td>
                  <td className="align-content-center">{user.email}</td>
                  <td className="align-content-center">{user.contact}</td>
                  <td className="align-content-center">{user.status}</td>
                  <td className="text-center">
                    <Link
                      to={`/admin/dashboard/user/${user.username}`}
                      className="btn btn-deep"
                    >
                      View
                    </Link>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-deep"
                      onClick={() => handlePromote(user.username)}
                      disabled={isDisabled(user)}
                    >
                      Promote
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-deep"
                      onClick={() => handleBlock(user.username)}
                      disabled={isDisabled(user)}
                    >
                      {user.status === "BLOCKED" ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center fw-bold fs-1">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col text-center">
          {data.length > 5 && location.pathname === "/admin/dashboard" && (
            <button className="btn btn-deep">Show All</button>
          )}
        </div>
      </div>
    </>
  );
}
