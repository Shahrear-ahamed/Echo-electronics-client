import React from "react";
import cargoTransport from "../../../images/big-transport.jpg";

const ExtraFacilities = () => {
  return (
    <div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 my-5">
        <div className="p-5 order-2 md:order-1">
          <img className="rounded-lg" src={cargoTransport} alt="" />
        </div>
        <div className="grid order-1 md:order-2 content-center justify-items-start px-5">
          <h2 className="text-3xl font-semibold mb-3">
            Cargo Transport facilities
          </h2>
          <p className="text-gray-700 mr-7 md:mr-0 py-4">
            We Provide Transportation facilities. We believe to give more extra
            facilities for our clients and customer also. Our every customer is
            a most valuable product. we make sure every product has safely
            arrived in your hand properly.
          </p>
          <button className="px-5 py-2 border-2 rounded-lg border-color mt-4">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtraFacilities;
