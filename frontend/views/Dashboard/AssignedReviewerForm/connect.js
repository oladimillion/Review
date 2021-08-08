import { observer } from 'mobx-react'
import { compose } from 'lodash/fp'
import { 
  withCustomRouter,
  withPerformanceReview,
  withAssignedReviewer,
  withAccount,
  withData,
  withModes,
} from '../../../hoc'

export const connect = compose(
  withCustomRouter,
  withModes,
  withAccount,
  withPerformanceReview,
  withAssignedReviewer,
  withData(async (props) => {
    const { assignedReviewerStore, accountStore, getParams } = props
    const { getReviewerReviewById, getAssignedReviewerById } = assignedReviewerStore
    const { isAdmin, getUsers } = accountStore 
    const id = getParams('id')
    let users = []
    if (isAdmin) {
      users = await getUsers()
    }
    let initialValues = {}
    if (id) {
      if (isAdmin) {
        initialValues = await getAssignedReviewerById(id)
      } else {
        initialValues = await getReviewerReviewById(id)
      }
    }
    return { 
      initialValues: { 
        ...initialValues, 
        performance: initialValues?.performance_review_detail?.performance,
      }, 
      users,
      isAdmin,
    }
  }),
  observer,
)
