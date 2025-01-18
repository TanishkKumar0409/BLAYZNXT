import React, { useEffect, useState } from "react";
import { noFileAPI } from "../../../../Services/API/API";

export default function StorageAnalysis() {
  const username = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState([]);
  const [gradientColors, setGradientColors] = useState({
    start: "#e91e63",
    end: "#673ab7",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await noFileAPI.get(`/user/${username}`);
        setData(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(() => {
      getData();
    }, 5000);

    getData();

    return () => clearInterval(intervalId);
  }, [username]);

  const usedSize = data.usedStorage || 0;
  const totalSize = data.totalStorage || 1;

  const circumference = 2 * Math.PI * 90;

  let percentage = parseFloat(((usedSize / totalSize) * 100).toFixed(2));

  let perValue = 0;

  if (percentage > 100 || percentage === 0) {
    perValue = 100;
  } else if (percentage <= 100) {
    perValue = percentage;
  }

  const value = circumference - circumference * (perValue / 100);

  const getGradientColors = (percentage) => {
    if (percentage > 100) {
      return { start: "#d3d3d3", end: "#a9a9a9" };
    } else if (percentage <= 20) {
      return { start: "#00bcd4", end: "#2196f3" };
    } else if (percentage <= 40) {
      return { start: "#4caf50", end: "#8bc34a" };
    } else if (percentage <= 60) {
      return { start: "#ffc107", end: "#ff9800" };
    } else if (percentage <= 80) {
      return { start: "#ff5722", end: "#f44336" };
    }
    return { start: "#e91e63", end: "#673ab7" };
  };

  const displaySize = (sizeInBytes) => {
    if (sizeInBytes >= 1024 * 1024 * 1024) {
      return `${(sizeInBytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
    } else {
      return `${(sizeInBytes / 1024 / 1024).toFixed(2)} MB`;
    }
  };

  useEffect(() => {
    setGradientColors(getGradientColors(percentage));
  }, [percentage]);

  return (
    <section className="bg-white py-5">
      <div className="container">
        <h2
          className="text-center mb-4 mainHeading text-uppercase fw-bold"
          style={{ "--text": `'${username} Storage'` }}
        >
          {username} Storage
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row py-3">
          <div className="col-md-6 textJustify">
            <p>
              The storage page is committed to providing you with a variety of
              secure and dependable storage options adapted to your unique
              requirements. Whether you need to store personal goods, business
              items, or anything in between, we have versatile solutions for
              both short-term and long-term storage. Our cutting-edge facilities
              are outfitted with extensive security features, such as 24-hour
              surveillance and climate-controlled conditions, to assure your
              items' protection and preservation. With quick access, inexpensive
              pricing, and a range of sizes to select from, you can count on us
              to provide a hassle-free and secure storage experience that will
              give you peace of mind.
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <div className="skill position-relative">
              <div className="outer rounded-circle">
                <div className="inner rounded-circle d-flex justify-content-center align-items-center">
                  <div
                    id="number"
                    className="text-center align-content-center h-100"
                  >
                    <h4>{percentage > 100 ? "0" : percentage}%</h4>
                    <p>
                      {displaySize(usedSize)}/{displaySize(totalSize)}
                    </p>
                  </div>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="200px"
                height="200px"
                className="position-absolute top-0 start-0"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stopColor={gradientColors.start} />
                    <stop offset="100%" stopColor={gradientColors.end} />
                  </linearGradient>
                </defs>
                <circle
                  id="circle"
                  cx="100"
                  cy="100"
                  r="90"
                  style={{ "--array": value, "--circumference": circumference }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
