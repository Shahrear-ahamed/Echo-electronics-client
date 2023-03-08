import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ManageSingleItem from "../ManageSingleItem/ManageSingleItem";
import Loading from "../Shared/Loading/Loading";
import { getToken } from "../../utils/token";

const Myitems = ({ authUser }) => {
  const { user, isLoading } = authUser;
  const token = getToken();
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [ProductCount, setProductCount] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // find data from database
  useEffect(() => {
    const url = `inventory/products?email=${user?.email}&items=${ProductCount}&page=${pageCount}`;

    axios(url).then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setMyItems(response?.data.products);
        setTotalPages(response?.data.pages);
      }
    });
  }, [ProductCount, pageCount, user, isDeleted]);

  // delete items
  const handleDelete = (id) => {
    const url = `inventory/products/${id}`;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(url, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            if (response.data?.result?.deletedCount === 1) {
              setIsDeleted(!isDeleted);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            }
          });
      }
    });
  };

  return isLoading || loading ? (
    <Loading />
  ) : (
    <section>
      <div className="container mx-auto">
        <div className="my-2 md:my-5 text-center">
          <h2
            className="text-3xl md:text-4xl font-semibold py-2 md:py-4"
            style={{ color: "#6ead4e" }}>
            My Items
          </h2>
        </div>
        <table
          className="my-5 mx-auto w-full"
          style={{ maxWidth: "850px", width: "95%" }}>
          <thead className="my-5">
            <tr
              className="py-5 bg-gray-300 border-b-2 px-3 border-b-black"
              style={{ height: "65px" }}>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {myItems.map((product) => (
              <ManageSingleItem
                key={product._id}
                handleDelete={handleDelete}
                singleProduct={product}
              />
            ))}
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
            name="productCount"
            id="productCount"
            defaultValue={ProductCount}
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

export default Myitems;
