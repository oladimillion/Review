import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Loader } from '../components/Loader'
import { getDisplayName } from '../helpers'

export const withSuspense = (WrappedComponent) => {
  const Suspense = (props) => (
    <React.Suspense fallback={<Loader />}>
      <WrappedComponent {...props} />
    </React.Suspense>
  )
  Suspense.displayName = `withSuspense(${getDisplayName(WrappedComponent)})`
  return hoistNonReactStatics(Suspense, WrappedComponent)
}

