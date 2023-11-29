import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import "./WarehouseAgreement.css";

const WarehouseAgreement = () => {
  const handleAgreementClient = (e) => {
    e.preventDefault();
    // information
    const companyName = e.target.name.value;
    const email = e.target.email.value;
    const number = parseInt(e.target.number.value);
    const agreementYear = e.target.agreementYear.value;
    const message = e.target.message.value;

    const agreementObj = {
      companyName,
      email,
      number,
      agreementYear,
      message,
    };

    axios.post("/agreement", agreementObj).then((response) => {
      if (!response.data.result._id) {
        toast.error("Something went wrong. Please try again later!!");
      }

      toast.success("We stored your information. We will notify you soon!!");
      e.target.reset();
    });
  };

  // render agreement page
  return (
    <div className="agreement-section py-10 grid items-center text-white">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl my-4 font-bold">
          Become a partner with us{" "}
        </h2>
        <div className="bar mb-4"></div>
        <form
          onSubmit={handleAgreementClient}
          className="agreement-form mx-auto mt-4">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-7">
            {" "}
            <div>
              <p>
                <label htmlFor="name">Company Name</label>
              </p>
              <input
                className="w-full py-2 px-3 mt-1.5 rounded outline-none agreement-input data-input"
                type="text"
                name="name"
                id="name"
                placeholder="Company Name"
                required
              />
            </div>
            <div>
              <p>
                <label htmlFor="email">Contact Mail</label>
              </p>
              <input
                className="w-full py-2 px-3 mt-1.5 rounded outline-none agreement-input data-input"
                type="email"
                name="email"
                id="email"
                placeholder="Contact Email"
                required
              />
            </div>
            <div>
              <p>
                <label htmlFor="mobile">Contact Number</label>
              </p>
              <input
                className="w-full py-2 px-3 mt-1.5 rounded outline-none agreement-input data-input"
                type="number"
                name="number"
                id="mobile"
                placeholder="Contact Number"
                required
              />
            </div>
            <div>
              <p>
                <label htmlFor="agreementYear">Agreement Year</label>
              </p>
              <select
                className="w-full py-2 px-3 mt-1.5 rounded outline-none agreement-input"
                name="agreementYear"
                id="agreementYear"
                required
                defaultValue={"8 Years"}>
                <option value="5 Years">5 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="10 Years">10 Years</option>
                <option value="12 Years">12 Years</option>
              </select>
            </div>
          </div>
          <div className="">
            <label htmlFor="message">Your Message</label>
            <textarea
              className="text-message w-full py-2 px-3 mt-1.5 rounded outline-none agreement-input"
              name="message"
              id="message"
              cols="80"
              rows="8"
              required></textarea>
          </div>
          <input
            className="theme-color col-span-2 mx-auto mt-4 px-5 py-2 rounded-md cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default WarehouseAgreement;
