import styled from "styled-components";
import { ReactComponent as AuroraIcon } from '../../assets/svg/Aurora.svg'

const Header = () => {
  return (
    <HeaderTag>
      <AuroraNavigate href={'/'}>
        <AuroraIcon style={{ width: '2.5rem', height: '2rem', marginBottom: '-0.15rem' }}/> Aurora
      </AuroraNavigate>

    </HeaderTag>
  )
}

const HeaderTag = styled.header`
  height: 3rem;
  padding: 1rem;
  color: white;
  background: none;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AuroraNavigate = styled.a`
  font-size: 2.5rem;
  color: #fff;
  padding-left: 6%;
`

export default Header