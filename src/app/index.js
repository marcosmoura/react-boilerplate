/* Third Party */
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';

/* App */
import App from './App'
import './config'
import './core'

const renderComponent = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

renderComponent(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    renderComponent(require('./App').default);
  });
}
