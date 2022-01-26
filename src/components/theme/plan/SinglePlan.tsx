import React from "react";
import planSmall from "../../../assets/icon/planSmall.svg";
import PlanSelectButton from "../button/PlanSelectButton";
import rupi from "../../../assets/icon/rupi.svg";

const SinglePlan = ({ endDate, duration, price, name }: any) => {
  return (
    <div className="h-60 w-72 border border-fontColor rounded-xl p-4 flex flex-col">
      <div className="flex items-center">
        <img src={planSmall} alt="icon" className="mr-2" />
        <p className="text-lg text-fontColor capitalize"> {name}</p>
      </div>
      <div className="mt-4 flex items-start">
        <img src={rupi} alt="rupi icon" className="w-5" />

        <span className="text-2xl text-fontColor-gray font-semibold ml-2 -mt-2">
          {price}
        </span>
      </div>
      <p className="mt-4  text-fontColor text-sm">Duration : {duration} days</p>
      <p className="mt-2 text-sm text-fontColor">Ends on : {endDate}</p>

      <div className="mt-6">
        <PlanSelectButton text="Select" />
      </div>
    </div>
  );
};

export default SinglePlan;
