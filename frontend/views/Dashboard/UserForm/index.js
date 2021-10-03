import React from 'react'
import { 
  Field, 
  FlexBox,
} from '@oladimillion/react-form'
import { connect } from './connect'
import { FormCard } from '../../../components/FormCard'
import { useFormStatusMessage } from '../../../hooks'

const validationRules = {
  name: {
    validation: 'required',
  },
}

const Form = (props) => {

  const { 
    addUser, 
    updateUser, 
    initialValues,
    readOnly,
    createOnly,
    updateOnly,
  } = props

  const [statusMessage, setStatusMessage] = useFormStatusMessage()

  const onSubmit = async (formProps) => {
    const { values } = formProps
    setStatusMessage()

    try {
      if (createOnly) {
        await addUser(values)
        setStatusMessage('User created successfully')
      }
      if (updateOnly) {
        await updateUser(values.id, values)
        setStatusMessage('User updated successfully')
      }
    } catch (e) {
      const { data } = e?.response || {}
      const { name = [] } = data || {}
      const messages = []
      if (name?.length) messages.push('Name already taken!')
      setStatusMessage(messages, 'error')
    }
  }

  return (
    <FormCard 
      title={'USER'}
      onSubmit={onSubmit}
      validationRules={validationRules}
      initialValues={initialValues}
      statusMessage={statusMessage}
      readOnly={readOnly}
    >
      <Field 
        type='text' 
        label='Name'
        name='name' 
        placeholder='Name'
      />
    </FormCard>
  )
}

export default connect(Form)

