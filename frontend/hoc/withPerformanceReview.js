import { compose } from 'lodash/fp'
import { inject } from 'mobx-react'
import { withData } from './withData'

export const withPerformanceReview = compose(
  inject('performanceReviewStore'),
  withData(async (props) => {
    await props.performanceReviewStore.load()
  }),
)

