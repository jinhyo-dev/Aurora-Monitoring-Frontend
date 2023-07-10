import { AuthenticationForm, InvalidText, LoadingText, MainTag } from "../styles/GlobalStyle";
import Header from "./components/Header";
import styled from "styled-components";
import { ReactComponent as AuroraLogo } from '../assets/svg/Aurora.svg'
import Select from 'react-select'
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { getNumericPhoneNumber, isValidEmail, phoneNumberAutoFormat } from "../utils/Formatter";
import Title from "./components/TitleTag";
import { Transition } from 'react-transition-group';
import axiosInstance from "../utils/AxiosInstance";
import { CountryList, OptionType, StatusProps } from "../interfaces/interface";
import { useNavigate } from "react-router-dom";
import { tokenValidity } from "../utils/Cookie";
import Loaders from "./components/Loaders/Loaders";

interface PasswordInputProps {
  $isFocused: boolean;
}

interface ValidationBoxProps {
  $show: boolean;
}

interface PasswordValidationProps {
  hasSpecialChar: boolean,
  isMinLength: boolean,
  hasNumber: boolean
}

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

    return loading ? <Loaders/> : <WrappedComponent/>;
  };

  return TokenValidationComponent;
};

const SignUp = () => {
  const SelectOption = CountryList

  const [title, setTitle] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [country, setCountry] = useState<OptionType | null>(null)
  const [submitValidation, setSubmitValidation] = useState<{ emailValidate: boolean, passwordValidate: boolean }>({
    emailValidate: true,
    passwordValidate: true
  })
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidationProps>({
    hasSpecialChar: false,
    isMinLength: false,
    hasNumber: false
  })
  const [responseStatus, setResponseStatus] = useState<StatusProps>({loading: false, message: '', error: false})
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const showValidationBox = isFocused && password.trim().length > 0;

  const isValidPassword = passwordValidation.isMinLength && passwordValidation.hasNumber && passwordValidation.hasSpecialChar;
  const borderColor = isValidPassword || !password.length ? '#fff' : '#e84e4e';
  const textColor = isValidPassword || !password.length ? '#fff' : '#e84e4e';
  const transitionDuration = 400;
  const navigate = useNavigate()
  const transitionStyles: { [key: string]: React.CSSProperties } = {
    entering: {opacity: 0, transform: 'translateY(20px)'},
    entered: {opacity: 1, transform: 'translateY(0)'},
    exiting: {opacity: 0, transform: 'translateY(-20px)'},
    exited: {opacity: 0, transform: 'translateY(-20px)', display: 'none'},
  };

  const selectCustomStyle = {
    option: (provided: any, state: any) => ({
      ...provided,
      textAlign: 'left',
      fontFamily: 'sans-serif',
      color: state.isFocused ? '#fff' : '#000',
      backgroundColor: state.isFocused ? '#474747' : '#fff',
      transition: 'all .2s',
      width: '100%'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      textAlign: 'left',
      color: '#fff',
      width: '100%'
    }),
    control: (provided: any) => ({
      ...provided,
      background: 'none',
      margin: 'auto',
      border: '1px solid #fff',
      height: '2.6rem',
      fontFamily: 'sans-serif',
      width: '100%',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      color: '#fff',
      placeholder: '#fff',
      marginBottom: '1rem'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#fff',
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#fff',
    }),
  };

  const titles: { [key: number]: string } = {
    0: 'Choose a plan',
    1: 'Sign up to Aurora',
  }

  useEffect(() => {
    const title = titles[pageNumber] || 'Sign up success';
    setTitle(title);
  }, [pageNumber])

  const validatePassword = (password: string) => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);

    setPasswordValidation({hasSpecialChar: hasSpecialChar, isMinLength: isMinLength, hasNumber: hasNumber})
  }

  const checkPasswordValidate = (): boolean => {
    const validationValue = passwordValidation;

    for (const key in validationValue) {
      if (!validationValue[key as keyof typeof validationValue]) {
        return false;
      }
    }

    return true;
  };


  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value
    validatePassword(password)
    setPassword(event.target.value)
    setSubmitValidation({emailValidate: submitValidation.emailValidate, passwordValidate: true})
  }

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setSubmitValidation({emailValidate: true, passwordValidate: submitValidation.passwordValidate})
    setEmail(email)
  }

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    setSubmitValidation({emailValidate: isValidEmail(email), passwordValidate: checkPasswordValidate()})

    if (emailInputRef.current && !isValidEmail(email)) {
      emailInputRef.current.focus();
    } else if (passwordInputRef.current && !checkPasswordValidate()) {
      passwordInputRef.current.focus();
    } else {

      const data = {
        "email": email,
        "password": password,
        "phone": getNumericPhoneNumber(phoneNumber),
        "firstName": firstName,
        "lastName": lastName,
        "country": country?.value.split('/')[0],
      }

      setResponseStatus({...responseStatus, loading: true});

      axiosInstance.post('/sign/sign_up', JSON.stringify(data))
        .then(res => {
          if (res.data.data.statusCode === 201) {
            setPageNumber(2)
          } else {
            setResponseStatus({message: res.data.data.message, loading: false, error: true});
          }
        })
        .catch(err => {
          setResponseStatus({message: err.data.data.message, loading: false, error: true});
        })
    }
  }

  const handleCountry = (e: OptionType | null) => {
    setCountry(e)
  }

  const handleStateValue = (name: string, value: string) => {
    const stateFunctions: { [key: string]: React.Dispatch<React.SetStateAction<string>> } = {
      setFirstName,
      setLastName,
    };

    const stateFunction = stateFunctions[name];
    if (stateFunction) {
      stateFunction(value);
    }
  }

  return (
    <MainTag>
      <Title title={title}/>

      <Header/>
      <Transition in={pageNumber === 0} timeout={transitionDuration}>
        {(state) => (
          <SignUpContainer style={{...transitionStyles[state], transitionDuration: `${transitionDuration}ms`}}>
            <CenterBox>
              <LeftBox>
                <AuroraLogo style={{width: '12rem'}}/> <br/>
                Features Supported by Aurora:<br/>
                asdflkasdjflsajfsldfjlsdkjf asdfjlasf;asdhfkre<br/>
                asdasd askflsad faiej iasdslfkajsde<br/>
                sldisfjdlkfwefj wlkfhoaisdfowh fws <br/>
              </LeftBox>
              <RightBox>

                <SelectContainer>
                  <Select options={SelectOption} styles={selectCustomStyle} placeholder={'Country'}
                          onChange={handleCountry} value={country} id={'country-select'}/>
                </SelectContainer>

                <AuthenticationForm style={{height: '30rem', marginTop: '1rem'}} onSubmit={handleLogin}>

                  <div className="input-container name-container">
                    <input type={"input"} className="input-field" placeholder="First name" name="first-name"
                           id='first-name' required={true}
                           onChange={e => handleStateValue('setFirstName', e.target.value)}/>
                    <label htmlFor="first-name" className="input-label">First name</label>
                  </div>

                  <div className="input-container name-container" style={{float: 'right'}}>
                    <input type={"input"} className="input-field" placeholder="Last name" name="last-name"
                           id='last-name' required={true}
                           onChange={e => handleStateValue('setLastName', e.target.value)}/>
                    <label htmlFor="last-name" className="input-label">Last name</label>
                  </div>

                  <br/>

                  <div className="input-container phone-container">
                    <input type={"input"} className="input-field" placeholder="Phone" name="phone" id='phone'
                           value={phoneNumber} required={true}
                           onChange={e => setPhoneNumber(phoneNumberAutoFormat(e.target.value))}/>
                    <label htmlFor="phone" className="input-label">Phone</label>
                    <div className={'info-text'}>* Select country first</div>
                  </div>

                  <div className="input-container email-container">
                    <input type={"input"} className="input-field" placeholder="Email" name="email" id='email'
                           ref={emailInputRef}
                           style={{
                             color: isValidEmail(email) || !email.length ? '#fff' : '#e84e4e',
                             borderBottomColor: isValidEmail(email) || !email.length ? '#fff' : '#e84e4e'
                           }}
                           required={true} onChange={handleEmail} value={email}/>
                    <label htmlFor="email" className="input-label" style={{
                      color: isValidEmail(email) || !email.length ? '#fff' : '#e84e4e',
                    }}>Email</label>
                  </div>

                  {!submitValidation.emailValidate && <InvalidText>Invalid email format</InvalidText>}

                  <PasswordContainer>
                    <PasswordInput $isFocused={isFocused}
                                   className={'input-container password-container2'}>
                      <input type={"password"} className="input-field" placeholder="Password" name="password"
                             id='password'
                             ref={passwordInputRef}
                             required={true} onChange={handlePassword} onFocus={() => setIsFocused(true)}
                             value={password}
                             style={{
                               borderBottomColor: borderColor,
                               color: textColor
                             }}
                             onBlur={() => setIsFocused(false)}/>
                      <label htmlFor="password" className="input-label"
                             style={{color: textColor}}>Password</label>
                    </PasswordInput>

                    {!submitValidation.passwordValidate && <InvalidText>Invalid password format</InvalidText>}

                    <ValidationBox $show={showValidationBox}>
                      <div>Your password must have:</div>
                      <div>
                        <p style={{color: passwordValidation.isMinLength ? '#22c248' : '#888'}}>
                          8 or more characters</p>
                        <p style={{color: passwordValidation.hasNumber ? '#22c248' : '#888'}}>
                          At least one number</p>
                        <p style={{
                          color: passwordValidation.hasSpecialChar ? '#22c248' : '#888',
                          paddingBottom: '0.5rem'
                        }}>Including special characters</p>
                      </div>
                    </ValidationBox>

                    {responseStatus.loading && <LoadingText>Verifying credentials...</LoadingText>}
                    {!responseStatus.loading && responseStatus.error &&
											<InvalidText>{responseStatus.message}</InvalidText>}
                  </PasswordContainer>


                  <button type={'submit'}>
                    Sign Up
                  </button>
                </AuthenticationForm>

              </RightBox>
            </CenterBox>
          </SignUpContainer>
        )}
      </Transition>

      <Transition in={pageNumber === 2} timeout={transitionDuration}>
        {(state) => (
          <SingUpSuccess style={{...transitionStyles[state], transitionDuration: `${transitionDuration}ms`}}>
            <div className={'container'}>
              <AuroraLogo/>
              <div className={'success-title'}>Success!</div>
              <div className={'success-text'}>Aurora sign-up completed. You are ready to use an aurora!</div>
              <button onClick={() => navigate('/sign-in')}>Get Started</button>
            </div>
          </SingUpSuccess>

        )}
      </Transition>
    </MainTag>
  )
}

