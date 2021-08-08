import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Text, FlexBox } from '@oladimillion/react-form'
import { Icon as BaseIcon } from 'semantic-ui-react'

export const StyledFlexBox = styled(FlexBox)`
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
`

export const NoItemFound = styled(Text)`
  && {
    margin-top: 2rem;
    font-size: 2rem;
    width: 100%;
    text-align: center;
    color: #666;
  }
`

export const CreateLink = styled(NavLink)`
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
  display: inline-block;
  font-weight: 400;
  border: 1px solid transparent;
  padding: 7px 15px;
  border-radius: 0.25rem;
  font-size: 15px;
  transition: all 0.3s ease-in-out;
  margin: 2rem 0;
  align-self: center;

  &:hover {
    color: #fff;
    background-color: #273338;
    border-color: #222c31;
  }
`

const Icon = styled(BaseIcon).attrs(() => ({
  name: 'add'
}))`
  && {
    margin-left: 1rem;
  }
`

CreateLink.Icon = Icon

