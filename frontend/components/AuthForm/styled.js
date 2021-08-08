import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import { 
  Form as BaseForm, 
  SubmitButton,
  Text as BaseText,
  Image as BaseImage,
  FlexBox,
} from '@oladimillion/react-form'


export const Wrapper = styled.main`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  background-color: #d0d0ce;
`

export const Card = styled(Segment)`
  && {
    height: 70%;
    min-width: 250px;
    min-height: 500px;
    margin: 1rem;
    display: flex;
    padding: 0;
    border-radius: 1rem;
    overflow: hidden;

    @media (max-width: 1300px) {
      width: 70%;
    }

    @media (max-width: 1000px) {
      width: 80%;
    }

    @media (max-width: 800px) {
      width: 100%;
    }

  }
`

export const Form = styled(BaseForm)`
  width: 100%;
`

export const Button = styled(SubmitButton)`
  width: 100%;
  backgroud: #000;
`

export const SideImage = styled(FlexBox)`
  background-size: cover;
  @media (max-width: 800px) {
    display: none;
  }
`

export const Text = styled(BaseText)`
  color: ${({ color }) => color || '#000'};
  font-weight: normal;
`

