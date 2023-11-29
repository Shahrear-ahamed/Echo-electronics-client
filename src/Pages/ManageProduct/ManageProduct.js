import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ManageSingleItem from "../ManageSingleItem/ManageSingleItem";
import Loading from "../Shared/Loading/Loading";
import "./ManageProduct.css";

const ManageProduct = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [ProductCount, setProductCount] = useState(10);
  const [manageProducts, setManageProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // load data from server
  useEffect(() => {
    const url = `/inventory/products?page=${pageCount}&limit=${ProductCount}`;

    // data call
    axios(url).then((response) => {
      setLoading(false);
      setTotalPages(response?.data?.pages);
      setManageProducts(response.data?.products);
    });
  }, [pageCount, ProductCount, isDeleted]);

  // delete items
  const handleDelete = (id) => {
    const url = `/inventory/products/${id}`;
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
            setIsDeleted(!isDeleted);
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          }
        });
      }
    });
  };

  return user?.loading || loading ? (
    <Loading />
  ) : (
    <section>
      <div className="container mx-auto">
        <div className="my-2 md:my-5 text-center">
          <h2
            className="text-3xl md:text-4xl font-semibold py-2 md:py-4"
            style={{ color: "#6ead4e" }}>
            Manage Inventory
          </h2>
          <div>
            <button
              onClick={() => navigate("/add-items")}
              className="theme-color grid justify-center items-center mx-auto my-4 px-5 py-2 text-white rounded-md cursor-pointer">
              Add new item
            </button>
          </div>
        </div>
        <table
          className="my-5 mx-auto w-full"
          style={{ maxWidth: "850px", width: "95%" }}>
          <thead className="my-5">
            <tr
              className=" py-5 bg-gray-300 border-b-2 px-3 border-b-black"
              style={{ height: "65px" }}>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr
              className="items-center border-b-2 px-3 border-gray-500"
              style={{ height: "110px" }}>
              {manageProducts.length > 0 ? (
                manageProducts?.map((product) => (
                  <ManageSingleItem
                    key={product._id}
                    singleProduct={product}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <td colSpan={5}>
                  <h2 className="text-center text-2xl">No items found</h2>
                </td>
              )}
            </tr>
          </tbody>
        </table>
        <div
          className="flex justify-between w-full mx-auto my-8"
          style={{ maxWidth: "400px" }}>
          <div>
            {[...Array(totalPages)].map((page, index) => (
              <button
                className="pagination py-1 px-4 border-2 border-gray-500 mx-2 rounded-md"
                key={index}
                onClick={() => {
                  setPageCount(index);
                  setLoading(true);
                }}
                disabled={pageCount === index}>
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
            className="border-2 py-1 px-2">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;
