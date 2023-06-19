import { AuthenticationForm, MainTag } from "../styles/GlobalStyle";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import styled from "styled-components";
import { ReactComponent as AuroraLogo } from '../assets/svg/Aurora.svg'
import Select from 'react-select'
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { phoneNumberAutoFormat } from "../utils/Formatter";

interface PasswordInputProps {
  isFocused: boolean;
}

interface ValidationBoxProps {
  show: boolean;
}

interface PasswordValidationProps {
  hasSpecialChar: boolean,
  isMinLength: boolean,
  hasNumber: boolean
}

const SignUp = () => {
  const pageTitle = 'Sign up to Aurora · Aurora';
  const SelectOption = [
    {value: 'korea', label: '🇰🇷 Korea'},
    {value: 'united states', label: '🇺🇸 United States'},
    {value: 'france', label: '🇫🇷 France'}
  ]

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [submitValidation, setSubmitValidation] = useState<{ emailValidate: boolean, passwordValidate: boolean }>({
    emailValidate: true,
    passwordValidate: true
  })
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidationProps>({
    hasSpecialChar: false,
    isMinLength: false,
    hasNumber: false
  })
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const showValidationBox = isFocused && password.trim().length > 0;

  const isValidPassword = passwordValidation.isMinLength && passwordValidation.hasNumber && passwordValidation.hasSpecialChar;
  const borderColor = isValidPassword || !password.length ? '#fff' : '#e84e4e';
  const textColor = isValidPassword || !password.length ? '#fff' : '#e84e4e';

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

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
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
    }
  }

  // const navigate = useNavigate()

  return (
    <MainTag>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Header/>
      <SignUpContainer>
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
              <Select options={SelectOption} styles={selectCustomStyle} placeholder={'Country'}/>
            </SelectContainer>
            <AuthenticationForm style={{height: '30rem', marginTop: '1rem'}} onSubmit={handleLogin}>
              <div className="input-container name-container">
                <input type={"input"} className="input-field" placeholder="First name" name="first-name" id='first-name'
                       required={true}/>
                <label htmlFor="first-name" className="input-label">First name</label>
              </div>

              <div className="input-container name-container" style={{float: 'right'}}>
                <input type={"input"} className="input-field" placeholder="Last name" name="last-name" id='last-name'
                       required={true}/>
                <label htmlFor="last-name" className="input-label">Last name</label>
              </div>

              <br/>

              <div className="input-container phone-container">
                <input type={"input"} className="input-field" placeholder="Phone" name="phone" id='phone'
                       value={phoneNumber}
                       required={true} onChange={(e) => setPhoneNumber(phoneNumberAutoFormat(e.target.value))}/>
                <label htmlFor="phone" className="input-label">Phone</label>
                <div className={'info-text'}>* Select country first</div>
              </div>

              <div className="input-container email-container">
                <input type={"input"} className="input-field" placeholder="Email" name="email" id='email'
                       ref={emailInputRef}
                       style={{
                         color: isValidEmail(email) || !email.length ? '#fff' : '#e84e4e',
                         borderBottom: isValidEmail(email) || !email.length ? '1px solid #fff' : '1px solid #e84e4e'
                       }}
                       required={true} onChange={handleEmail} value={email}/>
                <label htmlFor="email" className="input-label" style={{
                  color: isValidEmail(email) || !email.length ? '#fff' : '#e84e4e',
                }}>Email</label>
              </div>

              {!submitValidation.emailValidate && <InvalidText>Invalid email format</InvalidText>}

              <PasswordContainer>
                <PasswordInput isFocused={isFocused}
                               className={'input-container password-container2'}>
                  <input type={"password"} className="input-field" placeholder="Password" name="password" id='password'
                         ref={passwordInputRef}
                         required={true} onChange={handlePassword} onFocus={() => setIsFocused(true)} value={password}
                         style={{
                           borderBottom: `1px solid ${borderColor}`,
                           color: textColor
                         }}
                         onBlur={() => setIsFocused(false)}/>
                  <label htmlFor="password" className="input-label"
                         style={{color: textColor}}>Password</label>
                </PasswordInput>

                {!submitValidation.passwordValidate && <InvalidText>Invalid password format</InvalidText>}

                <ValidationBox show={showValidationBox}>
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
              </PasswordContainer>


              <button type={'submit'}>
                Sign in
              </button>
            </AuthenticationForm>

          </RightBox>
        </CenterBox>
      </SignUpContainer>
    </MainTag>
  )
}

const SignUpContainer = styled.div`
  height: calc(100vh - 3.3rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CenterBox = styled.div`
  width: 70%;
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
  display: ${({show}) => (show ? 'block' : 'none')};
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

const InvalidText = styled.p`
  padding-top: 0.3rem;
  padding-left: 0.1rem;
  font-size: 0.7rem;
  color: #e84e4e;
`

export default SignUp