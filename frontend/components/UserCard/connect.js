import { inject, observer } from 'mobx-react'
import { compose } from 'lodash/fp'
import { 
  withCustomRouter,
} from '../../hoc'

export const connect = compose(
  withCustomRouter,
  inject('appStore'),
  observer,
)

