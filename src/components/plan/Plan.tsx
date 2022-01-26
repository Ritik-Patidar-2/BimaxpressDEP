import React, { useState } from "react";
import OverView from "./overView/OverView";
import ManagePlan from "./managePlan/ManagePlan";
import ExistingPlans from "./existingPlans/ExistingPlans";
import UpgradePlan from "./upgradePlan/UpgradePlan";

const Plan = () => {
  const [render, setRender] = useState("");
  const [currentPlan, setCurrentPlan] = useState("standard");

  const renderUI = () => {
    switch (render) {
      case "addOn":
        return <ExistingPlans setRender={setRender} />;
      case "subscription":
        return (
          <UpgradePlan
            setCurrentPlan={setCurrentPlan}
            currentPlan={currentPlan}
          />
        );

      default:
        break;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-8 pt-5 pb-8 px-2 sm:px-8 border-b border-fontColor-darkGray">
        <div className="col-span-12 xl:col-span-9">
          <OverView />
        </div>
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <ManagePlan setRender={setRender} />
        </div>
      </div>
      <div>{renderUI()}</div>
    </div>
  );
};

export default Plan;
