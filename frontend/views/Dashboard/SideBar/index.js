import React from 'react';
import { Icon } from 'semantic-ui-react'
import { FlexBox } from '@oladimillion/react-form'
import { isEmptyValue } from '../../../helpers/isEmptyValue'
import { connect } from './connect'
import {
  Nav,
  HeaderLogo,
  AppName,
  NavScroll,
  Label,
  NavContainer,
  NavItemWrapper,
  StyledNavLink as NavLink,
  LogoutButton,
} from './styled'

const restrictedRoutes = ['/assigned_reviewers', '/performance_reviews']

const SideBarView = (props) => {

  const { 
    navigationStore, 
    logout, 
    accountStore: { isAdmin },
  } = props
  
  const { 
    navItems, 
    showSideBar,
  } = navigationStore 

  return (
    <Nav showSideBar={showSideBar}>
      <HeaderLogo>
        <AppName to='/'>Review </AppName>
      </HeaderLogo>
      <NavScroll>
        <NavContainer>
          <NavItemWrapper>
            {navItems.map(
              ({ name, icon, children, to, ...rest }, index) => (
                restrictedRoutes.includes(to) && !isAdmin 
                  ? null 
                  : (
                    <NavItemWrapper.Item 
                      key={name}
                    >
                      <NavLink to={to} {...rest}>
                        <FlexBox>
                          {icon && <Icon name={icon} />}
                          {name && <Label>{name}</Label>}
                        </FlexBox>
                      </NavLink>
                    </NavItemWrapper.Item>
                  )
              ))}
          </NavItemWrapper>
          <LogoutButton onClick={logout}>
            <LogoutButton.Icon />
            Log out
          </LogoutButton>
        </NavContainer>
      </NavScroll>
    </Nav>
  )
};

export const SideBar = connect(SideBarView);

