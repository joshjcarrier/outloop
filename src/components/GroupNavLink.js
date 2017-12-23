import React, { Component } from 'react'

class GroupNavLink extends Component {

  render() {
    return (
      <li class="lh-copy pv2 ba bl-0 bt-0 br-0 b--none">{this.props.group.displayName}</li>
    )
  }
}

export default GroupNavLink