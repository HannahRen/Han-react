import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
        username: '',
        password: ''
    }
  }
  render() {
    return (
      <div id="login-container">
        <div className="icon">
          <i className="icon-user"></i>
        </div>
        <div className="input-container phone-container">
          <i className="icon-tablet"></i>
          <input
            type="text"
            placeholder="Email or Phone"
            onChange={this.changeUsername.bind(this)}
            value={this.state.username}
          />
        </div>
        <div className="input-container password-container">
          <i className="icon-key"></i>
          <input type="password" placeholder="Password" onChange={this.changePassword.bind(this)}/>
        </div>
        <button className="btn-login" onClick={this.clickHanlde.bind(this)}>Log In</button>
      </div>
    )
  }
  changeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  changePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  clickHanlde() {
    const username = this.state.username
    const password = this.state.password
    const loginHandle = this.props.loginHandle
    if (username == '' || password == '') {
      alert('Wrong username or password!')
      return
    }
    loginHandle(username)
  }
}

export default Login
