import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ManageSingleItem = ({ singleProduct, handleDelete }) => {
  const { _id, image, product, price, quantity } = singleProduct;
  const navigate = useNavigate();

  return (
    <tr
      className="items-center border-b-2 px-3 border-gray-500"
      style={{ height: "110px" }}>
      <td>
        <img
          src={image}
          alt=""
          className="mx-auto"
          style={{ width: "100px" }}
        />
      </td>
      <td className="text-sm md:text-base">{product}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td className="md:mt-4 flex flex-col md:flex-row justify-center items-center">
        <button
          onClick={() => navigate(`/inventory/${_id}`)}
          className="mt-4 md:mt-0 px-2 py-1 rounded-md theme-color text-white md:mr-2">
          Update
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className="bg-red-600 col-span-2 mx-auto my-4 px-3 py-2 rounded-md">
          <FontAwesomeIcon className="text-white" icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
};

export default ManageSingleItem;
