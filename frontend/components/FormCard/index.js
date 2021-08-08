import React from 'react'
import { 
  SubmitButton,
  Button,
  FlexBox,
} from '@oladimillion/react-form'
import { withRouter } from 'react-router-dom'
import {
  Card,
  StyledForm,
} from '../commonStyles'
import { FormStatusMessage } from '../FormStatusMessage'

export const FormCard = withRouter((props) => {

  const { 
    title, 
    children, 
    onSubmit,
    readOnly,
    validationRules,
    initialValues,
    statusMessage, 
    history,
  } = props

  return (
    <Card>
      <Card.Header>
        <Card.HeaderText>{title}</Card.HeaderText>
      </Card.Header>
      <StyledForm 
        onSubmit={onSubmit}
        validationRules={validationRules}
        initialValues={initialValues}
        readOnly={readOnly}
      >
        {children}
        <FlexBox>
          <SubmitButton>Submit</SubmitButton>
          <Button onClick={() => history.goBack()}>Back</Button>
        </FlexBox>
        <FormStatusMessage {...statusMessage} />
      </StyledForm>
    </Card>
  )
})

FormCard.defaultProps = {
  onSubmit: () => {},
  validationRules: {},
  initialValues: {},
  statusMessage: {},
  children: null,
  readOnly: false,
}
