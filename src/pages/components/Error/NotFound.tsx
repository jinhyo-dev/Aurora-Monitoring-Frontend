import { ReactComponent as ErrorLogo } from '../../../assets/svg/404-Error.svg'
import { ErrorContainer, NavigateToMain } from "./ErrorPageStyle";

const NotFound = () => {
  return (
    <ErrorContainer>
      <div className={'logo-container'}>
        <ErrorLogo/>
        <div className={'status-code'}>404 Not Found</div>
        <button onClick={NavigateToMain}>Go to main</button>
      </div>
    </ErrorContainer>
  )
}

export default NotFound