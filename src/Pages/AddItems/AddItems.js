import "./AddItems.css";
import axios from "../../utils/axios";
import React from "react";
import { toast } from "react-toastify";
import { getToken } from "../../utils/token";

const AddItems = ({ user }) => {
  const { id, email, name } = user;
  const authToken = getToken();

  // onsubmit section are here
  const handleAddItems = (e) => {
    e.preventDefault();

    // get property value
    const product = e.target.productName.value;
    const image = e.target.imgUrl.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    const description = e.target.description.value;
    const sold = 0;
    const itemObj = {
      sold,
      image,
      price,
      product,
      quantity,
      owner: id,
      description,
      supplierMail: email,
    };

    if (product && image && price && quantity && description) {
      axios
        .post("/inventory/products", itemObj, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success("Product Add successfully");
            e.target.reset();
          }
        })
        .catch((err) => console.log(err.response));
    } else {
      toast.error("Please fill all the fields");
    }
  };

  // add items design section
  return (
    <div className="pb-10 grid items-center">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl my-4 font-bold">
          Add your product
        </h2>
        <div className="bar mb-4"></div>
        <form
          onSubmit={handleAddItems}
          className="add-items mx-auto mt-4 text-black">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-7">
            {" "}
            <div>
              <p>
                <label htmlFor="name">Supplier Name</label>
              </p>
              <input
                className="w-full py-2 px-3 mt-1.5 rounded outline-none addItems-input"
                type="text"
                name="name"
                id="name"
                value={name}
                readOnly
              />
            </div>
            <div>
              <p>
                <label htmlFor="email">Supplier Mail</label>
              </p>
              <input
                className="w-full py-2 px-3 mt-1.5 rounded outline-none addItems-input"
                type="email"
                name="email"
                id="email"
                value={email}
                readOnly
              />
            </div>
            <div>
              <p>
                <label htmlFor="productName">Product Name</label>
              </p>
              <input
                className="w-full py-2 px-3 mt-1.5 rounded outline-none addItems-input"
                type="text"
                name="productName"
                id="productName"
                placeholder="product name"
              />
            </div>
            <div>
              <p>
                <label htmlFor="imgUrl">Image url</label>
              </p>
              <input
                className="w-full py-2 px-3 mt-1.5 rounded outline-none addItems-input"
                type="text"
                name="imgUrl"
                id="imgUrl"
                placeholder="https:// "
              />
            </div>
            <div>
              <p>
                <label htmlFor="price">Product Price</label>
              </p>
              <input
                className="w-full py-2 px-3 mt-1.5 rounded outline-none addItems-input"
                type="number"
                name="price"
                id="price"
                placeholder="product price"
              />
            </div>
            <div>
              <p>
                <label htmlFor="quantity">Quantity</label>
              </p>
              <input
                className="w-full py-2 px-3 mt-1.5 rounded outline-none addItems-input"
                type="number"
                name="quantity"
                id="quantity"
                placeholder="Quantity"
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="description">Product Description</label>
            <textarea
              className="text-message w-full py-2 px-3 mt-1.5 rounded outline-none addItems-input"
              placeholder="Product Description"
              name="description"
              id="description"
              cols="80"
              rows="8"></textarea>
          </div>
          <input
            className="theme-color mx-auto mt-4 px-5 py-2 text-white rounded-md cursor-pointer"
            type="submit"
            value="Add new item"
          />
        </form>
      </div>
    </div>
  );
};

export default AddItems;
