import React from "react";
import wareHoseQuality from "../../../images/flower-warehouse.jpg";

const OurQuality = () => {
  return (
    <div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 my-5">
        <div className="grid content-center md:text-right justify-items-start md:justify-items-end px-5">
          <h2 className="text-3xl font-semibold mb-3">
            Your product is our big responsibility
          </h2>
          <p className="text-gray-700 mr-7 md:mr-0 py-4">
            We Store any kind of product which are relevant to electronics
            product, But our priority is eco-friendly products. because most
            electronics products are harmful to the future world. that's why our
            most valuable product is an eco-friendly product
          </p>
          <button className="px-5 py-2 border-2 rounded-lg border-color mt-4">
            Read More
          </button>
        </div>
        <div className="p-5">
          <img className="rounded-lg" src={wareHoseQuality} alt="" />
        </div>
      </div>
    </div>
  );
};

export default OurQuality;
