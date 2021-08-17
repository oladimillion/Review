import { observer } from 'mobx-react'
import { compose } from 'lodash/fp'
import { 
  withAccount,
  withPerformanceReview,
  withData,
} from '../../../hoc'

export const connect = compose(
  withAccount,
  withPerformanceReview,
  withData((props) => {
    const { performanceReviewStore, accountStore } = props
    const { isAdmin } = props
    const data = performanceReviewStore.data.map((data) => ({ 
      ...data,
      employee: data?.member_detail?.name,
      status: 'Performance',
      route: `/performance_reviews/${data.id}/update`,
    }))
    return { data, isAdmin }
  }),
  observer,
)

