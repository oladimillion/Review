import { compose } from 'lodash/fp'
import { inject } from 'mobx-react'
import { withData } from './withData'

export const withAccount = compose(
  inject('accountStore'),
  withData(async (props) => {
    await props.accountStore.load()
  }),
)

