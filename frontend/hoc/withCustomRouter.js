import React from 'react'
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'
import hoistNonReactStatics from 'hoist-non-react-statics';

export const withCustomRouter = (WrappedComponent) => {

  const CustomRouter = (props) => {

    const { history, match, location } = props
    const routePathname = location.pathname
    const basePath = (() => {
      const pathname = routePathname.split('/')
      if (pathname.includes('create')) {
        pathname.pop()
      } else if (pathname.includes('update')) {
        pathname.splice(pathname.length - 2, pathname.length)
      }
      return pathname.join('/')
    })()
    const queryObj = (() => {
      const regex = /\?/g
      const { search } = location || {}
      return (search || '').replace(regex, '')
        .split('&')
        .reduce((accum, str) => {
          const [key, value] = str.split('=')
          accum[key] = value
          return accum
        }, {})
    })()
    const gotoRoute = (path = '/') => history.push(path)
    const redirectToRoute = (path=null) => {
      if (!path) return
      history.replace(path)
    }
    const getParams = (key, defaultValue=null) => get(match.params, key, defaultValue)
    const getQuery = (key, defaultValue=null) => get(queryObj, key, defaultValue)
    const getMode = (defaultValue='read') => getParams('mode', defaultValue)
    const gotoPath = (path='') => gotoRoute(`${basePath}/${path}`)
    const gotoUpdatePath = (id) => gotoPath(`${id}/update`)
    const gotoReadPath = (id) => gotoPath(`${id}`)

    return (
      <WrappedComponent
        {...props}
        gotoRoute={gotoRoute}
        redirectToRoute={redirectToRoute}
        getParams={getParams}
        getQuery={getQuery}
        getMode={getMode}
        gotoPath={gotoPath}
        gotoUpdatePath={gotoUpdatePath}
        gotoReadPath={gotoReadPath}
        routePathname={routePathname}
        basePath={basePath}
      />
    )
  }

  hoistNonReactStatics(CustomRouter, WrappedComponent)
  return withRouter(CustomRouter)
}

