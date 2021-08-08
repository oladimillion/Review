import React from 'react'
import { 
  Field, 
  FlexBox,
} from '@oladimillion/react-form'
import { connect } from './connect'
import { FormCard } from '../../../components/FormCard'
import { useFormStatusMessage } from '../../../hooks'

const validationRules = {
  member: {
    validation: 'required',
    message: {
      required: 'Employee is required',
    },
  },
  performance: {
    validation: 'required',
  }
}

const Form = (props) => {

  const { 
    performanceReviewStore,
    users,
    initialValues,
    readOnly,
    createOnly,
    updateOnly,
  } = props

  const { createPerformanceReview, updatePerformanceReview } = performanceReviewStore
  const [statusMessage, setStatusMessage] = useFormStatusMessage()

  const onSubmit = async (formProps) => {
    const { values } = formProps
    setStatusMessage()

    try {
      if (createOnly) {
        await createPerformanceReview(values)
        setStatusMessage('Employee performance added successfully')
      }
      if (updateOnly) {
        await updatePerformanceReview(values.id, values)
        setStatusMessage('Employee performance updated successfully')
      }
    } catch (e) {
      const { data } = e?.response || {}
      const { member = [], performance = [] } = data || {}
      const messages = []
      if (member?.length) messages.push('User already have a performance review')
      if (performance?.length) messages.push('Performance is required')
      setStatusMessage(messages, 'error')
    }
  }

  const userOptions = users.map(({ id, name }) => ({
    text: name,
    value: id
  }))

  return (
    <FormCard 
      title={'EMPLOYEE PERFORMANCE'}
      onSubmit={onSubmit}
      validationRules={validationRules}
      initialValues={initialValues}
      statusMessage={statusMessage}
      readOnly={readOnly}
    >
      <Field 
        type='select' 
        label='Employee'
        name='member' 
        options={userOptions}
        placeholder='Choose Employee'
        disabled={updateOnly}
      />
      <Field 
        type='textarea' 
        label='Performance'
        name='performance' 
        placeholder='Enter Performance...'
      />
    </FormCard>
  )
}

export default connect(Form)

