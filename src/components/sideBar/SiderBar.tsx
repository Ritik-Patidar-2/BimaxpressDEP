import React, { useEffect, useState } from 'react';
import {
  AiFillHome,
  AiOutlineMail,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { BiDetail } from 'react-icons/bi';
// import { RiSpamLine, RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
// import { IoDocumentOutline } from "react-icons/io5";
import { FaHospital, FaStethoscope, FaRegBuilding } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { MdOutlineInbox } from 'react-icons/md';
import { SiSimpleanalytics } from 'react-icons/si';
import logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentMenu } from '../../redux/slices/homeSlice';
import { setCurrentMailList } from '../../redux/slices/mailSlice';
import menuIcon from '../../assets/icon/menu_black.svg';
import { setCollapseState } from '../../redux/slices/leftBarSlice';
import axiosConfig from '../../config/axiosConfig';

const homeMenu = {
  name: 'Home',

  icon: <AiFillHome className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '/',
};
const emailMenu = {
  name: 'Mail',
  icon: <AiOutlineMail className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '/mail',
};

const inboxMail = {
  name: 'Inbox',
  amount: 200,
  icon: <MdOutlineInbox className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '#',
};
const sentMail = {
  name: 'Sent',
  amount: 120,
  icon: <FiSend className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,
  pageLink: '#',
};

const sideBarMenu = [
  {
    name: 'Add New Case',
    icon: (
      <HiOutlineViewGridAdd className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),
    pageLink: '/newCase',
  },
  // {
  //   name: 'DEP',
  //   icon: (
  //     <HiOutlineViewGridAdd className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
  //   ),

  //   pageLink: '/depHome',
  // },

  {
    name: 'Plan Details',
    icon: <BiDetail className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,

    pageLink: '/plan',
  },
  {
    name: 'Hospital',
    icon: <FaHospital className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />,

    pageLink: '/hospital',
  },
  {
    name: 'Analyst',
    icon: (
      <SiSimpleanalytics className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),

    pageLink: '/analyst',
  },
  {
    name: 'Doctor',
    icon: (
      <FaStethoscope className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),

    pageLink: '/doctor',
  },
  {
    name: 'Empanelled Companies',
    icon: (
      <FaRegBuilding className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),

    pageLink: '/empanelledCompanies',
  },
  {
    name: 'Order Details',
    icon: (
      <AiOutlineShoppingCart className='text-fontColor mr-4 ml-2 md:ml-5 text-xl' />
    ),

    pageLink: '/order',
  },
];

