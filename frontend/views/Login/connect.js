import { compose } from 'lodash/fp'
import { inject } from 'mobx-react'
import { withCustomRouter, withData } from '../../hoc'
import { mustNotBeAuthenticated } from '../../helpers/mustNotBeAuthenticated'

export const connect = compose(
  withCustomRouter,
  withData(mustNotBeAuthenticated),
  withData(async () => {
    return { 
      initialValues: {
        usePasswordField: null, 
        isResetPassword: null
      } 
    }
  }),
  inject('accountStore'),
)

