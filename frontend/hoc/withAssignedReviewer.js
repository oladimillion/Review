import { compose } from 'lodash/fp'
import { inject } from 'mobx-react'
import { withData } from './withData'

export const withAssignedReviewer = compose(
  inject('assignedReviewerStore'),
  withData(async (props) => {
    await props.assignedReviewerStore.load()
  }),
)

