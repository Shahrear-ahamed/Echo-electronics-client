import "./WarehouseAgreement.css";

const WarehouseAgreement = () => {
  return (
    <div className="agreement-section py-10 grid items-center text-white">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl my-4 font-bold">
          Become a partner with us{" "}
        </h2>
        <div className="bar mb-4"></div>
        <form className="agreement-form mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-7">
          <div>
            <p>
              <label htmlFor="name">Company Name</label>
            </p>
            <input
              className="w-full py-2 px-3 mt-1.5 rounded outline-none agreement-input"
              type="text"
              name="name"
              id="name"
              placeholder="Company Name"
            />
          </div>

          <div>
            <p>
              <label htmlFor="email">Contact Mail</label>
            </p>
            <input
              className="w-full py-2 px-3 mt-1.5 rounded outline-none agreement-input"
              type="email"
              name="email"
              id="email"
              placeholder="Contact Email"
            />
          </div>

          <div>
            <p>
              <label htmlFor="mobile">Contact Number</label>
            </p>
            <input
              className="w-full py-2 px-3 mt-1.5 rounded outline-none agreement-input"
              type="number"
              name="number"
              id="mobile"
              placeholder="Contact Number"
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
            >
              <option value="five">5 Years</option>
              <option value="eight" selected>
                8 Years
              </option>
              <option value="ten">10 Years</option>
              <option value="twelve">12 Years</option>
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="message">Your Message</label>
            <textarea
              className="text-message w-full py-2 px-3 mt-1.5 rounded outline-none agreement-input"
              name="message"
              id="message"
              cols="80"
              rows="8"
            ></textarea>
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
