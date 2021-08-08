import React from 'react'
import { 
  FlexBox,
} from '@oladimillion/react-form'
import sideimg from './assets/sideimg.jpg'
import { FormStatusMessage } from '../FormStatusMessage'
import  { 
  Wrapper, 
  Card,
  Button,
  Form,
  SideImage,
  Text,
} from './styled'

export const AuthForm = (props) => {

  const {
    onSubmit,
    children,
    validationRules,
    statusMessage,
    initialValues = {},
  } = props

  return (
    <Wrapper>
      <Card>
        <SideImage 
          flex={1}
          backgroundImage={`url(${sideimg})`}
          width='100%'
          p='3rem'
        >
          <Text
            color='#fff'
            fontSize='2rem'
            textAlign='center'
            as='h3'
            textShadow='2px 2px #442f2f'
          >
            Welcome to Employee Review
          </Text>
        </SideImage>
        <FlexBox flex={2} p='3rem'>
          <Form 
            onSubmit={onSubmit}
            validationRules={validationRules}
            initialValues={initialValues}
          >
            <Text 
              as='h3'
              fontSize='25px'
              mb='2rem'
            >
              Log in to your account
            </Text>
           
            <FormStatusMessage {...statusMessage} />
            {children}
            <Button type='submit'>
              Continue
            </Button>
          </Form>
        </FlexBox>
      </Card>
    </Wrapper>
  )
}

AuthForm.defaultProps = {
  statusMessage:  {},
}
