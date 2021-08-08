import React from 'react'

export const useFormStatusMessage = (message=[], type='success') => {
  const [statusMessage, handleStatus] = React.useState({ message, type })
  // eslint-disable-next-line no-unused-vars
  const setStatusMessage = (message=[], type='success') => handleStatus({ message, type })
  return [statusMessage, setStatusMessage]
}
