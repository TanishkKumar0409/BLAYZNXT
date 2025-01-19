import React, { useEffect, useState } from "react";
import { noFileAPI } from "../../../Services/API/API";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function DeleteAccount() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { username } = useParams();
  const localUsername = JSON.parse(localStorage.getItem("user"));
  const redirector = useNavigate();
  const [timeoutExpired, setTimeoutExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (username !== localUsername) {
      redirector(`/main/user/${localUsername}`);
    }
  }, [username, localUsername, redirector]);

  useEffect(() => {
    if (username !== localUsername) {
      redirector("/");
      return;
    }

    const getData = async () => {
      try {
        const response = await noFileAPI.get(`/user/${username}`);
        setData(response.data);
        setEmail(response.data.email || "");
      } catch (error) {
        redirector("/");
        console.log(data);
        console.error(error.response.data.error);
      }
    };

    getData();
  }, [username, data, localUsername, redirector]);

  useEffect(() => {
    let timer;
    if (isSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimeoutExpired(true);
      toast.error("OTP time has expired.");
      redirector("/");
    }
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft, redirector]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await noFileAPI.post("/user/delete/otp", {
        email,
        password,
      });
      toast.success(response.data.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await noFileAPI.delete(`/user/delete/${username}`, {
        data: { deletionOtp: otp },
      });
      localStorage.clear();
      window.location.reload();
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 bg-white rounded p-5 shadow-sm mx-auto">
            <h3 className="text-center mb-4 text-dark">Delete Account</h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="fw-bold textDeep">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control border-deep"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-deep"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 text-end">
                  <Link
                    to={`/main/user/account/password/${username || "forgot"}`}
                    className="forgotBtn text-decoration-none textDeep"
                  >
                    Forgot Password
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-deep w-100"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="textDeep fw-bold">
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    OTP (One-Time Password)
                  </label>
                  <input
                    type="text"
                    className="form-control border-deep"
                    id="otp"
                    placeholder="Enter OTP sent to your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="my-3">
                  Time left:
                  <span className="text-danger ms-2">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-deep w-100"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Verify OTP"}
                </button>

                {timeoutExpired && (
                  <div className="text-danger mt-2">
                    OTP time has expired, please request a new one.
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
