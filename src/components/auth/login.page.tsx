/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import AuthScreenWrapper from './authscreen.wrapper';
import { useNavigate } from 'react-router-dom';
import './auth.scss';
import { useAppDispatch } from '../../redux/hooks';
import { setRole, setUser, setUserData } from '../../redux/slices/userSlice';
import axiosConfig from '../../config/axiosConfig';
import notification from '../theme/utility/notification';
import { setLoading } from '../../redux/slices/utilitySlice';

// INFO: THIS COMPONENT CONTAINS LOGINPAGE LAYOUT
function LoginPage() {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setUserInput((pre) => ({ ...pre, [name]: value }));
  };

  useEffect(() => {
    let user = sessionStorage.getItem('bimaUser');
    if (user) {
      //@ts-ignore
      user = JSON.parse(user);
      dispatch(setLoading(false));
      //@ts-ignore
      dispatch(setUserData(user));
      //@ts-ignore
      dispatch(setUser(user?.email));
      //@ts-ignore
      dispatch(setRole(user?.role));
      
      navigate('/');
    }
  }, []);

  // HANDLE LOGIN ON FORM SUBMISSION
  const handleSignin = async (e: any) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const URL = '/signin';
      const {
        data: { data },
      } = await axiosConfig.post(URL, {
        email: userInput?.email,
        password: userInput?.password,
      });
      const {
        data: { data: userRole },
      } = await axiosConfig.get(`/role?email=${data?.email}`);

      data.role = userRole.Role;
      // console.log(data.role);
      // console.log(data);
      window.sessionStorage.setItem('bimaUser', JSON.stringify(data));

      dispatch(setLoading(false));
      dispatch(setUserData(data));
      dispatch(setUser(data?.email));
      dispatch(setRole(userRole?.Role));

      if(data.Role === "admin"){
        navigate('/home');
      }
      if(data.role === "dataentry"){
        navigate('/dephome');
      }
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  // HANDLE CLICK ON SIGNUP LINK
  // const handleRedirect = () => {
  //   navigate("/signup");
  // };

  return (
    <AuthScreenWrapper title='LOGIN' submit={handleSignin}>
      <div className='authscreen__login'>
        <div className='input__group'>
          <input
            type='email'
            placeholder='Email'
            id='username'
            required
            name='email'
            value={userInput?.email}
            onChange={handleChange}
          />
        </div>
        <div className='input__group'>
          <input
            type='password'
            placeholder='Password'
            id='password'
            required
            name='password'
            value={userInput?.password}
            onChange={handleChange}
          />
        </div>
        <button>Log In</button>
      </div>
      {/* <div className='authscreen__or'>
        NO ACCOUNT? <span>SIGNUP</span>
      </div> */}
    </AuthScreenWrapper>
  );
}

export default LoginPage;
