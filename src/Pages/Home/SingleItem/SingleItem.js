import React from "react";
import { useNavigate } from "react-router-dom";

const SingleItem = ({ product }) => {
  const navigate = useNavigate();
  const { _id, productName, price, image, quantity, supplier, desc } = product;
  return (
    <div className="shadow-lg p-5 rounded-lg" style={{ maxWidth: "350px" }}>
      <img src={image} alt={productName} className="w-3/5 mx-auto" />
      <h2 className="text-xl font-medium">{productName}</h2>
      <p className="my-2 flex justify-between">
        <span>Price: ${price}</span>
        <span>
          <span className={quantity < 6 ? "text-red-500" : "text-green-700"}>
            {quantity > 0 ? "In Stock: " : "Out of Stock: "}
          </span>
          {quantity}
        </span>
      </p>
      <h3 className="mb-3">Supplier Name: {supplier}</h3>
      <p>{desc}</p>
      <button
        onClick={() => navigate(`/manage-product/${_id}`)}
        className="mt-4 px-5 py-2 rounded-md theme-color text-white"
      >
        Stock Update
      </button>
    </div>
  );
};

export default SingleItem;
