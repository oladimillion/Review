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
    const { redirectToPath, accountStore } = props
    const logout = () => {
      accountStore.logout()
      redirectToPath('/login')
    }
    return { logout }
  }),
  observer,
)

