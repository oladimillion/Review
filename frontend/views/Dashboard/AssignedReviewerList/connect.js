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
    const { assignedReviewerStore, accountStore } = props
    const { getReviewerReview } = assignedReviewerStore
    if (!accountStore.isAdmin) {
      await getReviewerReview()
    }
  }),
  observer
)

