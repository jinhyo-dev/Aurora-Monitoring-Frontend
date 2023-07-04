import { ReactComponent as ErrorLogo } from '../../../assets/svg/403-Error.svg'
import { ErrorContainer, NavigateToMain } from "./ErrorPageStyle";

const Unauthorized = () => {
  return (
    <ErrorContainer>
      <div className={'logo-container'}>
        <ErrorLogo/>
        <div className={'status-code'}>403 Forbidden</div>
        <button onClick={NavigateToMain}>Go to main</button>
      </div>
    </ErrorContainer>
  )
}

export default Unauthorized