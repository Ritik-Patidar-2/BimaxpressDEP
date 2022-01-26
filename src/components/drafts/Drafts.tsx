import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import scrollbar from '../../scrollbar.module.css';

import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';

import TableSearch from '../theme/table/tableSearchInput/TableSearchInput';
import TableSearchButton from '../theme/table/tableSearchButton/TableSearchButton';
import ReactTable from '../theme/reactTable/ReactTable';
import NewCaseSelect from '../theme/select/newCaseSelect/NewCaseSelect';
import TableCheckbox from '../theme/table/tableCheckbox/TableCheckbox';

import download from '../../assets/icon/eye.svg';
import filter from '../../assets/icon/filter.svg';

// import { Link } from "react-router-dom";

import { RiDeleteBin6Line } from 'react-icons/ri';

import { setLoading } from '../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import { setCaseData } from '../../redux/slices/homeSlice';
import notification from '../theme/utility/notification';
import SummeryModal from './Summary/SummeryModal';
import NewAction from './newAction/NewAction';
import SentMail from './sentMail/SentMail';
import ApproveModal from './approveModal/ApproveModal';
import EnchanceAndFciModal from './enhanceAndFci/EnchanceAndFci';

const insuranceCompany = [
  { label: 'Health India Insurance', value: 'health_india_insurance' },
  { label: 'Reliance General Insurance', value: 'reliance_general_nsurance' },
  { label: 'Futura General Insurance', value: 'futura_general_insurance' },
  { label: 'Medsave Health Insurance', value: 'medsave_health_insurance' },
  {
    label: 'Bajaj Allianz Life Insurance',
    value: 'bajaj_allianz_life_insurance',
  },
];

const dateRange = [
  { label: 'Last day', value: 'last_day' },
  { label: 'Last 15 days', value: 'last_15_days' },
  { label: 'Last month', value: 'last_month' },
  { label: 'Last quarter', value: 'last_quarter' },
  { label: 'Last year', value: 'last_year' },
];

interface ColumnDetails {
  [key: string]: any;
}

