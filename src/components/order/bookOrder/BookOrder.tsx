import React, { useState } from "react";
import warning from "../../../assets/icon/warning.svg";
import print from "../../../assets/icon/print.svg";
import download from "../../../assets/icon/download.svg";
import Input from "../../theme/input/Input";
import InputDate from "../../theme/inputDate/InputDate";

const bookOrder = [
  {
    id: 1,
    patientName: "Rejesh Kumar",
    deliveryAddress:
      "Akshya Nagar, Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    insuranceTPA: "Reliance General Insurance",
  },
  {
    id: 1,
    patientName: "Rejesh Kumar",
    deliveryAddress:
      "Akshya Nagar, Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    insuranceTPA: "Reliance General Insurance",
  },
  {
    id: 1,
    patientName: "Rejesh Kumar",
    deliveryAddress:
      "Akshya Nagar, Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    insuranceTPA: "Reliance General Insurance",
  },
  {
    id: 1,
    patientName: "Rejesh Kumar",
    deliveryAddress:
      "Akshya Nagar, Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    insuranceTPA: "Reliance General Insurance",
  },
];

const BookOrder = () => {
  const [orders, setOrders] = useState({ weight: "", price: "", date: "" });

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLDataElement | HTMLSelectElement
        >
      | any
  ) => {
    const { name, value } = e?.target;
    setOrders((pre) => ({ ...pre, [name]: value }));
  };
  return (
    <div className="mt-4 flex flex-col lg:grid grid-cols-12 gap-4">
      <div className="col-span-9 flex flex-col">
        {bookOrder?.map((order, index) => {
          return (
            <div
              key={index}
              className="p-4 md:grid flex flex-col md:grid-cols-5 gap-4 w-full  bg-opacity-40 rounded mb-8 bg-secondary-light"
              style={{ minHeight: "230px" }}
            >
              <div className="col-span-2">
                <div>
                  <p className="text-xs text-fontColor-darkGray">
                    Patient name
                  </p>
                  <p className="text-sm text-fontColor mt-2">
                    {order?.patientName}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-xs text-fontColor-darkGray">
                    Delivery Address
                  </p>
                  <p className="text-sm text-fontColor mt-2">
                    {order?.deliveryAddress}
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <div>
                  <p className="text-xs text-fontColor-darkGray">
                    Insurance TPA
                  </p>
                  <p className="text-sm text-fontColor mt-2">
                    {order?.insuranceTPA}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-xs text-fontColor-darkGray">Weight</p>
                  <div className="mt-2 flex items-center">
                    <Input
                      handleChange={handleChange}
                      name={orders?.weight}
                      value={orders?.weight}
                      type="number"
                      style={{
                        maxWidth: "70px",
                        border: "none",
                        outline: "none",
                        height: "30px",
                        backgroundColor: "#FFFFFF17",
                        fontSize: "14px",
                        padding: " 4px 10px",
                        borderRadius: "2px",
                      }}
                    />
                    <p className="ml-2 text-sm text-fontColor">Kg</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 sm:mt-12">
                  <div className="flex items-center mr-8">
                    <img src={download} alt="icon" className="mr-2" />
                    <p className="text-xs text-fontColor">Download</p>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0 mr-8">
                    <img src={print} alt="icon" className="mr-2" />
                    <p className="text-xs text-fontColor">Print</p>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <InputDate
                  name={orders?.date}
                  handleChange={handleChange}
                  style={{
                    height: "30px",
                    backgroundColor: "#FFFFFF17",
                    borderRadius: "2px",
                  }}
                />

                <div className="mt-10">
                  <p className="text-xs text-fontColor-darkGray">Price</p>
                  <div className="mt-2 flex items-center">
                    <Input
                      handleChange={handleChange}
                      name={orders?.price}
                      value={orders?.price}
                      type="number"
                      style={{
                        maxWidth: "70px",
                        border: "none",
                        outline: "none",
                        minHeight: "30px",
                        backgroundColor: "#FFFFFF17",
                        fontSize: "14px",
                        padding: " 4px 10px",
                        borderRadius: "2px",
                      }}
                    />
                    <p className="ml-2 text-sm text-fontColor">/-</p>
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    className="border border-fontColor rounded-sm outline-none h-auto w-full bg-secondary-dark text-base text-fontColor"
                    style={{ minHeight: "3rem" }}
                  >
                    Book order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-span-3 flex flex-col">
        <div className="flex items-center">
          <p className="text-xs text-fontColor-darkGray border-b border-fontColor-darkGray mr-2">
            Disclaimer
          </p>
          <img src={warning} alt="warning" />
        </div>
        <p className="text-sm text-fontColor pt-2">
          If the weight vary in any case then the price will vary too
        </p>

        <p className="text-sm text-fontColor pt-4">
          Charges may apply if you cancel order after the courier is despatched.
        </p>
      </div>
    </div>
  );
};

export default BookOrder;
