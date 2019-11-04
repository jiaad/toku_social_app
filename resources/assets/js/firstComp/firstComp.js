import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Layout extends Component {
  constructor() {
    super()
    this.state = {
      name: 'Joe'
    }
  }
  clickedBtn = () => {
    console.log('swag')
  }
  render() {
    return (<div className='app'>
      this is my project
    </div>)
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
