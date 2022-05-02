import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SingleInventoryItem = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [singleInventoryItem, setSingleInventoryItem] = useState({});
  const { _id, image, productName, desc, price, supplier } =
    singleInventoryItem;
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(() => {
    const url = `http://localhost:5000/inventory/${id}`;
    axios(url).then((response) => {
      setSingleInventoryItem(response.data);
      setItemQuantity(response.data.quantity);
    });
  }, [id]);

  // reduce quantity by clicking
  const handleDeliver = () => {
    const reduceQuantity = itemQuantity - 1;
    setItemQuantity(reduceQuantity);
    const url = `http://localhost:5000/inventory/${id}`;
    axios
      .put(url, {
        quantity: reduceQuantity,
      })
      .then((response) => {
        if (response.data.matchedCount > 0) {
          toast.success("Delivered Successfully");
        }
      });
  };
  // update restock
  const stockAmount = useRef();

  const handleRestock = () => {
    const stockAmountNumber = parseInt(stockAmount.current.value);
    const totalStock = stockAmountNumber + itemQuantity;
    setItemQuantity(totalStock);
    const url = `http://localhost:5000/inventory/${id}`;
    axios
      .put(url, {
        quantity: totalStock,
      })
      .then((response) => {
        if (response.data.matchedCount > 0) {
          toast.success("Stock update Successfully");
          stockAmount.current.value = "";
        }
      });
  };

  return (
    <section>
      <div className="container mx-auto justify-center grid grid-cols-1 md:grid-cols-2">
        <div className="h-full grid items-center content-center">
          <img
            src={image}
            alt={productName}
            className="mx-auto"
            style={{ width: "450px" }}
          />
          <p className="text-center">
            <small>{productName}</small>
          </p>
        </div>
        <div className="w-11/12 mx-auto">
          <h2 className="text-center my-5 text-3xl font-semibold">
            Product Details
          </h2>
          <div>
            <h3 className="text-xl py-2 px-5 border-y-2 border-black border-opacity-50">
              Product Name: <span className="font-semibold">{productName}</span>
            </h3>
            <p className="py-2 px-5 border-b-2 border-black border-opacity-50">
              Product ID: {_id}
            </p>
            <p className="py-2 px-5 border-b-2 border-black border-opacity-50">
              Price: ${price}
            </p>
            <p className="py-2 px-5 border-b-2 border-black border-opacity-50">
              Quantity: {itemQuantity}
            </p>
            <p className="py-2 px-5 border-b-2 border-black border-opacity-50">
              Supplier: {supplier}
            </p>
            <p className="py-2 px-5 border-b-2 border-black border-opacity-50">
              {desc}
            </p>
            <div className="flex justify-between my-5  md:mx-5">
              <button
                onClick={handleDeliver}
                className="px-5 py-2 ml-6 rounded-lg border-2 text-white theme-color border-color"
              >
                Deliver
              </button>
              <button 
              onClick={()=>navigate("/manage-inventory")}
              className="px-5 py-2 ml-6 rounded-lg border-2 text-white theme-color border-color">
                Manage Inventories
              </button>
            </div>
            <div className="text-center my-5 pb-5">
              <h3 className="my-5 text-2xl font-semibold">Update Product</h3>

              <div>
                <input
                  className="data-input border-b-2 border-gray-600 my-2 mr-6 py-1 px-2 outline-none"
                  type="number"
                  ref={stockAmount}
                  placeholder="Stock Amount"
                  required
                />
                <button
                  onClick={handleRestock}
                  className="theme-color text-white py-3 px-4 rounded-md mt-5 cursor-pointer"
                >
                  Re stock
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleInventoryItem;
