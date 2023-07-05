import AuroraDashboardDark from '../assets/images/AuroraDashboardDark.png'
import AuroraDashboardLight from '../assets/images/AuroraDashboardLight.png'
import AuroraImage from "../assets/images/Aurora-Auth-image.png";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styled from "styled-components";
import axiosInstance from "../utils/AxiosInstance";
import { StatusProps } from "../interfaces/interface";
import { useCookies } from "react-cookie";
import { tokenValidity } from "../utils/Cookie";
import Title from "./components/Title";
import Header from "./components/Header";
import {
  AccountLink,
  ArrowButton,
  AuthenticationContainer,
  AuthenticationForm,
  InvalidText,
  LoadingText,
  MainTag
} from "../styles/GlobalStyle";

const SignIn = () => {
  const navigate = useNavigate();
  const [, setCookies] = useCookies();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<StatusProps>({ loading: false, message: '', error: false });

  const properties = {
    prevArrow: <ArrowButton><IoIosArrowBack /></ArrowButton>,
    nextArrow: <ArrowButton><IoIosArrowForward /></ArrowButton>
  };

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '38rem',
    width: '100%',
    borderRadius: '0 5px 5px 0'
  };

  const images = [AuroraDashboardDark, AuroraDashboardLight, AuroraImage];

  const handleSignIn = (e: FormEvent) => {
    setResponseStatus({ ...responseStatus, loading: true });

    e.preventDefault();
    const data = {
      'email': email,
      'password': password
    };

    axiosInstance.post('/sign/sign_in', data)
      .then(res => {
        if (res.data.success) {
          setCookies('aurora_token', res.data.data.access_token, {
            sameSite: 'none',
            secure: true,
            path: '/'
          });
          navigate('/teams');
        } else {
          setResponseStatus({ message: res.data.data.message, loading: false, error: true });
        }
      })
      .catch(err => {
        setResponseStatus({ message: err.response.data.message, loading: false, error: true });
        console.error(err);
      });
  };

  return (
    <MainTag>
      <Title title={'Sign in to Aurora'} />
      <Header />

      <SignInContainer>
        <AuthenticationContainer>
          <div className={'left-box'}>
            <div className={'title'}>Sign in to Aurora</div>

            <AuthenticationForm style={{ height: '17.5rem' }} onSubmit={handleSignIn}>
              <div className="input-container">
                <input type="input" className="input-field" placeholder="Email" name="email" id='email'
                       required={true} onChange={e => setEmail(e.target.value)} />
                <label htmlFor="email" className="input-label">Email</label>
              </div>

              <div className="input-container password-container">
                <input type="password" className="input-field" placeholder="Password" name="password" id='password'
                       required={true} onChange={e => setPassword(e.target.value)} />
                <label htmlFor="password" className="input-label">Password</label>
              </div>

              {responseStatus.loading && <LoadingText>Verifying credentials...</LoadingText>}
              {!responseStatus.loading && responseStatus.error &&
								<InvalidText>{responseStatus.message}</InvalidText>}

              <button type={'submit'}>
                Sign in
              </button>
            </AuthenticationForm>

            <AccountLink>Don't have an account? <span onClick={() => navigate('/sign-up')}>Sign up</span></AccountLink>

          </div>

          <div className={'right-box'}>
            <Fade {...properties}>
              {images.map((slideImage: any, index: number) => (
                <div key={index} style={{ ...divStyle }}>
                  <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage})` }}>
                  </div>
                </div>
              ))}
            </Fade>
          </div>
        </AuthenticationContainer>
      </SignInContainer>
    </MainTag>
  );
};

const withTokenValidation = (WrappedComponent: React.ComponentType) => {
  const TokenValidationComponent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const checkValidity = async () => {
        const isValid = await tokenValidity();
        isValid && navigate('/teams');
      };

      checkValidity().then(() => setLoading(false));
    }, []);

    return loading ? <></> : <WrappedComponent />;
  };

  return TokenValidationComponent;
};

const EnhancedMain = withTokenValidation(SignIn);

export default EnhancedMain;

const SignInContainer = styled.div`
  height: calc(100vh - 3.3rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
