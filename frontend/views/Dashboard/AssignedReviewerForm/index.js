import React from 'react'
import { 
  Field, 
  FlexBox,
} from '@oladimillion/react-form'
import { connect } from './connect'
import { FormCard } from '../../../components/FormCard'
import { useFormStatusMessage } from '../../../hooks'

const validationRules = {
  performance_review: {
    validation: 'required_with:isAdmin',
    message: {
      required_with: 'Employee is required',
    },
  },
  reviewer: {
    validation: 'required_with:isAdmin',
    message: {
      required_with: 'Reviewer is required',
    },
  },
  performance: {
    validation: 'required_with:notIsAdmin',
    depend: ({ createOnly }) => !createOnly,
  },
  feedback: {
    validation: 'required_with:notIsAdmin',
    message: {
      required_with: 'Feedback is required',
    },
    depend: ({ createOnly }) => !createOnly,
  }
}

const Form = (props) => {

  const { 
    users,
    initialValues,
    readOnly,
    createOnly,
    updateOnly,
    isAdmin,
    gotoReadPath,
    createAssignedReviewer, 
    updateAssignedReviewer,
    updateReviewerReview,
    performanceReviewOptions,
    reviewerOptions,
  } = props

  const [statusMessage, setStatusMessage] = useFormStatusMessage()

  const onSubmit = async (formProps) => {
    const { values } = formProps
    setStatusMessage()

    try {
      if (createOnly && isAdmin) {
        await createAssignedReviewer(values)
        setStatusMessage('Reviewer assigned successfully')
      }
      if (updateOnly && isAdmin) {
        await updateAssignedReviewer(values.id, values)
        setStatusMessage('Reviewer updated successfully')
      }
      if (updateOnly && !isAdmin) {
        await updateReviewerReview(values.id, values)
        setStatusMessage('Feedback updated successfully')
      }
    } catch (e) {
      console.log(e)
      const { data } = e?.response || {}
      const { performance_review, reviewer, feedback, non_field_errors } = data || {}
      const messages = []
      if (performance_review) messages.push('Employee is required')
      if (reviewer) messages.push('Reviewer is required')
      if (feedback) messages.push('Feedback is required')
      if (non_field_errors) messages.push('The employee is already assigned to the same reviewer')
      setStatusMessage(messages, 'error')
    }
  }

  return (
    <FormCard 
      title={'EMPLOYEE REVIEWER'}
      onSubmit={onSubmit}
      validationRules={validationRules}
      initialValues={initialValues}
      statusMessage={statusMessage}
      readOnly={readOnly}
    >
      <Field 
        type='select' 
        label='Employee'
        name='performance_review' 
        options={performanceReviewOptions}
        placeholder='Choose Employee'
        disabled={!isAdmin}
      />
      <Field 
        type='select' 
        label='Reviewer'
        name='reviewer' 
        options={reviewerOptions}
        placeholder='Choose Reviewer'
        disabled={!isAdmin}
      />
      <Field 
        type='textarea' 
        label='Performance'
        name='performance' 
        placeholder='Enter Performance...'
        disabled
      />
      <Field 
        type='textarea' 
        label='Feedback'
        name='feedback' 
        placeholder='Enter Feedback...'
        disabled={isAdmin}
      />
    </FormCard>
  )
}

export default connect(Form)