const Drafts = () => {
  const [tableRow, setTableRow] = useState<ColumnDetails[]>([]);
  const param = useParams();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { caseData } = useAppSelector((state) => state?.home);
  const navigate = useNavigate();
  const [summeryData, setSummeryData] = useState({});
  const [action, setAction] = useState('');

  const [openSummeryModal, setOpenSummeryModal] = useState<boolean>(false);
  const toggleSummeryModal = () => {
    setOpenSummeryModal((pre) => !pre);
  };
  const [openNewActionModal, setOpenNewActionModal] = useState<boolean>(false);
  const toggleNewActionModal = () => {
    setOpenNewActionModal((pre) => !pre);
  };
  const [openSentmailModal, setOpenSentmailModal] = useState<boolean>(false);
  const toggleSentmailModal = () => {
    setOpenSentmailModal((pre) => !pre);
  };
  const [openApproveModal, setOpenApproveModal] = useState<boolean>(false);
  const toggleApproveModal = () => {
    setOpenApproveModal((pre) => !pre);
  };
  const [openEnhanceAndFciModal, setOpenEnhanceAndFciModal] =
    useState<boolean>(false);
  const toggleEnhanceAndFciModal = () => {
    setOpenEnhanceAndFciModal((pre) => !pre);
  };

  const fetchAnalyst = async () => {
    dispatch(setLoading(true));
    const URL = `/${param?.case}?email=${user}`;
    try {
      const { data } = await axiosConfig.get(URL);
      dispatch(setLoading(false));
      dispatch(setCaseData(data?.data));
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  useEffect(() => {
    fetchAnalyst();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDetails = (value: string) => {
    if (param?.case === 'draftcases') {
      navigate(`/newCase/${value}`);
    } else {
      //@ts-ignore
      const obj = caseData[value] || {};
      console.log(obj);
      setSummeryData(obj);
      toggleSummeryModal();
    }
  };

  useEffect(() => {
    if (action === 'query') {
      toggleSentmailModal();
    }
    if (
      action === 'Approved' ||
      action === 'Reject' ||
      action === 'Discharge_Approved'
    ) {
      toggleApproveModal();
    }
    if (action === 'Enhance' || action === 'fci') {
      toggleEnhanceAndFciModal();
    }
  }, [action]);

  useEffect(() => {
    const res = Object.entries(caseData)?.map(
      (
        //@ts-ignore
        [
          key,
          {
            patient_details: { Name, Phone, Policy_Id },
            Tpa_Company,
            hospital_details: { total, Date_of_Admission },
          },
        ]
      ) => ({
        name: Name,
        phone: Phone,
        claimNumber: Policy_Id,
        admissionDate: Date_of_Admission,
        claimAmount: total,
        insuranceTPA: Tpa_Company,
        action: (
          <img
            src={download}
            alt='icon'
            onClick={() => showDetails(key)}
            className='cursor-pointer'
          />
        ),
      })
    );
    setTableRow(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseData]);

  const data = React.useMemo<ColumnDetails[]>(() => tableRow, [tableRow]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Claim number',
        accessor: 'claimNumber',
      },
      {
        Header: 'Admission date',
        accessor: 'admissionDate',
      },
      {
        Header: 'Claim amount',
        accessor: 'claimAmount',
      },
      {
        Header: 'Insurance TPA',
        accessor: 'insuranceTPA',
      },

      {
        Header: 'Action',
        accessor: 'action',
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
    // @ts-ignore
    // selectedFlatRows,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <TableCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),

          Cell: ({ row }) => (
            <div>
              {/* @ts-ignore */}
              <TableCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const [options, setOptions] = useState({
    insuranceTPA: '',
    dateRange: '',
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
    <div
      className={`py-6 px-10 w-auto flex flex-col overflow-x-scroll ${scrollbar.scrollBarDesign}`}
    >
      <div className='flex items-center justify-between flex-wrap'>
        <div className='flex items-center mt-6'>
          <div className='mr-4 '>
            <TableSearch
              value={inputValue}
              handleChange={(val: React.SetStateAction<string>) =>
                setInputValue(val)
              }
              placeholder='Search for Name, claim number'
            />
          </div>
          <div className=' '>
            <TableSearchButton
              handleClick={() => setGlobalFilter(inputValue)}
            />
          </div>
        </div>

        <div className='flex items-center justify-between mt-6'>
          <div className='flex items-center'>
            <div className='mr-2'>
              <img src={filter} alt='icon' />
            </div>
            <div className='mr-2'>
              <NewCaseSelect
                options={insuranceCompany}
                name='insuranceTPA'
                handleChange={handleChange}
                defaultOption='Insurance TPA'
                value={options?.insuranceTPA || ''}
                style={{
                  minWidth: '170px',
                  height: '30px',
                  backgroundColor: '#FFFFFF17',
                  padding: '0px 5px',
                  borderRadius: '3px',
                  fontSize: '12px',
                }}
              />
            </div>
            <div className='mr-12'>
              <NewCaseSelect
                options={dateRange}
                name='dateRange'
                handleChange={handleChange}
                defaultOption='Status'
                value={options?.dateRange || ''}
                style={{
                  minWidth: '125px',
                  height: '30px',
                  backgroundColor: '#FFFFFF17',
                  padding: '0px 5px',
                  borderRadius: '3px',
                  fontSize: '12px',
                }}
              />
            </div>
          </div>
          <div className='flex items-center text-xs text-fontColor'>
            <RiDeleteBin6Line className='text-fontColor text-lg mr-2 ' />
            Delete
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

      <SummeryModal
        summeryData={summeryData}
        closeModal={toggleSummeryModal}
        isOpen={openSummeryModal}
        toggleNewActionModal={toggleNewActionModal}
      />

      <NewAction
        closeModal={toggleNewActionModal}
        isOpen={openNewActionModal}
        selectValue={action}
        setSelectValue={setAction}
        toggleSummeryModal={toggleSummeryModal}
        newCaseData={summeryData}
        action={action}
      />

      <SentMail
        newCaseData={summeryData}
        closeModal={toggleSentmailModal}
        isOpen={openSentmailModal}
        action={action}
      />

      <ApproveModal
        closeModal={toggleApproveModal}
        isOpen={openApproveModal}
        newCaseData={summeryData}
        action={action}
      />
      <EnchanceAndFciModal
        closeModal={toggleEnhanceAndFciModal}
        isOpen={openEnhanceAndFciModal}
        newCaseData={summeryData}
        action={action}
      />
    </div>
  );
};

export default Drafts;
