import { observer } from 'mobx-react'
import { compose } from 'lodash/fp'
import { 
  withCustomRouter,
  withAccount,
} from '../../hoc'

export const connect = compose(
  withCustomRouter,
  withAccount,
  observer
)
