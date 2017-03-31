import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import ScrollToTop from './core/components/ScrollToTop/ScrollToTop'
import Home from './modules/Home/Home'
import ErrorPage from './modules/Error/Error'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <div className="page-content">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="*" component={ErrorPage} />
            </Switch>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}
