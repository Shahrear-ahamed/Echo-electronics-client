import React from "react";
import { useNavigate } from "react-router-dom";

const SingleItem = ({ singleProduct }) => {
  const navigate = useNavigate();
  const { description, image, price, product, quantity, supplierMail, _id } =
    singleProduct;

  return (
    <div className="shadow-lg p-5 rounded-lg" style={{ maxWidth: "350px" }}>
      <img src={image} alt={product} className="w-3/5 mx-auto" />
      <h2 className="text-xl font-medium">{product}</h2>
      <p className="my-2 flex justify-between">
        <span>Price: ${price}</span>
        <span>
          <span className={quantity < 6 ? "text-red-500" : "text-green-700"}>
            {quantity > 0 ? "In Stock: " : "Out of Stock: "}
          </span>
          {quantity}
        </span>
      </p>
      <h3 className="mb-3">Supplier: {supplierMail}</h3>
      <p>{description?.slice(0, 100)}</p>
      <button
        onClick={() => navigate(`/inventory/${_id}`)}
        className="mt-4 px-5 py-2 rounded-md theme-color text-white">
        Stock Update
      </button>
    </div>
  );
};

export default SingleItem;
