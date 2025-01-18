import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { noFileAPI } from "../../Services/API/API";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyUser() {
  const [otp, setOtp] = useState("");
  const redirector = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    if (username !== JSON.parse(localStorage.getItem("user"))) {
      redirector(`/verify/${JSON.parse(localStorage.getItem("user"))}`);
    }
  }, [username, redirector]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Enter OTP");
    }

    try {
      const response = await noFileAPI.post(`/user/verify/${username}`, {
        otp,
      });

      if (response) {
        toast.success(response.data.message);
        window.location.reload()
        redirector("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <section className="py-5 bgGradient vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card shadow border-0">
                <div className="card-header text-center bg-white border-0">
                  <h2 className="display-3 fw-semibold">Verify User</h2>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <label className="form-label">Enter OTP:</label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button className="btn btn-custom custom-btn w-100">
                      Verify
                    </button>
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
