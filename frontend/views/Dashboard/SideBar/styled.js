import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { FlexBox } from '@oladimillion/react-form'

export const Nav = styled.nav`
  display: block;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  box-shadow: 1px 0 20px 0 #3f4d67;
  height: 100vh;
  top: 0;
  background: #3f4d67;
  color: #a9b7d0;
  position: sticky;
  top: 0;
  z-index: 10;
  left: 0;
  animation-duration: 500ms;
  animation-name: ${({ showSideBar }) => 
    showSideBar
    ? 'slidein'
    : 'slideout'
  };
  animation-fill-mode: forwards;

  @keyframes slidein {
    from {
      transform: translateX(-500px);
      width: 0%;
    }

    to {
      transform: translateX(0px);
      width: 264px;
    }
  }

  @keyframes slideout {
    from {
      transform: translateX(0px);
      width: 264px;
    }

    to {
      transform: translateX(-500px);
      width: 0%;
    }
  }
`

export const HeaderLogo = styled(FlexBox).attrs(() => ({
  className: 'HeaderLogo',
}))`
  align-items: center;
  display: inline-flex;
  height: 70px;
  text-align: center;
  width: 264px;
  margin-right: 0;
  padding: 10px 20px;
  transition: all 0.3s ease-in-out;
`

export const AppName = styled(Link).attrs(() => ({
  className: 'AppName'
}))`
  color: #a9b7d0;
  font-size: 1.4rem;
  pointer-events: ${({ disabled }) => disabled && 'none' };

  :hover,
  :active {
    color: inherit; 
  }
`

export const CollapseIcon = styled(Icon)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 37px;
    height: 70px;
    position: absolute;
    right: 10px;
    top: 0;
    padding: 0 10px;
    transition: all 0.3s ease-in-out;
    font-size: 1.6rem;
    cursor: pointer;
  }
`

export const NavScroll = styled.div.attrs(() => ({
  className: 'NavScroll',
}))`
  height: calc(100vh - 70px);
  width: 100%;
  display: inline-block;
`

export const NavContainer = styled.div.attrs(() => ({
  className: 'NavContainer',
}))`
  position: relative;
  height: 100%;
  overflow: hidden !important;
  overflow-anchor: none;
  touch-action: auto;
`

export const NavItemWrapper = styled.ul.attrs(() => ({
  className: 'NavItemWrapper',
}))`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding-left: 0;
  list-style: none;
  margin-bottom: 0;
`

const NavItem = styled.li.attrs(() => ({
  className: 'NavItem',
}))`
  font-weight: 600;
  padding: 25px 20px 5px;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  font-size: 15px;
`

NavItemWrapper.Item = NavItem

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 14px;
  color: ${({ color }) => color || '#ddd'};
  cursor: pointer;
  width: 100%;
  margin-left: 7px;
  font-weight: 400;
  opacity: 0.8;
`

export const StyledNavLink = styled(NavLink)`
  color: inherit;
  display: flex;

  &:hover {
    color: inherit;
  }

  &.active label {
    font-weight: 500;
    opacity: 1;
  }
`

export const LogoutButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  color: #a9b7d0;
  position: absolute;
  bottom: 2rem;
  left: 1.7rem;
  cursor: pointer;
  outline: none;
`

const LogoutIcon = styled(Icon).attrs(() => ({
  name: 'power'
}))`
  && {
    margin-right: 1rem;
  }
`

LogoutButton.Icon = LogoutIcon

