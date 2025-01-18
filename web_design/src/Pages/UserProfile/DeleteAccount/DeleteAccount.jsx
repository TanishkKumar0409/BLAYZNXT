import React, { useEffect, useState } from "react";
import { noFileAPI } from "../../../Services/API/API";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

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
    <section className="bgGradient align-content-center py-5 vh-100">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 bg-white rounded p-5 shadow mx-auto">
            <h3 className="text-center mb-4 text-dark">Delete Account</h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-muted">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-custom custom-btn w-100"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label text-muted">
                    OTP (One-Time Password)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    placeholder="Enter OTP sent to your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="text-danger my-3">
                  Time left: {formatTime(timeLeft)}
                </div>

                <button
                  type="submit"
                  className="btn btn-custom custom-btn w-100"
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
