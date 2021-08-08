import { compose } from 'lodash/fp'
import { 
  withCustomRouter,
  withPerformanceReview,
  withAccount,
  withData,
  withModes,
} from '../../../hoc'

export const connect = compose(
  withCustomRouter,
  withModes,
  withPerformanceReview,
  withAccount,
  withData(async (props) => {
    const { performanceReviewStore, accountStore, getParams } = props
    const { getPerformanceReviewById } = performanceReviewStore
    const { getUsers } = accountStore 
    const id = getParams('id')
    const users = await getUsers()
    let initialValues = {}
    if (id) {
      initialValues = await getPerformanceReviewById(id)
    }
    return { initialValues, users }
  }),
)
