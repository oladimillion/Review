import { compose } from 'lodash/fp'
import { inject, observer } from 'mobx-react'

export const connect = compose(
  inject('navigationStore'),
  observer,
)

