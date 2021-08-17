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
    const { isAdmin } = accountStore
    const data = isAdmin
      ? assignedReviewerStore.data
        .map((data) => ({ 
          ...data,
          employee: data.performance_review_detail.member_detail.name,
          reviewer: data?.reviewer_detail?.name,
          status: 'Employee',
          route: `/assigned_reviewers/${data.id}`,
          actionLabel: 'View',
        }))
      : assignedReviewerStore.reviewer_review
        .map(({ id, performance_review_detail }) => ({
          id,
          employee: performance_review_detail.member_detail.name,
          status: 'Review',
          route: `/assigned_reviewers/${id}`,
          actionLabel: 'View',
        }))

    return { data, isAdmin, }
  }),
  observer
)

