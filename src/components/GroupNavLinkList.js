import React, { Component } from 'react'
import GroupNavLink from './GroupNavLink'

class GroupNavLinkList extends Component {

  render() {
    return (
      <div>
        <ul class="list pl0 measure center">
          {this.props.links.map(link => (
            <GroupNavLink key={link.node.id} group={link.node} />
          ))}
        </ul>
      </div>
    )
  }
}

export default GroupNavLinkList