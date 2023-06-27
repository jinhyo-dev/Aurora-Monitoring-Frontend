import AuroraBackground from "../assets/images/Aurora-Main-Background.jpg";
import AuroraImage from "../assets/images/Aurora-Auth-image.png";
import Header from "./components/Header";
import { AccountLink, ArrowButton, AuthenticationContainer, AuthenticationForm, MainTag } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FormEvent, useState } from "react";
import Title from "./components/Title";

const SignIn = () => {
  const navigate = useNavigate()

  const properties = {
    prevArrow: <ArrowButton>
      <IoIosArrowBack/>
    </ArrowButton>,
    nextArrow: <ArrowButton>
      <IoIosArrowForward/>
    </ArrowButton>
  }

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '36rem',
    width: '100%',
    borderRadius: '0 5px 5px 0'
  }

  const images = [AuroraBackground, AuroraImage]
  const [signInResponse, setSignInResponse] = useState<{ message: string, success: boolean }>({
    message: '',
    success: false
  })

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault()
    setSignInResponse({message: 'Verifying credential...', success: false})
    setTimeout(() => {
      setSignInResponse({message: 'User information is not valid', success: false})
      // navigate('/dashboard')
    }, 200)
  }

  return (
    <MainTag>
      <Title title={'Sign in to Aurora'}/>
      <Header/>

      <AuthenticationContainer>
        <div className={'left-box'}>
          <div className={'title'}>Sign in to Aurora</div>

          <AuthenticationForm style={{height: '17.5rem'}} onSubmit={handleSignIn}>
            <div className="input-container">
              <input type="input" className="input-field" placeholder="Email" name="email" id='email' required={true}/>
              <label htmlFor="email" className="input-label">Email</label>
            </div>

            <div className="input-container password-container">
              <input type="password" className="input-field" placeholder="Password" name="password" id='password'
                     required={true}/>
              <label htmlFor="password" className="input-label">Password</label>
            </div>

            {!signInResponse.success && <div className={'status-message'} >{signInResponse.message}</div>}

            <button type={'submit'}>
              Sign in
            </button>
          </AuthenticationForm>

          <AccountLink>Don't have an account? <span onClick={() => navigate('/sign-up')}>Sign up</span></AccountLink>

        </div>

        <div className={'right-box'}>
          <Fade {...properties}>
            {images.map((slideImage: any, index: number) => (
              <div key={index} style={{...divStyle}}>
                <div style={{...divStyle, 'backgroundImage': `url(${slideImage})`}}>
                </div>
              </div>
            ))}
          </Fade>
        </div>
      </AuthenticationContainer>
    </MainTag>
  )
}

export default SignIn