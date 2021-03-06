import React from "react";
import styles from "./Select.module.css";

type SelectProps = {
  options: { label: string; value: string }[];
  value: string | number;
  name: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  label?: string;
  isEdit?: boolean;
  style?: object;
};

const Select = ({
  options,
  handleChange,
  name,
  value,
  type = "text",
  label = "",
  isEdit = true,
  style = {},
}: SelectProps) => {
  if (!isEdit) {
    return (
      <>
        {label ? (
          <p className="pb-4 text-sm text-fontColor-light">{label}</p>
        ) : null}
        <p className=" border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light">
          {options?.find((option) => option?.value === value)?.label}
        </p>
      </>
    );
  }

  return (
    <>
      {label ? (
        <p className="pb-4 text-sm text-fontColor-light">{label}</p>
      ) : null}
      <select
        value={value}
        name={name}
        onChange={(e) => handleChange(e)}
        className={styles.select}
        style={style}
      >
        {options?.map((option, index) => {
          return (
            <option value={option?.value} key={index}>
              {option?.label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
