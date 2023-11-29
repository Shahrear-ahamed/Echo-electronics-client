import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading/Loading";
import { getToken } from "../../utils/token";

const SingleInventoryItem = () => {
  const token = getToken();
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `/inventory/products/${id}`;
  const [loading, setLoading] = useState(true);
  const [loadData, setLoadData] = useState(false);
  const [singleInventoryItem, setSingleInventoryItem] = useState({});
  const {
    _id,
    sold,
    price,
    image,
    inStock,
    product,
    quantity,
    description,
    supplierMail,
  } = singleInventoryItem;

  useEffect(() => {
    axios(url).then((response) => {
      setSingleInventoryItem(response.data?.result[0]);
      setLoading(false);
    });
  }, [url, loadData]);

  // reduce quantity by clicking
  const handleDeliver = () => {
    if (quantity <= 0) {
      return toast.warning(
        "Product are out of stock, Please Restock this item"
      );
    }

    const newQuantity = quantity - 1;
    const newSold = sold + 1;

    axios
      .patch(
        url,
        {
          quantity: newQuantity,
          sold: newSold,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data?.result?.matchedCount === 1) {
          toast.success("Delivered Successfully");
          setLoadData(!loadData);
        }
      });
  };

  // update restock
  const handleRestock = (e) => {
    e.preventDefault();

    const reStock = parseInt(e.target.reStock.value) + quantity;

    axios
      .patch(
        url,
        {
          quantity: reStock,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data?.result.matchedCount > 0) {
          toast.success("Stock update Successfully");
          e.target.reset();
          setLoadData(!loadData);
        }
      });
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <section>
        <div className="container mx-auto">
          <h2 className="text-3xl my-5 py-2 px-5 text-center font-semibold">
            {product}
          </h2>
          <div className="justify-center grid grid-cols-1 md:grid-cols-2">
            <div className="md:mt-10">
              <img
                src={image}
                alt={product}
                className="mx-auto"
                style={{ width: "450px" }}
              />
            </div>
            <div className="w-11/12 mx-auto">
              <h3 className="text-center my-5 text-3xl font-semibold">
                Product Details
              </h3>
              <div>
                <p className="py-2 px-5 border-b-2 border-black border-opacity-50">
                  Product ID: {_id}
                </p>
                <p className="py-2 px-5 border-b-2 border-black border-opacity-50">
                  Product name: {product}
                </p>
                <p className="py-2 px-5 border-b-2 border-black border-opacity-50">
                  Price: ${price}
                </p>
                <div className="py-2 px-5 border-b-2 border-black border-opacity-50">
                  <p className="flex justify-between items-center">
                    <span>
                      Quantity:{" "}
                      {inStock ? (
                        quantity
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Out of stock
                        </span>
                      )}
                    </span>
                    <span>Sold: {sold}</span>
                    <button
                      onClick={handleDeliver}
                      className="px-5 py-2 ml-6 rounded-lg border-2 text-white theme-color border-color">
                      Deliver
                    </button>
                  </p>
                </div>
                <p className="py-2 px-5 border-b-2 border-black border-opacity-50">
                  Supplier: {supplierMail}
                </p>
                <p className="py-2 px-5 border-b-2 border-black border-opacity-50">
                  {description.slice(0, 200)}
                </p>
                <div className="text-center my-3">
                  <h3 className="my-2 text-2xl font-semibold">Update Stock</h3>

                  <form onSubmit={handleRestock}>
                    <input
                      className="data-input border-b-2 border-gray-600 my-2 mr-6 py-1 px-2 outline-none"
                      name="reStock"
                      type="number"
                      placeholder="Stock Amount"
                      required
                    />
                    <input
                      className="theme-color text-white py-3 px-4 rounded-md mt-5 cursor-pointer"
                      type="submit"
                      value="Re Stock"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-5">
            <button
              onClick={() => navigate("/manage-inventory")}
              className="px-5 py-2 rounded-lg border-2 text-white theme-color border-color">
              Manage Inventories
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleInventoryItem;
