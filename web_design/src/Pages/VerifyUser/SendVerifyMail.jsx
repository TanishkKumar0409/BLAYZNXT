import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { noFileAPI } from "../../Services/API/API";
import { toast } from "react-toastify";

export default function SendVerifyMail() {
  const [email, setEmail] = useState("");
  const localUsername = JSON.parse(localStorage.getItem("user"));
  const { username } = useParams();
  const [data, setData] = useState();
  const [btnMessage, setBtnMessage] = useState("Send OTP");
  const redirector = useNavigate();

  useEffect(() => {
    if (username !== localUsername) {
      redirector(`/verify/send/${localUsername}`);
    }
  }, [username, localUsername, redirector]);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataResponse = await noFileAPI.get(`/user/${username}`);
        setData(dataResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [username]);

  useEffect(() => {
    if (data?.email) {
      setEmail(data.email);
    }
  }, [data]);

  const handleSendOtp = async () => {
    try {
      setBtnMessage("Sending....");
      const response = await noFileAPI.post(`/user/verify/send/${username}`, {
        email,
      });
      if (response) {
        toast.success(response.data.message);
        redirector(`/verify/${username}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <section>
        <div className="container mt-5">
          <div className="row pt-5">
            <div className="col-md-6 rounded shadow-sm p-5 mx-auto textDeep text-center">
              <h3 className="text-center mb-4">Verify Your Account</h3>
              <p>Enter your email address to receive a verification OTP.</p>
              <input
                type="email"
                className="form-control mb-3 border-deep bg-white"
                placeholder="Enter your email"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="btn-group">
                <button className="btn btn-deep" onClick={handleSendOtp}>
                  {btnMessage}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
