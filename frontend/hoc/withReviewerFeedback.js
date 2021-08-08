import { compose } from 'lodash/fp'
import { inject } from 'mobx-react'
import { withData } from './withData'

export const withReviewerFeedback = compose(
  inject('reviewerFeedbackStore'),
  withData(async (props) => {
    await props.reviewerFeedbackStore.load()
  }),
)

