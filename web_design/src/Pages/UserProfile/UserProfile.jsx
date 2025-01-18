import React, { useEffect, useState } from "react";
import { noFileAPI } from "../../Services/API/API";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await noFileAPI.get(`/user/${username}`);
        setData(response.data);
      } catch (error) {
        redirector("/");
        console.error(error.response.data.error);
      }
    };

    const intervalID = setInterval(() => {
      getData();
    }, 100);

    return () => clearInterval(intervalID);
  }, [username, redirector]);

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
      <section className="py-5 bgGradient">
        <div className="container rounded mt-5 shadow-sm p-4 bg-light">
          <div className="row">
            <div className="col-md-5 text-center d-flex justify-content-center align-items-center">
              <img
                src={`${APIurl}${data.profile}`}
                className="img-fluid rounded shadow-sm"
                style={{
                  aspectRatio: "4/3",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
                alt="User Profile"
              />
            </div>
            <div className="col-md-7">
              <h3 className="mb-4 fw-bold">
                {data.username || "User Details"}
              </h3>
              <div className="table-responsive " style={{ overflow: "unset" }}>
                <table className="table table-bordered table-hover">
                  <tbody>
                    <tr>
                      <th scope="row" className="text-secondary">
                        Name
                      </th>
                      <td>{data.name || "N/A"}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-secondary">
                        Email
                      </th>
                      <td>{data.email || "N/A"}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-secondary">
                        Contact
                      </th>
                      <td>{data.contact || "N/A"}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-secondary">
                        Role
                      </th>
                      <td>{data.role || "N/A"}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-secondary">
                        Status
                      </th>
                      <td>{data.status || "N/A"}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-secondary">
                        Used Storage
                      </th>
                      <td>{formatStorage(data.usedStorage)}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-secondary">
                        Total Storage
                      </th>
                      <td>{formatStorage(data.totalStorage)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="text-center">
                        <div className="btn-group w-100">
                          <Link
                            to={`/main/user/update/account/${username}`}
                            className="btn btn-custom custom-btn rounded-start w-100"
                          >
                            Update Profile
                          </Link>
                          <button
                            className="btn btn-custom custom-btn rounded-end w-100"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Actions
                          </button>
                          <ul
                            className="dropdown-menu dropdown-menu-end text-center p-0 overflow-hidden"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              <button
                                className="dropdown-item btn btn-custom custom-btn"
                                onClick={handleLogout}
                              >
                                Logout
                              </button>
                            </li>
                            <li>
                              <Link
                                to={`/main/user/account/password/${username}`}
                                className="dropdown-item btn btn-custom custom-btn"
                              >
                                Change Password
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/main/user/delete/account/${username}`}
                                className="dropdown-item btn btn-custom custom-btn"
                              >
                                Delete Account
                              </Link>
                            </li>
                            <li>
                              {data.status === "UNVERIFIED" ? (
                                <Link to={`/verify/send/${username}`} className="dropdown-item btn btn-custom custom-btn">
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
      <Footer />
    </>
  );
}
