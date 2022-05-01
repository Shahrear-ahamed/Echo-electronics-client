import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleItem from "../SingleItem/SingleItem";

const ItemsSection = () => {
  const [homeItems, setHomeItems] = useState([]);
  useEffect(() => {
    axios("http://localhost:5000/homeitems?limit=6").then((res) =>
      setHomeItems(res.data)
    );
  }, []);
  return (
    <div className="container mx-auto my-4 px-5 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-4">
      {homeItems.map((product) => (
        <SingleItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ItemsSection;
