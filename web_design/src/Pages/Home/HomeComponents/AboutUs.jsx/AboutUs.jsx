import React from "react";

export default function AboutUs() {
  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <img
                src="https://img.pikbest.com/png-images/20241027/eagle-shield-emblem-logo_11012401.png!bw700"
                className="img-fluid"
                style={{ maxWidth: "350px" }}
                alt="Project Logo"
              />
            </div>
            <div className="col-md-6 align-content-center textDeep py-md-0 py-5">
              <h2>ABOUT THIS PROJECT</h2>
              <p>
                This is a personal effort aimed at revolutionizing how people
                save and distribute files. It has a simple design that makes it
                easier to handle a variety of assets, such as documents,
                photographs, and videos. With a focus on security, it employs
                powerful encryption technologies to ensure that all files are
                kept and delivered discreetly and securely. The initiative
                serves both individuals and enterprises by providing scalable
                and dependable information storage and sharing solutions. Its
                user-friendly design facilitates file organization, and
                configurable settings allow users to adjust the system to their
                individual requirements. This project's combination of
                simplicity, robust security, and accessibility makes it an
                excellent choice for anyone wishing to handle files with
                confidence and convenience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