const SiderBar = () => {
  const [activeMenu, setActiveMenu] = useState(7);
  const [openEmailMenu, setOpenEmailMenu] = useState(false);
  const [activeMailMenu, setActiveMailMenu] = useState(3);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { inboxMailList, sentMailList } = useAppSelector(
    (state) => state?.mail
  );
  const navigate = useNavigate();

  const handleEmailMenu = (num: number, name: string, link: string) => {
    if (user) {
      setActiveMenu(num);
      setOpenEmailMenu((pre) => !pre);
      navigate(link);
    } else {
      navigate('/login');
    }
  };
  const handleActiveMenu = (num: number, name: string, link: string) => {
    dispatch(setCollapseState(!collapsed));
    if (user) {
      setActiveMenu(num);
      dispatch(setCurrentMenu(name));
      if (openEmailMenu) {
        setOpenEmailMenu(false);
      }
      navigate(link);
    } else {
      navigate('/login');
    }
  };

  useEffect(()=>{
    const fetchRole = async() =>{
      try{
          const {
            data
          } = await axiosConfig.get(`/role?email=${user}`);
    
          // userRole = data.data.Role;
          console.log(data.data.role);
        }
        catch(error){
            console.log("error",error);
        }
    }
  });

  const { collapsed } = useAppSelector((state) => state?.leftBarSlice);
  return (
    <>
      <div className='flex justify-center relative h-24 p-3 w-full bg-primary-dark'>
        <div className='w-auto h-10'>
          <img src={logo} alt='logo' />
        </div>

        <div
          className={`flex ml-auto mb-8 absolute overflow-hidden top-14 rounded-full h-10 w-10 md:hidden`}
        >
          <div
            className={`w-full h-full grid items-center justify-center bg-primary-light`}
          >
            <img
              className='cursor-pointer'
              src={menuIcon}
              alt=''
              onClick={() => dispatch(setCollapseState(!collapsed))}
            />
          </div>
        </div>
      </div>
      <div className={'bg-primary-dark p-3'}>
        <div
          className={
            collapsed
              ? 'mt-120-neg duration-4000 md:mt-0'
              : 'mt-0 duration-2000'
          }
        >
          <div
            className={`flex items-center p-3 my-4 rounded cursor-pointer ${
              activeMenu === 7 ? 'bg-primary-light' : ''
            } `}
            onClick={() =>
              handleActiveMenu(7, homeMenu?.name, homeMenu?.pageLink)
            }
          >
            {homeMenu?.icon}
            <p className='text-fontColor font-semibold text-sm'>
              {homeMenu?.name}
            </p>
          </div>
          <div
            className={`flex items-center justify-between p-3 my-4 rounded cursor-pointer  ${
              activeMenu === 8 ? ' bg-secondary-light' : ''
            } `}
            onClick={() =>
              handleEmailMenu(8, emailMenu?.name, emailMenu?.pageLink)
            }
          >
            <div className='flex'>
              {emailMenu?.icon}
              <p className='text-fontColor font-semibold text-sm'>
                {emailMenu?.name}
              </p>
            </div>
            {openEmailMenu ? (
              <IoIosArrowUp className='text-fontColor text-xl' />
            ) : (
              <IoIosArrowDown className='text-fontColor text-xl' />
            )}
          </div>
          {openEmailMenu ? (
            <div className='border-b border-fontColor-darkGray'>
              <Link
                to={inboxMail?.pageLink}
                className={`flex items-center justify-between p-3 my-2 rounded cursor-pointer  ${
                  3 === activeMailMenu ? 'bg-primary-light' : ''
                }`}
                onClick={() => {
                  setActiveMailMenu(3);
                  dispatch(setCurrentMailList('inbox'));
                }}
              >
                <div className='flex'>
                  {inboxMail?.icon}
                  <p className='text-fontColor font-semibold text-sm'>
                    {inboxMail?.name}
                  </p>
                </div>
                <p
                  className={`text-sm font-semibold  ${
                    3 === activeMailMenu
                      ? 'px-2 rounded-xl bg-fontColor text-primary-dark'
                      : 'text-fontColor'
                  }`}
                >
                  {inboxMailList?.length}
                </p>
              </Link>
              <Link
                to={sentMail?.pageLink}
                className={`flex items-center justify-between p-3 my-2 rounded cursor-pointer  ${
                  4 === activeMailMenu ? 'bg-primary-light' : ''
                }`}
                onClick={() => {
                  setActiveMailMenu(4);
                  dispatch(setCurrentMailList('sent'));
                }}
              >
                <div className='flex'>
                  {sentMail?.icon}
                  <p className='text-fontColor font-semibold text-sm'>
                    {sentMail?.name}
                  </p>
                </div>
                <p
                  className={`text-sm font-semibold  ${
                    4 === activeMailMenu
                      ? 'px-2 rounded-xl bg-fontColor text-primary-dark'
                      : 'text-fontColor'
                  }`}
                >
                  {sentMailList?.length}
                </p>
              </Link>
              {/* {innerMailMenu?.map((menu, index) => {
                return (
                  <Link
                    to={menu?.pageLink}
                    key={index}
                    className={`flex items-center justify-between p-3 my-2 rounded cursor-pointer  ${
                      index === activeMailMenu ? "bg-primary-light" : ""
                    }`}
                    onClick={() => setActiveMailMenu(index)}
                  >
                    <div className="flex">
                      {menu?.icon}
                      <p className="text-fontColor font-semibold text-sm">
                        {menu?.name}
                      </p>
                    </div>
                    <p
                      className={`text-sm font-semibold  ${
                        index === activeMailMenu
                          ? "px-2 rounded-xl bg-fontColor text-primary-dark"
                          : "text-fontColor"
                      }`}
                    >
                      {menu?.amount}
                    </p>
                  </Link>
                );
              })} */}
            </div>
          ) : null}

          {sideBarMenu?.map((menu, index) => {
            return (
              <div
                key={index}
                className={`flex items-center p-3 my-4 rounded cursor-pointer${
                  index === activeMenu ? 'bg-primary-light' : ''
                } `}
                onClick={() =>
                  handleActiveMenu(index, menu?.name, menu?.pageLink)
                }
              >
                {menu?.icon}
                <p className='text-fontColor font-semibold text-sm'>
                  {menu?.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SiderBar;
