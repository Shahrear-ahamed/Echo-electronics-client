import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import swal from "sweetalert";
import auth from "../../firebase.init";
import ManageSingleItem from "../ManageSingleItem/ManageSingleItem";
import Loading from "../Shared/Loading/Loading";

const Myitems = () => {
  const [user] = useAuthState(auth);
  const { email } = user;
  const [myItmes, setMyItems] = useState([]);
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

  // get page count from databse for pagination
  useEffect(() => {
    const url = `https://echo-electronics.herokuapp.com/userstoredata?email=${email}`;
    axios(url).then((res) => {
      setTotalProductCount(res.data.result);
    });
  }, [email]);

  // find data from database
  useEffect(() => {
    const url = `https://echo-electronics.herokuapp.com/singleuser?email=${email}&&items=${ProductCount}&&page=${pageCount}`;
    const verifyToken = async () => {
      try {
        const token = await axios.get(url, {
          headers: {
            authorization: `${email} ${localStorage.getItem("access_token")}`,
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
  }, [ProductCount, pageCount, email, isDeleted]);

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
            {myItmes.map((product) => (
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
            name="productCount"
            id="productCount"
            defaultValue={ProductCount}
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
