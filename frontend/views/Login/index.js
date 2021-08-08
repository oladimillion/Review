import React from 'react'
import check from 'check-types'
import { Field  } from '@oladimillion/react-form'
import { useFormStatusMessage } from '../../hooks'
import { connect } from './connect'
import { AuthForm } from '../../components/AuthForm'


const getValidationRules = (
  isResetPassword,
  usePasswordField,
) =>  ({
  name: {
    validation: ['required'],
  },
  ...(usePasswordField && {
      password: {
        validation: 'required',
      }
    }),
  ...(isResetPassword && {
      c_password: {
        validation: 'required|same:password',
        message: {
          required: 'Confirm password is required',
          same: 'Passwords must match'
        }
      }
  }),
})

const LoginFormView = (props) => {

  const [isResetPassword, setResetPassword] = React.useState(false)
  const [statusMessage, setStatusMessage] = useFormStatusMessage()
  const [usePasswordField, setUsePasswordField] = React.useState(false)
  const onInit = React.useRef()

  const initialValues = {}
  const { accountStore, redirectToRoute } = props

  const onSubmit = async (formProps) => {
    const { values, resetForm } = formProps
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

        setResetPassword(name_exist && !password_exist)
        setUsePasswordField(name_exist)

        onInit.current = true
      } else if (isResetPassword) {
        const { password, c_password } = values

        if (password !== c_password) {
          setStatusMessage('Passwords do not match', 'error')
          return
        }
        const data = await accountStore.setPassword(payload)
        localStorage.setItem('token', data.token)
        setStatusMessage('Password successfully updated!')
        resetForm()
        setResetPassword(false)
        setUsePasswordField(false)
        redirectToRoute('/')
      } else {
        const data = await accountStore.signin(payload)
        localStorage.setItem('token', data.token)
        setStatusMessage('Login successful!')
        resetForm()
        setResetPassword(false)
        setUsePasswordField(false)
        redirectToRoute('/')
      }
    } catch(e) {
      const { data } = e?.response || {}
      if (check.object(data)) {
        const { name = [], password = [], user = [] } = data
        setStatusMessage([ ...name, ...password, ...user ], 'error')
      } else {
        console.log(e)
        setStatusMessage('Something went wrong. Try again!', 'error')
      }
    }
  }

  const validationRules = getValidationRules(
    isResetPassword,
    usePasswordField,
  )

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
      {(usePasswordField || isResetPassword) && (
        <Field 
          type='password' 
          label='Password'
          name='password' 
          placeholder='Password'
        />
      )}
      {isResetPassword && (
        <Field 
          type='password' 
          label='Confirm Password'
          name='c_password' 
          placeholder='Confirm Password'
        />
      )}
    </AuthForm>
  )
}

export default connect(LoginFormView)
