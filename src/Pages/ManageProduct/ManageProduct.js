import axios from "axios";
import React, { useEffect, useState } from "react";
import ManageSingleItem from "../ManageSingleItem/ManageSingleItem";
import "./ManageProduct.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";
import handleDelete from "../Hooks/UseHandleDelete";

const ManageProduct = () => {
  const [manageProducts, setManageProducts] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [ProductCount, setProductCount] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalProductCount / ProductCount);
  const [loading, setLoading] = useState(true);

  // get page count from databse for pagination
  useEffect(() => {
    const url = "http://localhost:5000/inventorycount";
    axios(url).then((res) => setTotalProductCount(res.data.totalProduct));
  }, []);

  // load data from server
  useEffect(() => {
    const url = `http://localhost:5000/inventory?items=${ProductCount}&&page=${pageCount}`;
    axios(url).then((response) => {
      if (response.data.length === 0) {
        setPageCount(pageCount - 1);
      } else {
        setLoading(false);
        setManageProducts(response.data);
      }
    });
  }, [pageCount, ProductCount]);

  return loading ? (
    <Loading />
  ) : (
    <section>
      <div className="container mx-auto">
        <table className="my-5 mx-auto w-full" style={{ maxWidth: "850px" }}>
          <thead className="my-5">
            <tr
              className=" py-5 bg-gray-300 border-b-2 border-b-black"
              style={{ height: "50px" }}
            >
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>stock</th>
              <th>stock</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {manageProducts.map((product) => (
              <ManageSingleItem
                key={product._id}
                product={product}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
        <div
          className="flex justify-between w-full mx-auto my-8"
          style={{ maxWidth: "400px" }}
        >
          <div>
            {[...Array(totalPages)].map((page, index) => (
              <button
                className="pagination py-1 px-4 border-2 border-gray-500 mx-2 rounded-md"
                key={index}
                onClick={() => {
                  setPageCount(index);
                  setLoading(true);
                }}
                disabled={pageCount === index}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <select
            onChange={(e) => {
              setProductCount(e.target.value);
              setLoading(true);
            }}
            defaultValue={ProductCount}
            name="productCount"
            id="productCount"
            className="border-2 py-1 px-2"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => navigate("/add-items")}
            className="theme-color grid justify-center items-center mx-auto my-4 px-5 py-2 text-white rounded-md cursor-pointer"
          >
            Add new item
          </button>
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;
