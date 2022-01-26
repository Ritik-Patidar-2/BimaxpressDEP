import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import TableSearch from "../../theme/table/tableSearchInput/TableSearchInput";
import TableSearchButton from "../../theme/table/tableSearchButton/TableSearchButton";
// import { Link } from "react-router-dom";
import ReactTable from "../../theme/reactTable/ReactTable";
import external_link from "../../../assets/icon/external_link.svg";
import filter from "../../../assets/icon/filter.svg";
import NewCaseSelect from "../../theme/select/newCaseSelect/NewCaseSelect";
import InputDate from "../../theme/inputDate/InputDate";
import scrollbar from "../../../scrollbar.module.css";

const insuranceCompany = [
  { label: "Health India Insurance", value: "health_india_insurance" },
  { label: "Reliance General Insurance", value: "reliance_general_nsurance" },
  { label: "Futura General Insurance", value: "futura_general_insurance" },
  { label: "Medsave Health Insurance", value: "medsave_health_insurance" },
  {
    label: "Bajaj Allianz Life Insurance",
    value: "bajaj_allianz_life_insurance",
  },
];

const statusList = [
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

interface ColumnDetails {
  [key: string]: any;
}

const TrackOrder = () => {
  const [inputValue, setInputValue] = useState("");
  const data = React.useMemo<ColumnDetails[]>(
    () => [
      {
        orderId: "TFS4556dD",
        patientName: "Pranav vikram",
        deliveryAddress:
          "Akshya Nagar, Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        OrderedDate: "20 Nov 2021",
        status: "Active",
        registeredNumber: "AH2021",
        insuranceTPA: "Health India Insurance",
        track: <img src={external_link} alt="icon" />,
      },
      {
        orderId: "TFS47556dD",
        patientName: "Chandar sekar",
        deliveryAddress:
          "Akshya Nagar, Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        OrderedDate: "20 Oct 2021",
        status: "Active",
        registeredNumber: "AH25021",
        insuranceTPA: "Reliance General Insurance",
        track: <img src={external_link} alt="icon" />,
      },
      {
        orderId: "T4556dD",
        patientName: "Sai shree",
        deliveryAddress:
          "Akshya Nagar, Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        OrderedDate: "20 Nov 2021",
        status: "Pending",
        registeredNumber: "AH20521",
        insuranceTPA: "Futura Generali Insurance",
        track: <img src={external_link} alt="icon" />,
      },
      {
        orderId: "RFS56dD",
        patientName: "Rupa rajesh",
        deliveryAddress:
          "Akshya Nagar, Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        OrderedDate: "20 Nov 2021",
        status: "Active",
        registeredNumber: "AH26721",
        insuranceTPA: "Medsave Health Insurance",
        track: <img src={external_link} alt="icon" />,
      },
      {
        orderId: "TFS4556dD",
        patientName: "vikram",
        deliveryAddress:
          "Akshya Nagar, Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        OrderedDate: "20 Nov 2021",
        status: "Active",
        registeredNumber: "AH92021",
        insuranceTPA: "Bajaj Allianz Life Insurance",
        track: <img src={external_link} alt="icon" />,
      },
      {
        orderId: "TDS4556dD",
        patientName: "Kumar",
        deliveryAddress:
          "Akshya Nagar, Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        OrderedDate: "10 May 2021",
        status: "Active",
        registeredNumber: "AH2021",
        insuranceTPA: "Bajaj Allianz Life Insurance",
        track: <img src={external_link} alt="icon" />,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "orderId", // accessor is the "key" in the data
      },
      {
        Header: "Patient name",
        accessor: "patientName",
      },
      {
        Header: "Delivery Address",
        accessor: "deliveryAddress",
      },
      {
        Header: "Ordered date",
        accessor: "OrderedDate",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Insurance TPA",
        accessor: "insuranceTPA",
      },
      {
        Header: "Track",
        accessor: "track",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //@ts-ignore
    page,
    prepareRow,
    //@ts-ignore
    setGlobalFilter,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    setPageSize,
  } = useTable({ columns, data }, useGlobalFilter, usePagination);

  const [options, setOptions] = useState({
    insuranceTPA: "",
    status: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLDataElement | any
    >
  ) => {
    const { name, value } = e.target;
    setOptions((pre: any) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize]);

  return (
    <div className={`py-6 px-10 w-full flex flex-col overflow-x-scroll ${scrollbar.scrollBarDesign}`}>
      <p className="text-base text-fontColor-gray ">
        Find details about doctor and can update details
      </p>
      <div className={`flex items-center justify-between  flex-wrap `}>
        <div className="flex items-center mt-6">
          <div className="mr-4 ">
            <TableSearch
              value={inputValue}
              handleChange={(val: React.SetStateAction<string>) =>
                setInputValue(val)
              }
              placeholder="Search for Name, claim number"
            />
          </div>
          <div className=" ">
            <TableSearchButton
              handleClick={() => setGlobalFilter(inputValue)}
            />
          </div>
        </div>

        <div className="flex items-center mt-6">
          <div className="mr-2">
            <img src={filter} alt="icon" />
          </div>
          <div className="mr-2">
            <NewCaseSelect
              options={insuranceCompany}
              name="insuranceTPA"
              handleChange={handleChange}
              defaultOption="Insurance TPA"
              value={options?.insuranceTPA || ""}
              style={{
                maxWidth: "170px",
                height: "30px",
                backgroundColor: "#FFFFFF17",
                padding: "0px",
                borderRadius: "3px",
                fontSize: "12px",
              }}
            />
          </div>
          <div className="mr-2">
            <NewCaseSelect
              options={statusList}
              name="status"
              handleChange={handleChange}
              defaultOption="Status"
              value={options?.status || ""}
              style={{
                maxWidth: "125px",
                height: "30px",
                backgroundColor: "#FFFFFF17",
                padding: "0px",
                borderRadius: "3px",
                fontSize: "12px",
              }}
            />
          </div>
          <div>
            <InputDate
              name={options?.date}
              handleChange={handleChange}
              style={{
                height: "30px",
                backgroundColor: "#FFFFFF17",
                borderRadius: "3px",
                maxWidth: "125px",
                fontSize: "12px",
              }}
            />
          </div>
        </div>
      </div>
      <ReactTable
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        page={page}
        prepareRow={prepareRow}
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
      />
    </div>
  );
};

export default TrackOrder;