const SingUpSuccess = styled.div`
  height: calc(100vh - 3.3rem);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & .container {
    text-align: center;
    width: 40rem;
    height: 20rem;

    & svg {
      width: 25rem;
    }

    & .success-title {
      margin-top: 3rem;
      font-size: 2rem;
      font-weight: 600;
    }

    & .success-text {
      margin-top: 0.5rem;
      font-size: 1.2rem;
      font-weight: 400;
    }

    & button {
      margin-top: 2rem;
      height: 2.7rem;
      width: 8rem;
      background: #fff;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      color: #000;
      transition: all .25s;
      cursor: pointer;

      &:hover {
        transform: translateY(-3px);
      }
    }
  }
`

const SignUpContainer = styled.div`
  height: calc(100vh - 3.3rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CenterBox = styled.div`
  width: 70rem;
  height: 40rem;
  border: none;
`

const LeftBox = styled.div`
  text-align: left;
  float: left;
  width: 45%;
  height: 100%;
`

const RightBox = styled.div`
  float: left;
  width: 55%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  border: none;
  border-radius: 8px;
`

const SelectContainer = styled.div`
  width: 70%;
  margin: 4rem auto 0;
  height: 2.6rem;
`

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;
`;

const PasswordInput = styled.div<PasswordInputProps>`
  position: relative;
  padding: 15px 0 0;
  width: 100%;
  margin-top: 2rem;

  & input {
    position: relative;
    padding: 15px 0 0;
    width: 100%;

    & input {
      font-family: inherit;
      width: 100%;
      border: 0;
      outline: 0;
      font-size: 1rem;
      padding: 5px 2px;
      background: transparent;
      transition: all 0.3s;

      &::placeholder {
        color: transparent;
      }

      &:placeholder-shown ~ .input-label {
        font-size: 1.2rem;
        cursor: text;
        top: 20px;
      }
    }

    & .input-field:focus {
      ~ .input-label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 0.75rem;
      }

      padding-bottom: 6px;
      border-width: 3px;
    }

    .input-field {
      &:required, &:invalid {
        box-shadow: none;
      }
    }

    & .input-label {
      position: absolute;
      top: 0;
      display: block;
      font-size: 0.8rem;
      transition: 0.2s;
    }
  }
`;

const ValidationBox = styled.div<ValidationBoxProps>`
  position: absolute;
  width: 70%;
  top: calc(100% + 1.3rem);
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  background-color: #222;
  border: 1px solid #2E2E2E;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  display: ${({$show}) => ($show ? 'block' : 'none')};
  z-index: 1;

  &::after {
    border-top: 0 solid transparent;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #222;
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
  }

  & div {
    font-size: 0.9rem;
    padding-top: 0.2rem;
    padding-left: 0.2rem;
  }

  & div p {
    color: #888;
    font-size: 0.85rem;
    padding-top: 0.4rem;
    padding-left: 0.4rem;
  }
`;

const EnhancedSignUp = withTokenValidation(SignUp);

export default EnhancedSignUp;