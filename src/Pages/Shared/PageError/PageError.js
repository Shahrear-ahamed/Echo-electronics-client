import React from "react";
import "./PageError.css";

const PageError = () => {
  return (
    <section className="grid justify-center">
      {/* this section are for error page  */}
      <div className="error"></div>
      <h2 className="my-9 text-center font-semibold text-3xl">OPPS! PAGE NOT FOUND </h2>
    </section>
  );
};

export default PageError;
