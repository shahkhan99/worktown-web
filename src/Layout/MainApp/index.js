import React, { Component } from 'react'

import Body from '../Body/index'
import { BrowserRouter as Router } from 'react-router-dom';

export default class MainApp extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
        <div>
            <Router>
                <Body />
            </Router>
        </div>
    )
  }
}
