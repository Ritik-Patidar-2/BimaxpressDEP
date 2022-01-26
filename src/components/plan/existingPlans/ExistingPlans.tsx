import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import SinglePlan from "../../theme/plan/SinglePlan";
import styles from "./ExistingPlan.module.css";
import axiosConfig from "../../../config/axiosConfig";
import { setAllPlans } from "../../../redux/slices/planSlice";
import scrollbar from '../../../scrollbar.module.css';

type ExistingPlansProps = {
  setRender: Dispatch<SetStateAction<string>>;
};

const ExistingPlans = ({ setRender }: ExistingPlansProps) => {
  const [planDetails, setPlanDetails] = useState<{}[]>([]);
  const dispatch = useAppDispatch();
  const { allPlans, currentPlan } = useAppSelector((state) => state?.plan);

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    const URL = `/allplansdetails`;
    try {
      const { data } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setAllPlans(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }
  };

  useEffect(() => {
    if (!Object.entries(allPlans)?.length) {
      fetchAnalyst();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (Object.entries(allPlans)?.length) {
      const res = Object.entries(allPlans)?.map(
        (
          //@ts-ignore
          [key, { endDate, duration, price }]
        ) => ({
          endDate,
          duration,
          price,
          name: key,
        })
      );
      setPlanDetails(res);
    }
  }, [allPlans]);
  return (
    <div className="flex flex-col py-5 px-8">
      <h2 className="text-3xl font-semibold  text-fontColor">
        Renew or Add up to Existing plans
      </h2>
      <div className="mt-2">
        <h4 className="text-xl font-semibold text-fontColor">
          Current plan : {/* @ts-ignore */}
          <span className="text-lg font-normal  text-fontColor capitalize">
            {/* @ts-ignore */}
            {currentPlan?.planId}
          </span>
        </h4>
      </div>

      <div
        className={`py-8 mb-12 flex items-center overflow-x-scroll ${scrollbar.scrollBarDesign} overflow-y-hidden ${styles.plansContainer}`}
      >
        {planDetails?.map((plan, index) => {
          //@ts-ignore
          const { endDate, duration, price, name } = plan;
          return (
            <div key={index} className="mr-6">
              <SinglePlan
                endDate={endDate}
                duration={duration}
                price={price}
                name={name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExistingPlans;
