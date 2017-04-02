import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Error.scss'

class ErrorPage extends Component {
  render() {
    return (
      <div styleName="main-content">
        <h1>Error 404</h1>
      </div>
    )
  }
}

export default CSSModules(ErrorPage, styles)
