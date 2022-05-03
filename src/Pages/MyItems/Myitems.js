import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import ManageSingleItem from "../ManageSingleItem/ManageSingleItem";

const Myitems = () => {
  const [user] = useAuthState(auth);
  const [myItmes, setMyItems] = useState([]);
  const { email } = user;

  // find data from database
  useEffect(() => {
    const url = `http://localhost:5000/inventory?email=${email}`;
    axios(url).then((response) => {
      setMyItems(response.data);
    });
  }, [email]);

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
      </div>
    </section>
  );
};

export default Myitems;
