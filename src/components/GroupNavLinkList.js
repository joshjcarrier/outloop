import React, { Component } from 'react'
import GroupNavLink from './GroupNavLink'

class GroupNavLinkList extends Component {

  render() {
    const links = this.props.links || [];
    return (
      <nav className='flex flex-column h-100'>
        {links.map(link => (
          <GroupNavLink key={link.node.id} group={link.node} />
        ))}
        <GroupNavLink key='eydfdHlwZSc6J0dyb3VwJywnaWQnOjB9' group={{ databaseId: 0, displayName: 'All Company', id: 'eydfdHlwZSc6J0dyb3VwJywnaWQnOjB9' }} />
      </nav>
    )
  }
}

export default GroupNavLinkList