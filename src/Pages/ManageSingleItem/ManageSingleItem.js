import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const ManageSingleItem = ({ product, handleDelete }) => {
  const {_id, image, productName, price, quantity } = product;

  
  return (
    <tr className="items-center border-b-2 border-gray-500">
      <td>
        <img
          src={image}
          alt=""
          className="mx-auto"
          style={{ width: "100px" }}
        />
      </td>
      <td className="text-sm md:text-base">{productName}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>
        <button
          onClick={()=>handleDelete(_id)}
          className="bg-red-600 col-span-2 mx-auto my-4 px-3 py-2 rounded-md"
        >
          <FontAwesomeIcon className="text-white" icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
};

export default ManageSingleItem;
