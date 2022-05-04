import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import ManageSingleItem from "../ManageSingleItem/ManageSingleItem";

const Myitems = () => {
  const [user] = useAuthState(auth);
  const [myItmes, setMyItems] = useState([]);
  const { email } = user;
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [ProductCount, setProductCount] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const totalPages = Math.ceil(totalProductCount / ProductCount);
  const [errorToast, setErrorToast] = useState("");

  useEffect(() => {
    if (!errorToast === "") {
      toast.warning(errorToast);
    }
  }, [errorToast]);

  // find data from database
  useEffect(() => {
    const url = `http://localhost:5000/inventory?email=${email}&&items=${ProductCount}&&page=${pageCount}`;
    const verifyToken = async () => {
      try {
        const token = await axios.get(url, {
          headers: {
            authorization: `${email} ${localStorage.getItem("access_token")}`,
          },
        });
        setTotalProductCount(token.data.length);
        setMyItems(token.data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          setErrorToast(error.response.data.message);
        }
      }
    };
    verifyToken();
  }, [ProductCount, pageCount, email]);

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
            {myItmes.map((product) => (
              <ManageSingleItem key={product._id} product={product} />
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
      </div>
    </section>
  );
};

export default Myitems;
