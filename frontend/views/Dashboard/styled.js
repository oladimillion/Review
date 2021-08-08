import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import { SimpleForm, Text as BaseText, FlexBox } from 'Components/SimpleForm'

export const Wrapper = styled(FlexBox).attrs(() => ({
  className: 'Wrapper'
}))`
  width: 100%;
  padding: 1rem;
  padding-right: 3rem;
  margin-left: 2rem;
  margin-right: 2rem;
  flex-direction: column;
`

export const StyledForm = styled(SimpleForm)`
  padding: 2rem 1rem;
  width: 50%;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

export const Card = styled(Segment)`
  && {
    padding: 0em 1em;
  }
` 

export const CardHeader = styled.div`
  background-color: transparent;
  border-bottom: 1px solid #f1f1f1;
  padding: 20px 25px;
  position: relative;
` 


export const HeaderText = styled(BaseText).attrs(() => ({
 as: 'h5'
}))`
  margin-bottom: 0;
  color: #3f4d67;
  font-size: 17px;
  font-weight: 600;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  transform: translateX(-15px);

  &:after {
    content: "";
    background-color: #04a9f5;
    position: absolute;
    left: -25px;
    top: 0;
    width: 4px;
    height: 20px;
  }
`

Card.Header = CardHeader
Card.HeaderText = HeaderText

