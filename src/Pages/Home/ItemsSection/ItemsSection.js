import axios from "../../../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleItem from "../SingleItem/SingleItem";

const ItemsSection = () => {
  const navigate = useNavigate();
  const [homeItems, setHomeItems] = useState([]);
  const extended = "limit=6";

  // get all products
  useEffect(() => {
    axios(`/inventory/products?${extended}`).then((res) =>
      setHomeItems(res.data?.products)
    );
  }, []);

  return (
    <div className="container mx-auto my-4 px-5 md:px-0 grid items-center justify-items-center">
      <h2 className="text-3xl my-3 font-semibold">Inventory Items</h2>
      <div className="bar mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {homeItems?.map((product) => (
          <SingleItem key={product._id} singleProduct={product} />
        ))}
      </div>
      <button
        onClick={() => navigate("/manage-inventory")}
        className="theme-color text-white py-3 px-4 rounded-md my-7 cursor-pointer">
        Manage Inventories
      </button>
    </div>
  );
};

export default ItemsSection;
