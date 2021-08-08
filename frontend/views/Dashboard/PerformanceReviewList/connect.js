import { observer } from 'mobx-react'
import { compose } from 'lodash/fp'
import { 
  withAccount,
  withPerformanceReview,
} from '../../../hoc'

export const connect = compose(
  withAccount,
  withPerformanceReview,
  observer
)

