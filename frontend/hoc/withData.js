import React from 'react'
import { compose } from 'lodash/fp'
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Loader } from '../components/Loader'
import { withCustomRouter } from './withCustomRouter'
import { getDisplayName } from '../helpers'

const noop = async () => ({})

export const withData = (getData=noop) => (WrappedComponent) => {
  class Data extends React.Component {

    state = {
      loaded: false,
    }

    async componentDidMount() {
      const { redirectToPath } = this.props
      const data = await getData(this.props)
      const { redirectTo, ...rest } = data || {}
      if (redirectTo) {
        await this.setState({ loaded: true })
        redirectToPath(redirectTo)
      } else {
        await this.setState({ ...rest, loaded: true })
      }
    }

    render() {
      const { loaded, ...rest } = this.state
      if (!loaded) {
        return <Loader />
      }
      return (
        <WrappedComponent 
          {...this.props} 
          {...rest}
        />
      )
    }
  }

  Data.displayName = `withData(${getDisplayName(WrappedComponent)})`
  hoistNonReactStatics(Data, WrappedComponent)

  return compose(withCustomRouter)(Data)
}

