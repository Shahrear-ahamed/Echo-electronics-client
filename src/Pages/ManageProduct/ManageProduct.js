import axios from "axios";
import React, { useEffect, useState } from "react";
import ManageSingleItem from "../ManageSingleItem/ManageSingleItem";
import swal from "sweetalert";

const ManageProduct = () => {
  const [manageProducts, setManageProducts] = useState([]);

  useEffect(() => {
    const url = "http://localhost:5000/manageinventory";
    axios(url).then((response) => setManageProducts(response.data));
  }, []);

  // delete item
  const handleDelete = (id) => {
    const url = `http://localhost:5000/manageinventory/${id}`;
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
    <div>
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
      </div>
    </div>
  );
};

export default ManageProduct;
