import React from 'react'
import styled from 'styled-components'
import hoistNonReactStatics from 'hoist-non-react-statics';
import { FlexBox } from '@oladimillion/react-form'
import { getDisplayName } from '../helpers'

const Info = styled.i`
  text-decoration: underline;
`

export const withErrorBoundary = (WrappedComponent) => {

  class ErrorBoundary extends React.Component {
    state = { hasError: false }

    static getDerivedStateFromError() {    
      return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {    
      this.setState({ error, errorInfo })
    }

    render() {
      const { hasError, error, errorInfo } = this.state
      if (hasError) {      
        return (
          <FlexBox flexDirection='column' p={1}>
            <h3>Something went wrong: <Info>{error?.message}</Info></h3>
            <pre>{errorInfo?.componentStack}</pre>
          </FlexBox>
        )
      }
      return <WrappedComponent {...this.props} /> 
    }
  }

  ErrorBoundary.displayName = `withErrorBoundary(${getDisplayName(WrappedComponent)})`
  return hoistNonReactStatics(ErrorBoundary, WrappedComponent)
}

