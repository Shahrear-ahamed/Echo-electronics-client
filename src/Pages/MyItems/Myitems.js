import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import auth from "../../firebase.init";
import ManageSingleItem from "../ManageSingleItem/ManageSingleItem";
import Loading from "../Shared/Loading/Loading";

const Myitems = ({ authUser }) => {
  const { user, isLoading } = authUser;
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [errorToast, setErrorToast] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [ProductCount, setProductCount] = useState(10);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const totalPages = Math.ceil(totalProductCount / ProductCount);

  useEffect(() => {
    if (errorToast) {
      toast.warning(errorToast);
    }
  }, [errorToast]);

  // get page count from database for pagination
  useEffect(() => {
    axios(`/inventory/myProduct?email=${user?.email}`).then((res) => {
      setTotalProductCount(res.data.result);
    });
  }, [user?.email]);

  // find data from database
  useEffect(() => {
    const url = `https://echo-electronics.herokuapp.com/singleuser?email=${user?.email}&&items=${ProductCount}&&page=${pageCount}`;
    const verifyToken = async () => {
      try {
        const token = await axios.get(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setLoading(false);
        if (token.data.length === 0) {
          setPageCount(pageCount - 1);
          setMyItems(token.data);
          setLoading(false);
        } else {
          setMyItems(token.data);
          setLoading(false);
        }
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          setErrorToast(error.response.data.message);
        }
      }
    };
    verifyToken();
  }, [ProductCount, pageCount, user, isDeleted]);

  // delete items
  const handleDelete = (id) => {
    const url = `https://echo-electronics.herokuapp.com/inventory/${id}`;
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

  return isLoading ? (
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
                product={product}
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
