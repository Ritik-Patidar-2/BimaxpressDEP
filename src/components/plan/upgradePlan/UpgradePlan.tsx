import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import standard from "../../../assets/icon/planBig.svg";
import rupi from "../../../assets/icon/rupi.svg";
import styles from "./UpgradePlan.module.css";
import PlanSelectButton from "../../theme/button/PlanSelectButton";
import axios from "axios";

type UpgradePlanProps = {
  setCurrentPlan: Dispatch<SetStateAction<string>>;
  currentPlan: string;
};

const UpgradePlan = ({ setCurrentPlan, currentPlan }: UpgradePlanProps) => {
  const [plans, setPlans] = useState<any[]>([])
  useEffect(() => {
    axios.get(`/allplansdetails`).then(res => {
      console.log(res.data?.data);
      setPlans(res.data?.data)
    }).catch(err => {
      console.log(err)
    })
  })
  return (
    <div className="px-8 py-6">
      <h2 className="text-3xl text-fontColor font-semibold">
        Upgrade your plan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 pt-8">
        {plans && plans?.map((plan, index) => {
          return (
            <div
              className={`w-full ml-auto mr-auto max-h-6 border border-fontColor rounded-2xl px-4 py-6 mb-6 flex flex-col ${styles.container}`}
              key={index}
            >
              <img
                src={standard}
                alt="icon"
                className={`w-8 text-fontColor ${styles.svg}`}
              />
              <p className="font-light text-xl pt-4 text-fontColor capitalize">
                {plan?.name}
              </p>
              <div className="flex items-center pt-6">
                <img src={rupi} alt="icon" />
                <h2 className="text-5xl text-fontColor font-semibold pl-2 -mt-3">
                  {plan?.price}
                </h2>
              </div>
              <p className="text-xs font-thin pt-8 text-fontColor">Features</p>
              <div className={`h-3 ${styles.contentBox}`}>
                {plan?.features?.map((fetures: any, index: number) => {
                  return (
                    <div className="pt-4 flex items-center" key={index}>
                      <span className={styles.boldIcon}></span>
                      <p className="text-sm text-fontColor pl-2">{fetures}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mb-4">
                <PlanSelectButton
                  text="Buy now"
                  disable={plan?.title === currentPlan}
                  style={
                    plan?.title === currentPlan
                      ? { backgroundColor: "#5a5a5a", cursor: "default" }
                      : {}
                  }
                  handleClick={() => setCurrentPlan(plan?.title)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradePlan;
