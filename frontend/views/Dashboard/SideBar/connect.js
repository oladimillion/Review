import { compose } from 'lodash/fp'
import { inject, observer } from 'mobx-react'
import { 
  withCustomRouter, 
  withData,
} from '../../../hoc'

export const connect = compose(
  withCustomRouter,
  inject('navigationStore', 'accountStore'),
  withData((props) => {
    const { redirectToRoute, accountStore } = props
    const logout = () => {
      accountStore.logout()
      redirectToRoute('/login')
    }
    return { logout }
  }),
  observer,
)

