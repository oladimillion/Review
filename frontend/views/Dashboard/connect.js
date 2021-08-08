import { compose } from 'lodash/fp'
import { withCustomRouter, withData } from '../../hoc'
import { mustBeAuthenticated } from '../../helpers/mustBeAuthenticated'

export const connect = compose(
  withCustomRouter, 
  withData(mustBeAuthenticated),
) 
