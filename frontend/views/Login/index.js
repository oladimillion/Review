import React from 'react'
import check from 'check-types'
import { Field  } from '@oladimillion/react-form'
import { useFormStatusMessage } from '../../hooks'
import { connect } from './connect'
import { AuthForm } from '../../components/AuthForm'


const validationRules = {
  name: {
    validation: 'required',
  },
  password: {
    validation: 'required_with:usePasswordField',
    message: {
      required_with: 'Password is required',
    },
    depend: ({ usePasswordField, isResetPassword }) => {
      return usePasswordField || isResetPassword
    }
  },
  c_password: {
    validation: 'required_with:isResetPassword|same:password',
    message: {
      required_with: 'Confirm password is required',
      same: 'Passwords must match'
    },
    depend: ({ isResetPassword }) => {
      return isResetPassword
    }
  }
}

const LoginFormView = (props) => {

  const [statusMessage, setStatusMessage] = useFormStatusMessage()
  const onInit = React.useRef()
  const { 
    accountStore, 
    redirectToPath,
    initialValues,
  } = props

  const onSubmit = async (formProps) => {

    const { values, setFormValue } = formProps
    const payload = { ...values, name: values?.name?.toLowerCase() }
    setStatusMessage()

    try {
      if (!onInit.current) {
        const data = await accountStore.checkCredential(payload)
        const { name_exist, password_exist } = data

        if (!name_exist) {
          setStatusMessage('User doesn\'t exist', 'error')
          return
        }

        const usePasswordField = true
        const isResetPassword = !password_exist 
        setFormValue({ usePasswordField, isResetPassword })

        onInit.current = true
      } else if (values?.isResetPassword) {
        const { password, c_password } = values

        if (password !== c_password) {
          setStatusMessage('Passwords do not match', 'error')
          return
        }
        const data = await accountStore.setPassword(payload)
        localStorage.setItem('token', data.token)
        redirectToPath('/')
      } else {
        const data = await accountStore.signin(payload)
        localStorage.setItem('token', data.token)
        redirectToPath('/')
      }
    } catch(e) {
      const { data } = e?.response || {}
      if (check.object(data)) {
        const { name = [], password = [], user = [] } = data
        setStatusMessage([ ...name, ...password, ...user ], 'error')
      } else {
        setStatusMessage('Something went wrong. Try again!', 'error')
      }
    }
  }

  return (
    <AuthForm 
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationRules={validationRules}
      statusMessage={statusMessage}
    >
      <Field 
        type='text' 
        label='Name'
        name='name' 
        placeholder='Enter name'
      />
      <Field 
        type='password' 
        label='Password'
        name='password' 
        placeholder='Password'
      />
      <Field 
        type='password' 
        label='Confirm Password'
        name='c_password' 
        placeholder='Confirm Password'
      />
    </AuthForm>
  )
}

export default connect(LoginFormView)
