import React from 'react'
import { Icon, Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import { FlexBox } from '@oladimillion/react-form'
import { connect } from './connect'


const Wrapper = styled.header`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  position: sticky;
  top: 0;
  z-index: 9;
  background: #fff;
`

const StyledIcon = styled(Icon)`
  && {
    color: #6c757d;
    font-size: 1.3rem;
    cursor: pointer;
    transform: translateY(3px);
    margin-right: 2rem;
  }
`

export const Title = styled.span`
  color: #3f4d67;
  font-size: 15px;
  display: inline-block;
  height: auto;
  transform: translateY(4px);
  letter-spacing: 1px;
`

const HeaderView = (props) => {

  const { navigationStore } = props
  const { 
    toggleSideBar,
    showSideBar,
  } = navigationStore 

  return (
    <Wrapper>
      <FlexBox>
        {!showSideBar && <StyledIcon name='bars' onClick={toggleSideBar} />}
        <Title>Review</Title>
      </FlexBox>
      <Divider />
    </Wrapper>
  )
}

export const Header = connect(HeaderView)

