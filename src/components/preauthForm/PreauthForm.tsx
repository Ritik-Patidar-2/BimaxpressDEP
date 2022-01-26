import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axiosConfig from "../../config/axiosConfig";
import notification from "../theme/utility/notification";
import { setLoading } from "../../redux/slices/utilitySlice";
import HtmlParser from "react-html-parser";

const PreauthForm = () => {
  const [data, setData] = useState<any>("");
  const { user } = useAppSelector((state) => state?.user);
  // const { newCaseNum } = useAppSelector((state) => state?.case);
  const dispatch = useAppDispatch();

  const getPreauthForm = async () => {
    dispatch(setLoading(true));
    const URL = `/preauthform?email=${user}&casenumber=case6`;
    try {
      const { data } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      setData(data);
      // const elem = document.getElementById('printable');
      // //@ts-ignore
      // elem.innerHTML = data;
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
      console.log(error);
    }
  };

  const printForm = () => {
    window.print();
  };

  useEffect(() => {
    getPreauthForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="printable"
      style={{ textAlign: "center", marginTop: "10px" }}
    >
      <button
        onClick={printForm}
        style={{
          textTransform: "uppercase",
          backgroundColor: "#535353",
          padding: "6px 15px",
          color: "#fff",
          borderRadius: "2px",
          marginBottom: "10px",
          fontSize: "18px",
        }}
      >
        Print
      </button>
      <button
        onClick={printForm}
        style={{
          textTransform: "uppercase",
          backgroundColor: "#535353",
          padding: "6px 15px",
          color: "#fff",
          borderRadius: "2px",
          marginBottom: "10px",
          fontSize: "18px",
          marginLeft: "10px",
        }}
      >
        Back
      </button>
      <div style={{ position: "relative" }}>{HtmlParser(data)}</div>
    </div>
  );
};

export default PreauthForm;
