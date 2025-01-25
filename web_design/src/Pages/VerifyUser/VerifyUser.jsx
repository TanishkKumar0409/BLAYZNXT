import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { noFileAPI } from "../../Services/API/API";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyUser() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const redirector = useNavigate();
  const { username } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      const response = await noFileAPI.post(`/user/verify/${username}`, {
        otp,
      });

      if (response) {
        toast.success(response.data.message);
        redirector("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Verification failed");
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      toast.error("Time's up! Please try again.");
      redirector("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, redirector]);

  useEffect(() => {
    if (username !== JSON.parse(localStorage.getItem("user"))) {
      redirector(`/verify/${JSON.parse(localStorage.getItem("user"))}`);
    }
  }, [username, redirector]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <>
      <section
        className="othersBanner align-content-center"
        style={{ minHeight: "92vh" }}
      >
        <div className="container">
          <div className="row py-5 justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm border-0">
                <div className="card-header text-center bg-white border-0">
                  <h2 className="fs-1 fw-semibold">Verify User</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit} className="textDeep fw-bold">
                    <label htmlFor="otp" className="form-label">
                      Enter OTP:
                    </label>
                    <input
                      id="otp"
                      type="text"
                      className="form-control mb-3 border-deep"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className="my-3">
                      Time left:
                      <span className="text-danger ms-2">
                        {formatTime(timeLeft)}
                      </span>
                    </div>

                    <button className="btn btn-deep w-100">Verify</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
