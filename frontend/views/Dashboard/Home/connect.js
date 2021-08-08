import { observer } from 'mobx-react'
import { compose } from 'lodash/fp'
import { 
  withAccount,
  withAssignedReviewer,
  withData,
} from '../../../hoc'

export const connect = compose(
  withAccount,
  withAssignedReviewer,
  withData(async (props) => {
    const { accountStore, assignedReviewerStore } = props
    const { isAdmin, getUsers } = accountStore
    const { getReviewerReview } = assignedReviewerStore
    if (isAdmin) {
      await getUsers()
    } else {
      await getReviewerReview()
    }
  }),
  observer
)

