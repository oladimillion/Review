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
    const { users, isAdmin, deleteUser } = accountStore
    const { reviewerReviews } = assignedReviewerStore

    const data = isAdmin 
      ? users.map((data) => ({ 
          ...data,
          employee: data.name,
          status: 'Employee',
          route: `/user/${data.id}/update`,
          deletable: true,
          handleDelete: () => deleteUser(data.id),
        }))
      : reviewerReviews
        .map(({ id, performance_review_detail }) => ({
          id,
          employee: performance_review_detail.member_detail.name,
          status: 'Employee',
          route: `/assigned_reviewers/${id}/update`,
          actionLabel: 'Review',
        }))
    return { data, isAdmin }
  }),
  observer
)

