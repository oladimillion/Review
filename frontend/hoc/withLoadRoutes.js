import { compose } from 'lodash/fp'
import { withErrorBoundary } from './withErrorBoundary'
import { withSuspense } from './withSuspense'

export const withLoadRoutes = compose(withErrorBoundary, withSuspense)

