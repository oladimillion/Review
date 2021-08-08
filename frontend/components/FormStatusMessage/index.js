import React from 'react'
import { castArray } from 'lodash'
import PropTypes from 'prop-types'
import { SuccessMessage, ErrorMessage, FlexBox } from '@oladimillion/react-form'

export const FormStatusMessage = (props) => {

  const { 
    message, 
    type,
    ErrorMessageComponent,
    SuccessMessageComponent,
    ...rest
  } = props

  const messages = castArray(message)

  return (
    <FlexBox my={2} flexDirection={'column'} {...rest}>
      {type === 'success' && (
        messages.map((msg, key) => (
          <SuccessMessageComponent key={key}>
            {msg}
          </SuccessMessageComponent>
        ))
      )}
      {type === 'error' && (
        messages.map((msg, key) => (
          <ErrorMessageComponent key={key}>
            {msg}
          </ErrorMessageComponent>
        ))
      )}
    </FlexBox>
  )
}

FormStatusMessage.defaultProps = {
  message: [],
  type: 'success',
  SuccessMessageComponent: SuccessMessage,
  ErrorMessageComponent: ErrorMessage,
}

FormStatusMessage.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  type: PropTypes.oneOf(['success', 'error']),
}

