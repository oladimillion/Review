import { observer } from 'mobx-react'
import { compose } from 'lodash/fp'
import { 
  withPerformanceReview,
  withAssignedReviewer,
  withAccount,
  withData,
  withModes,
} from '../../../hoc'

export const connect = compose(
  withModes,
  withAccount,
  withPerformanceReview,
  withAssignedReviewer,
  withData(async (props) => {
    const { 
      performanceReviewStore,
      assignedReviewerStore,
      accountStore, 
      getParams,
      createOnly,
    } = props
    const { 
      getReviewerReviewById, 
      getAssignedReviewerById,
      createAssignedReviewer, 
      updateAssignedReviewer,
      updateReviewerReview,
    } = assignedReviewerStore
    const { isAdmin, users } = accountStore 
    const id = getParams('id')
    let initialValues = {}

    if (id) {
      if (isAdmin) {
        initialValues = await getAssignedReviewerById(id)
      } else {
        initialValues = await getReviewerReviewById(id)
      }
    }

    const { 
      reviewer_detail, 
      performance_review,
      performance_review_detail: { 
        member_detail,
        performance,
      } = {},
    } =  initialValues

    const reviewerOptions = isAdmin
      ? users.map(({ id, name }) => ({
        text: name,
        value: id
      }))
      : [{ 
        text: reviewer_detail?.name, 
        value: reviewer_detail?.id 
      }]

    const performanceReviewOptions = isAdmin
      ? performanceReviewStore.data
        .map(({ id, member_detail }) => ({
          text: member_detail?.name,
          value: id
        }))
      : [{ 
          text: member_detail?.name, 
          value: performance_review,
        }]


    return { 
      initialValues: { 
        ...initialValues, 
        ...(isAdmin && { isAdmin }),
        ...(!isAdmin && { notIsAdmin: true }),
        performance,
        createOnly,
      }, 
      users,
      isAdmin,
      createAssignedReviewer, 
      updateAssignedReviewer,
      updateReviewerReview,
      performanceReviewOptions,
      reviewerOptions,
    }
  }),
  observer,
)
