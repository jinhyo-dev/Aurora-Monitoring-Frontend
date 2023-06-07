import styled, { createGlobalStyle } from 'styled-components'
import { CustomTheme } from "./theme/defaultTheme";

interface GlobalStyleProps {
  theme: CustomTheme;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    font-family: 'Poppins', sans-serif;
    margin: 0;
  }

  body {
    overflow: hidden;
  }

  a {
    text-decoration: none;
  }
`

export const AuthenticationContainer = styled.form`
  width: 72%;
  height: 36rem;
  background: rgba(0, 0, 0, .6);
  margin: calc(8% - 3.3rem) auto 0;
  border-radius: 10px;

  & .left-box, .right-box {
    height: 100%;
    width: 50%;
    float: left;
  }

  & .left-box {
    text-align: center;
  }

  & .title {
    margin-top: 4rem;
    font-size: 1.8rem;
    font-weight: 500;
  }

  & .input-container {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;


    & input {
      font-family: inherit;
      width: 100%;
      border: 0;
      border-bottom: 1px solid #ccc;
      outline: 0;
      font-size: 1.2rem;
      color: #fff;
      padding: 5px 2px;
      background: transparent;
      transition: border-color 0.2s;

      &::placeholder {
        color: transparent;
      }

      &:placeholder-shown ~ .input-label {
        font-size: 1.3rem;
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
        font-size: 0.9rem;
        color: #ccc;
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
      transition: 0.2s;
      color: #ccc;
    }
  }
`