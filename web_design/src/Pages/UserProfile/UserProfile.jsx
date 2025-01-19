import React, { useCallback, useEffect, useState } from "react";
import { noFileAPI } from "../../Services/API/API";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserProfile() {
  const [data, setData] = useState([]);
  const { username } = useParams();
  const localUsername = JSON.parse(localStorage.getItem("user"));
  const redirector = useNavigate();

  useEffect(() => {
    if (username !== localUsername) {
      redirector(`/main/user/${localUsername}`);
    }
  }, [username, localUsername, redirector]);

  const getData = useCallback(async () => {
    try {
      const response = await noFileAPI.get(`/user/${username}`);
      setData(response.data);
    } catch (error) {
      redirector("/");
      console.error(error.response.data.error);
    }
  }, [username, redirector]);

  useEffect(() => {
    getData();
  }, [getData]);

  const APIurl = process.env.REACT_APP_API;

  const formatStorage = (bytes) => {
    if (!bytes) return "0 MB";
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1) {
      return `${gb.toFixed(2)} GB`;
    }
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row rounded shadow-sm p-4">
            <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
              <img
                src={`${APIurl}${data.profile}`}
                className="img-fluid rounded w-100"
                style={{ aspectRatio: "4/4" }}
                alt={data.username || "User Profile"}
              />
            </div>
            <div className="col-md-8">
              <h3 className="mb-4 fw-bold">
                {data.username || "User Details"}
              </h3>
              <div className="table-responsive " style={{ overflow: "unset" }}>
                <table className="table table-hover">
                  <tbody className="tableBodyCustom">
                    <tr>
                      <th scope="row">Name</th>
                      <td>{data.name || "N/A"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{data.email || "N/A"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Contact</th>
                      <td>{data.contact || "N/A"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Role</th>
                      <td>{data.role || "N/A"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Status</th>
                      <td>{data.status || "N/A"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Used Storage</th>
                      <td>{formatStorage(data.usedStorage)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Total Storage</th>
                      <td>{formatStorage(data.totalStorage)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-center">
                        <div className="btn-group w-100">
                          <Link
                            to={`/main/user/update/account/${username}`}
                            className="btn btn-deep rounded-start w-100"
                          >
                            Update Profile
                          </Link>
                          <button
                            className="btn btn-deep rounded-end w-100"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Actions
                          </button>
                          <ul
                            className="dropdown-menu dropdown-menu-end text-center border-0 shadow overflow-hidden"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              <button
                                className="dropdown-item textDeep fw-bold"
                                onClick={handleLogout}
                              >
                                Logout
                              </button>
                            </li>
                            <li>
                              <Link
                                to={`/main/user/account/password/${username}`}
                                className="dropdown-item textDeep fw-bold"
                              >
                                Change Password
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/main/user/delete/account/${username}`}
                                className="dropdown-item textDeep fw-bold"
                              >
                                Delete Account
                              </Link>
                            </li>
                            <li>
                              {data.status === "UNVERIFIED" ? (
                                <Link
                                  to={`/verify/send/${username}`}
                                  className="dropdown-item textDeep fw-bold"
                                >
                                  Verify {data.username}
                                </Link>
                              ) : (
                                ""
                              )}
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
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
