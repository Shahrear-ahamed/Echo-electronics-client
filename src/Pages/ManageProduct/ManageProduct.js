import axios from "axios";
import React, { useEffect, useState } from "react";
import ManageSingleItem from "../ManageSingleItem/ManageSingleItem";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {
  const [manageProducts, setManageProducts] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [ProductCount, setProductCount] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalProductCount / ProductCount);

  // get page count from databse for pagination
  useEffect(() => {
    const url = "http://localhost:5000/inventorycount";
    axios(url).then((res) => setTotalProductCount(res.data.totalProduct));
  }, []);

  // load data from server
  useEffect(() => {
    const url = `http://localhost:5000/inventory?items=${ProductCount}&&page=${pageCount}`;
    axios(url).then((response) => setManageProducts(response.data));
  }, [pageCount, ProductCount]);

  // delete item
  const handleDelete = (id) => {
    const url = `http://localhost:5000/inventory/${id}`;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(url).then((response) => {
          if (response.data.deletedCount > 0) {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
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
                className="py-1 px-4 border-2 border-gray-500 mx-2 rounded-md"
                key={index}
                onClick={() => setPageCount(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <select
            onChange={(e) => setProductCount(e.target.value)}
            name="productCount"
            id="productCount"
            defaultValue={10}
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
