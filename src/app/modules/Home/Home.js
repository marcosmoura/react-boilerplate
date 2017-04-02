import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Home.scss'

class Home extends Component {
  render() {
    return (
      <div styleName="main-content">
        <h1>Home</h1>
      </div>
    )
  }
}

export default CSSModules(Home, styles)
